import { X, SquarePen, Copy } from "lucide-react";
import { RecordRow } from "../types";

interface ClientListItemProps {
    record: RecordRow;
    onDelete: (record_id: number) => void;
}

const ClientListItem = ({ record, onDelete }: ClientListItemProps) => {
    return (
        <div className="grid grid-cols-9 gap-3 items-center border-border/40 border-b py-3 px-2 text-xs text-text text-right hover:bg-white/5 transition-colors min-h-12.5">
            <p className="whitespace-nowrap">{record.date}</p>
            <p className="font-medium leading-snug wrap-break-word">{record.client_name}</p>
            <p className="wrap-break-word">{record.client_adr}</p>
            <p dir="ltr" className="text-right font-medium wrap-break-word">{record.med_name}</p>
            <p dir="ltr" className="whitespace-nowrap">{record.quantity}</p>
            <p className="font-medium leading-snug wrap-break-word">{record.doctor_name}</p>
            <p className="wrap-break-word">{record.doctor_adr}</p>
            <p className="whitespace-nowrap font-medium">{record.med_form ?? "—"}</p>
            <div className="flex flex-row gap-2">
                <X
                    size={24}
                    onClick={() => onDelete(record.record_id)}
                    className="text-red-600 hover:text-red-900 hover:cursor-pointer"
                />
                <SquarePen size={24} className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer" />
                <Copy size={24} className="text-slate-600 hover:text-slate-900 hover:cursor-pointer" />
            </div>
        </div>
    );
};

export default ClientListItem;