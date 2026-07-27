import { NotepadText } from "lucide-react"
import { RecordRow } from "../types";

const Notes = ({ record }: { record: RecordRow }) => {
    return (
        <div className="w-full h-full flex flex-col border-border/40 border shadow-lg/10 bg-panel rounded-lg   shadow-shadow p-2 gap-2 justify-start overflow-hidden">
            <div className="flex flex-col items-center w-full  gap-3  shrink-0">
                <div className="flex flex-row  items-center gap-3 p-1">
                    <NotepadText size={26} strokeWidth={1.5} className="text-indigo-600" />
                    <p className="  text-lg font-semibold text-indigo-600">ملاحظة الصيدلي</p>
                </div>
                <div className="bg-slate-300 h-0.5 w-[80%] "></div>
            </div>
            <p className="flex-1 min-h-0 text-text text-right px-3 pb-2 whitespace-pre-wrap overflow-y-auto custom-y-scrollbar">
                    {record.notes || "لا توجد ملاحظات"}
                </p>
        </div>
    )
}

export default Notes