import {BriefcaseMedical} from "lucide-react"

export const MedicineInfo = () => {
    return (
        <div className=" p-3 flex flex-row bg-panel rounded-lg  shadow-lg/10 shadow-shadow  justify-center ">
            <div className=" flex flex-row gap-3 items-center ">
                <p className="font-bold text-sm  text-indigo-700">phamoxal 100 mg</p>
                <BriefcaseMedical  size={24} className="text-indigo-600 "/>
            </div>
        </div>
    )
}
