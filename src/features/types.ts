export interface RecordRow {
    record_id: number;
    medication_id: number;
    date: string;
    client_name: string;
    client_adr: string;
    med_name: string;
    med_form: string | null;
    quantity: number;
    doctor_name: string;
    doctor_adr: string;
    notes: string | null;
}