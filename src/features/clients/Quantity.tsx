import {BriefcaseMedical} from "lucide-react"

export const Quantity = () => {
    return (
        <div className=" h-full p-3 flex flex-col bg-panel rounded-lg gap-3 shadow-lg/10 shadow-shadow  justify-center ">
            <div className=" flex flex-row gap-3 items-center ">
                <p className="font-bold text-sm  text-indigo-700">الكمية : </p>
            </div>
            <div className=" flex flex-row gap-3 items-center ">
                <p className="font-bold text-sm  text-indigo-700">الصيغة : </p>
            </div>
        </div>
    )
}