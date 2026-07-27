import { CalendarDays } from "lucide-react"
import { RecordRow } from "../types";

export const RecordDate = ({ record }: { record: RecordRow }) => {
    return (
        <div className=" p-3 flex flex-row bg-panel rounded-lg  border-border/40 border shadow-lg/10 shadow-shadow  justify-center ">
            <div className=" flex flex-row gap-4 items-center ">
                <p className="font-bold text-sm  text-indigo-700 break-all">{record.date}</p>
                <CalendarDays size={20} />
            </div>
        </div>
    )
}