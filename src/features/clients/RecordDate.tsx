import { CalendarDays } from "lucide-react"

export const RecordDate = () => {
    return (
        <div className=" p-3 flex flex-row bg-panel rounded-lg  shadow-lg/10 shadow-shadow  justify-center ">
            <div className=" flex flex-row gap-4 items-center">
                <p className="font-bold text-lg  text-indigo-700">22/11/2026</p>
                <CalendarDays size={20} />
            </div>
        </div>
    )
}