import { X, SquarePen, Copy } from "lucide-react";
import { RecordRow } from "../types";

interface ClientListItemProps {
    record: RecordRow;
    onDelete: (record_id: number) => void;
    onEdit: (record: RecordRow) => void;
    onDuplicate: (record: RecordRow) => void;
    onSelect: (record: RecordRow) => void;
    isSelected: boolean;
}

const ClientListItem = ({ record, onDelete, onEdit, onDuplicate, onSelect, isSelected }: ClientListItemProps) => {
    const hasNotes = !!record.notes?.trim();

    return (
        <div
            onClick={() => onSelect(record)}
            className={`flex-2 grid grid-cols-9 gap-3 items-center hover:cursor-pointer border-border/40 border-b py-3 px-2 text-xs text-text text-right hover:bg-indigo-100 transition-colors duration-500 ease-in-out min-h-12.5 relative ${hasNotes ? "border-r-4 border-r-amber-400" : ""
                } ${isSelected ? "bg-indigo-100" : ""}`}
        >
            <p className="whitespace-nowrap">{record.date}</p>
            <p className="font-medium leading-snug wrap-break-word">{record.client_name}</p>
            <p className="wrap-break-word">{record.client_adr}</p>
            <p dir="ltr" className="text-right font-medium wrap-break-word">{record.med_name}</p>
            <p dir="ltr" className="whitespace-nowrap">{record.quantity}</p>
            <p className="font-medium leading-snug wrap-break-word">{record.doctor_name}</p>
            <p className="wrap-break-word">{record.doctor_adr}</p>
            <p className="  font-medium wrap-break-word">{record.med_form ?? "—"}</p>
            <div className="flex flex-row gap-2">
                <X
                    size={24}
                    onClick={(e) => { e.stopPropagation(); onDelete(record.record_id); }}
                    className="text-red-600 hover:text-red-900 hover:cursor-pointer"
                />
                <SquarePen
                    size={24}
                    onClick={(e) => { e.stopPropagation(); onEdit(record); }}
                    className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer"
                />
                <Copy
                    size={24}
                    onClick={(e) => { e.stopPropagation(); onDuplicate(record); }}
                    className="text-slate-600 hover:text-slate-900 hover:cursor-pointer"
                />
            </div>
        </div>
    );
};

export default ClientListItem;