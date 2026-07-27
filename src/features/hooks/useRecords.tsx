import { useEffect, useState, useCallback } from "react";
import { invoke } from "@tauri-apps/api/core";
import { RecordRow } from "../types";

export const useRecords = () => {
    const [records, setRecords] = useState<RecordRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRecords = useCallback(() => {
        setLoading(true);
        invoke<RecordRow[]>("get_records")
            .then(setRecords)
            .catch((err) => setError(String(err)))
            .finally(() => setLoading(false));
    }, []);

    const deleteRecord = useCallback(async (record_id: number) => {
        try {
            await invoke("delete_record", { recordId:record_id });
            fetchRecords();
        } catch (err) {
            setError(String(err));
        }
    }, [fetchRecords]);


    useEffect(() => {
        fetchRecords();
    }, [fetchRecords]);

    return { records, loading, error, refetch: fetchRecords, deleteRecord };
};