import { useState } from "react";
import SearchBar from "../features/clients/SearchBar";
import ClientsList from "../features/clients/ClientsList";
import ClientDrawer from "../features/clients/ClientDrawer";
import { useRecords } from "../features/hooks/useRecords";
import { RecordRow } from "../features/types";

type FormTarget = { mode: "add" | "edit" | "duplicate"; record: RecordRow | null } | null;

const MainLayout = () => {
    const { records, loading, error, refetch, deleteRecord } = useRecords();
    const [formTarget, setFormTarget] = useState<FormTarget>(null);

    return (
        <div className="w-full h-full flex flex-col  gap-3 min-h-0  ">
            <SearchBar
                onRecordAdded={refetch}
                formTarget={formTarget}
                onFormTargetChange={setFormTarget}
            />

            <div className="w-full h-[90%] flex flex-row gap-1 rounded-xl ">
                <ClientsList
                    records={records}
                    loading={loading}
                    error={error}
                    onDelete={deleteRecord}
                    onEdit={(record) => setFormTarget({ mode: "edit", record })}
                    onDuplicate={(record) => setFormTarget({ mode: "duplicate", record })}
                />
                <ClientDrawer />
            </div>
        </div >
    )
}

export default MainLayout