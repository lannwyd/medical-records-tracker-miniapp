import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { clientFormSchema, ClientFormData } from "../../lib/schemas";
import { RecordRow } from "../types";

type Mode = "add" | "edit" | "duplicate";

export const useAddRecord = (
    onSuccess?: () => void,
    initialData?: RecordRow | null,
    mode: Mode = "add"
) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [clientName, setClientName] = useState("");
    const [clientAdr, setClientAdr] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [doctorName, setDoctorName] = useState("");
    const [doctorAdr, setDoctorAdr] = useState("");
    const [notes, setNotes] = useState("");
    const [medName, setMedName] = useState("");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (initialData) {
            setClientName(initialData.client_name);
            setClientAdr(initialData.client_adr ?? "");
            setDate(initialData.date);
            setDoctorName(initialData.doctor_name ?? "");
            setDoctorAdr(initialData.doctor_adr ?? "");
            setNotes(initialData.notes ?? "");
            setMedName(initialData.med_name);
            setQuantity(initialData.quantity);
        } else {
            resetForm();
        }
        setErrors({});
    }, [initialData]);

    const resetForm = () => {
        setClientName("");
        setClientAdr("");
        setDate(new Date().toISOString().split("T")[0]);
        setDoctorName("");
        setDoctorAdr("");
        setNotes("");
        setMedName("");
        setQuantity(1);
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
            med_name: medName,
            quantity,
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
            if (mode === "edit" && initialData) {
                await invoke("update_record", {
                    payload: { ...result.data, record_id: initialData.record_id },
                });
            } else {
                await invoke("add_record", { payload: result.data });
            }
            resetForm();
            if (onSuccess) onSuccess();
            return true;
        } catch (err) {
            console.error("Failed to save record:", err);
            setErrors({ submit: String(err) });
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        state: { clientName, clientAdr, date, doctorName, doctorAdr, notes, medName, quantity },
        setters: { setClientName, setClientAdr, setDate, setDoctorName, setDoctorAdr, setNotes, setMedName, setQuantity },
        loading,
        errors,
        submitForm,
    };
};