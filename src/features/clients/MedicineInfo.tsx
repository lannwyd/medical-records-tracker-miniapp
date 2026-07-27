import { BriefcaseMedical } from "lucide-react"
import { RecordRow } from "../types";

export const MedicineInfo = ({ record }: { record: RecordRow }) => {
    return (
        <div className=" p-3 flex flex-row bg-panel border-border/40 border shadow-lg/10 rounded-lg   shadow-shadow  justify-center ">
            <div className=" w-full flex flex-row gap-3 items-center justify-between ">
                <p className="font-bold text-sm  text-indigo-700 break-all">{record.med_name}</p>
                <BriefcaseMedical size={24} className="text-indigo-600 " />
            </div>
        </div>
    )
}