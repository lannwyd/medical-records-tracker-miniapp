export interface RecordRow {
    record_id: number;
    medication_id: number;
    client_id: number;
    date: string;
    client_name: string;
    client_adr: string;
    notes: string | null;
    med_name: string;
    quantity: number;
    doctor_name: string;
    doctor_adr: string;
}