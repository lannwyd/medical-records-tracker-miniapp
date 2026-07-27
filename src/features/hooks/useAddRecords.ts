import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { clientFormSchema, ClientFormData } from "../../lib/schemas";
export const useAddRecord = (onSuccess?: () => void) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [clientName, setClientName] = useState("");
    const [clientAdr, setClientAdr] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [doctorName, setDoctorName] = useState("");
    const [doctorAdr, setDoctorAdr] = useState("");
    const [notes, setNotes] = useState("");
    const [medications, setMedications] = useState([
        { name: "", form: "", quantity: 1 },
    ]);

    const addMedicationRow = () => {
        setMedications([...medications, { name: "", form: "", quantity: 1 }]);
    };

    const removeMedicationRow = (index: number) => {
        if (medications.length > 1) {
            setMedications(medications.filter((_, i) => i !== index));
        }
    };

    const updateMedication = (
        index: number,
        field: "name" | "form" | "quantity",
        value: string | number
    ) => {
        const updated = [...medications];
        updated[index] = { ...updated[index], [field]: value };
        setMedications(updated);
    };

    const resetForm = () => {
        setClientName("");
        setClientAdr("");
        setDate(new Date().toISOString().split("T")[0]);
        setDoctorName("");
        setDoctorAdr("");
        setNotes("");
        setMedications([{ name: "", form: "", quantity: 1 }]);
        setErrors({});
    };

    const submitForm = async () => {
        setErrors({});

        const rawData: ClientFormData = {
            client_name: clientName,
            client_adr: clientAdr,
            date,
            doctor_name: doctorName,
            doctor_adr: doctorAdr,
            notes,
            medications,
        };

        const result = clientFormSchema.safeParse(rawData);
        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                fieldErrors[issue.path.join(".")] = issue.message;
            });
            setErrors(fieldErrors);
            return false;
        }

        try {
            setLoading(true);
            await invoke("add_record", { payload: result.data });
            resetForm();
            if (onSuccess) onSuccess();
            return true;
        } catch (err) {
            console.error("Failed to add record:", err);
            setErrors({ submit: String(err) });
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        state: { clientName, clientAdr, date, doctorName, doctorAdr, notes, medications },
        setters: { setClientName, setClientAdr, setDate, setDoctorName, setDoctorAdr, setNotes },
        medicationActions: { addMedicationRow, removeMedicationRow, updateMedication },
        loading,
        errors,
        submitForm,
    };
};