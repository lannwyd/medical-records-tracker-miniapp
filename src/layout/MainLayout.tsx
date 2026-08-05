import { useState, useMemo } from "react";
import SearchBar from "../features/clients/SearchBar";
import ClientsList from "../features/clients/ClientsList";
import ClientDrawer from "../features/clients/ClientDrawer";
import { useRecords } from "../features/hooks/useRecords";
import { RecordRow } from "../features/types";

type FormTarget = { mode: "add" | "edit" | "duplicate"; record: RecordRow | null } | null;

const MainLayout = () => {
    const { records, loading, error, refetch, deleteRecord } = useRecords();
    const [formTarget, setFormTarget] = useState<FormTarget>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [hasNotesOnly, setHasNotesOnly] = useState(false);

    const filteredRecords = useMemo(() => {
        return records.filter((r) => {
            if (searchQuery.trim() && !r.client_name.toLowerCase().includes(searchQuery.trim().toLowerCase())) {
                return false;
            }
            if (dateFrom && r.date < dateFrom) return false;
            if (dateTo && r.date > dateTo) return false;
            if (hasNotesOnly && !r.notes?.trim()) return false;
            return true;
        });
    }, [records, searchQuery, dateFrom, dateTo, hasNotesOnly]);

const selectedRecord = records.find((r) => r.medication_id === selectedId) ?? null;    return (
        <div className="w-full h-full flex flex-col  gap-3 min-h-0  ">
            <SearchBar
                onRecordAdded={refetch}
                formTarget={formTarget}
                onFormTargetChange={setFormTarget}
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
                dateFrom={dateFrom}
                onDateFromChange={setDateFrom}
                dateTo={dateTo}
                onDateToChange={setDateTo}
                hasNotesOnly={hasNotesOnly}
                onHasNotesOnlyChange={setHasNotesOnly}
            />

            <div className="w-full h-[90%] flex flex-row gap-1 rounded-xl ">
                <ClientsList
                    records={filteredRecords}
                    loading={loading}
                    error={error}
                    onDelete={deleteRecord}
                    onEdit={(record) => setFormTarget({ mode: "edit", record })}
                    onDuplicate={(record) => setFormTarget({ mode: "duplicate", record })}
                    onSelect={(record) => setSelectedId(record.medication_id)}
                    selectedId={selectedId}
                />
                <ClientDrawer record={selectedRecord}  />
            </div>
        </div >
    )
}

export default MainLayout