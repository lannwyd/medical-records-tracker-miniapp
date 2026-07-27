import ClientListItem from "./ClientListItem"
import { RecordRow } from "../types";

interface ClientsListProps {
    records: RecordRow[];
    loading: boolean;
    error: string | null;
    onDelete: (record_id: number) => void;
    onEdit: (record: RecordRow) => void;
    onDuplicate: (record: RecordRow) => void;
}

const ClientsList = ({ records, loading, error, onDelete, onEdit, onDuplicate }: ClientsListProps) => {
    if (loading) return <p className="p-4 text-text/60">جار التحميل...</p>;
    if (error) return <p className="p-4 text-red-600">{error}</p>;
    return (
        <section className="w-full flex-2 overflow-auto custom-y-scrollbar bg-panel border-border/40 border shadow-lg/10 shadow-shadow rounded-xl p-2 font-rubik">
            <div className="grid grid-cols-9 gap-2 h-8 items-center border-border/40 border-b px-2 text-xs font-semibold text-text/70 text-right">
                <p>تاريخ</p>
                <p>اسم المريض</p>
                <p>العنوان</p>
                <p>الدواء</p>
                <p>الكمية</p>
                <p>الطبيب</p>
                <p>العنوان</p>
                <p>الصيغة</p>
            </div>

            <div className="w-full flex flex-col gap-1 mt-1 ">
                {records.length === 0 && (
                    <p className="p-4 text-center text-text/50">لا توجد سجلات</p>
                )}
                {records.map((record) => (
                    <ClientListItem
                        key={record.medication_id}
                        record={record}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        onDuplicate={onDuplicate}
                    />
                ))}
            </div>
        </section>
    )
}

export default ClientsList