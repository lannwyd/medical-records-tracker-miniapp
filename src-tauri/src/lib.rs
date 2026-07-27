use rusqlite::{params, Connection, Result};
use serde::{Deserialize, Serialize};
use std::fs;
use std::sync::Mutex;
use tauri::Manager;

#[derive(Serialize)]
pub struct RecordRow {
    pub medication_id: i64,
    pub record_id: i64,
    pub date: String,
    pub client_name: String,
    pub client_adr: String,
    pub med_name: String,
    pub med_form: Option<String>,
    pub quantity: i64,
    pub doctor_name: String,
    pub doctor_adr: String,
    pub notes: Option<String>,
}

#[derive(Deserialize)]
pub struct MedicationInput {
    pub name: String,
    pub form: Option<String>,
    pub quantity: i64,
}

#[derive(Deserialize)]
pub struct AddRecordInput {
    pub client_name: String,
    pub client_adr: Option<String>,
    pub date: String,
    pub doctor_name: Option<String>,
    pub doctor_adr: Option<String>,
    pub notes: Option<String>,
    pub med_name: String,
    pub med_form: Option<String>,
    pub quantity: i64,
}

struct DbConnection(Mutex<Connection>);

fn init_db(app_handle: &tauri::AppHandle) -> Connection {
    let app_dir = app_handle
        .path()
        .app_data_dir()
        .expect("failed to get app data dir");

    fs::create_dir_all(&app_dir).expect("failed to create app data directory");

    let db_path = app_dir.join("clients.db");
    let conn = Connection::open(db_path).expect("failed to open db");
    conn.execute_batch(
        "
        CREATE TABLE IF NOT EXISTS clients (
            id      INTEGER PRIMARY KEY AUTOINCREMENT,
            name    TEXT NOT NULL,
            adr     TEXT
        );
        CREATE TABLE IF NOT EXISTS records (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            client_id   INTEGER NOT NULL,
            date        TEXT NOT NULL,
            doctor_name TEXT,
            doctor_adr  TEXT,
            notes       TEXT,
            FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
        );
        CREATE TABLE IF NOT EXISTS medications (
            id           INTEGER PRIMARY KEY AUTOINCREMENT,
            record_id    INTEGER NOT NULL,
            name         TEXT NOT NULL,
            form         TEXT,
            quantity     INTEGER NOT NULL,
            FOREIGN KEY (record_id) REFERENCES records(id) ON DELETE CASCADE
        );
    ",
    )
    .expect("failed to create tables");

    let _ = conn.execute("ALTER TABLE records ADD COLUMN notes TEXT", []);
    conn.execute("PRAGMA foreign_keys = ON", []).unwrap();
    conn
}

#[tauri::command]
fn get_records(state: tauri::State<DbConnection>) -> Result<Vec<RecordRow>, String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;

    let mut stmt = conn
    .prepare(
        "
SELECT m.id, r.id, r.date, c.name, c.adr, m.name, m.form, m.quantity, r.doctor_name, r.doctor_adr, r.notes
FROM records r
JOIN clients c ON c.id = r.client_id
JOIN medications m ON m.record_id = r.id
ORDER BY r.date DESC
",
    )
    .map_err(|e| e.to_string())?;

let rows = stmt
    .query_map([], |row| {
        Ok(RecordRow {
            medication_id: row.get(0)?,
            record_id: row.get(1)?,
            date: row.get(2)?,
            client_name: row.get(3)?,
            client_adr: row.get(4)?,
            med_name: row.get(5)?,
            med_form: row.get(6)?,
            quantity: row.get(7)?,
            doctor_name: row.get(8)?,
            doctor_adr: row.get(9)?,
            notes: row.get(10)?,
        })
    })
    .map_err(|e| e.to_string())?;

    let result: Result<Vec<RecordRow>, _> = rows.collect();
    result.map_err(|e| e.to_string())
}

#[tauri::command]
fn add_record(payload: AddRecordInput, state: tauri::State<DbConnection>) -> Result<(), String> {
    let mut conn = state.0.lock().map_err(|e| e.to_string())?;

    let tx = conn.transaction().map_err(|e| e.to_string())?;

    tx.execute(
        "INSERT INTO clients (name, adr) VALUES (?1, ?2)",
        params![payload.client_name, payload.client_adr],
    )
    .map_err(|e| e.to_string())?;
    let client_id = tx.last_insert_rowid();

    tx.execute(
        "INSERT INTO records (client_id, date, doctor_name, doctor_adr, notes) VALUES (?1, ?2, ?3, ?4, ?5)",
        params![
            client_id,
            payload.date,
            payload.doctor_name,
            payload.doctor_adr,
            payload.notes
        ],
    )
    .map_err(|e| e.to_string())?;
    let record_id = tx.last_insert_rowid();

    tx.execute(
        "INSERT INTO medications (record_id, name, form, quantity) VALUES (?1, ?2, ?3, ?4)",
        params![record_id, payload.med_name, payload.med_form, payload.quantity],
    )
    .map_err(|e| e.to_string())?;

    tx.commit().map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn delete_record(record_id: i64, state: tauri::State<DbConnection>) -> Result<(), String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;
    conn.execute("DELETE FROM records WHERE id = ?1", params![record_id])
        .map_err(|e| e.to_string())?;
    Ok(())
}

#[derive(Deserialize)]
pub struct UpdateRecordInput {
    pub record_id: i64,
    pub client_name: String,
    pub client_adr: Option<String>,
    pub date: String,
    pub doctor_name: Option<String>,
    pub doctor_adr: Option<String>,
    pub notes: Option<String>,
    pub med_name: String,
    pub med_form: Option<String>,
    pub quantity: i64,
}

#[tauri::command]
fn update_record(payload: UpdateRecordInput, state: tauri::State<DbConnection>) -> Result<(), String> {
    let mut conn = state.0.lock().map_err(|e| e.to_string())?;
    let tx = conn.transaction().map_err(|e| e.to_string())?;

    let client_id: i64 = tx
        .query_row(
            "SELECT client_id FROM records WHERE id = ?1",
            params![payload.record_id],
            |row| row.get(0),
        )
        .map_err(|e| e.to_string())?;

    tx.execute(
        "UPDATE clients SET name = ?1, adr = ?2 WHERE id = ?3",
        params![payload.client_name, payload.client_adr, client_id],
    )
    .map_err(|e| e.to_string())?;

    tx.execute(
        "UPDATE records SET date = ?1, doctor_name = ?2, doctor_adr = ?3, notes = ?4 WHERE id = ?5",
        params![
            payload.date,
            payload.doctor_name,
            payload.doctor_adr,
            payload.notes,
            payload.record_id
        ],
    )
    .map_err(|e| e.to_string())?;

    tx.execute(
        "UPDATE medications SET name = ?1, form = ?2, quantity = ?3 WHERE record_id = ?4",
        params![payload.med_name, payload.med_form, payload.quantity, payload.record_id],
    )
    .map_err(|e| e.to_string())?;

    tx.commit().map_err(|e| e.to_string())?;
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            // Pass app.handle() to init_db so it can resolve paths safely
            app.manage(DbConnection(Mutex::new(init_db(app.handle()))));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![get_records, add_record, delete_record,update_record])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
