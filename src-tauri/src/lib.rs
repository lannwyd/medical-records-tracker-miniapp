use serde::Serialize;
use rusqlite::Connection;
use std::sync::Mutex;
use tauri::Manager;

#[derive(Serialize)]
pub struct RecordRow {
    pub date: String,
    pub client_name: String,
    pub client_adr: String,
    pub med_name: String,
    pub quantity: i64,
    pub doctor_name: String,
    pub doctor_adr: String,
}

struct DbConnection(Mutex<Connection>);

fn init_db() -> Connection {
    let conn = Connection::open("clients.db").expect("failed to open db");
    conn.execute_batch("
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
    ").expect("failed to create tables");
    conn.execute("PRAGMA foreign_keys = ON", []).unwrap();
    conn
}

#[tauri::command]
fn get_records(state: tauri::State<DbConnection>) -> Result<Vec<RecordRow>, String> {
    let conn = state.0.lock().map_err(|e| e.to_string())?;

    let mut stmt = conn.prepare("
        SELECT r.date, c.name, c.adr, m.name, m.quantity, r.doctor_name, r.doctor_adr
        FROM records r
        JOIN clients c ON c.id = r.client_id
        JOIN medications m ON m.record_id = r.id
        ORDER BY r.date DESC
    ").map_err(|e| e.to_string())?;

    let rows = stmt.query_map([], |row| {
        Ok(RecordRow {
            date: row.get(0)?,
            client_name: row.get(1)?,
            client_adr: row.get(2)?,
            med_name: row.get(3)?,
            quantity: row.get(4)?,
            doctor_name: row.get(5)?,
            doctor_adr: row.get(6)?,
        })
    }).map_err(|e| e.to_string())?;

    let result: Result<Vec<RecordRow>, _> = rows.collect();
    result.map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            app.manage(DbConnection(Mutex::new(init_db())));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![get_records])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}