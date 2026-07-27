import { Hospital, User, MapPin } from "lucide-react"
import { RecordRow } from "../types";

const ClientDetails = ({ record }: { record: RecordRow }) => {
    return (
        <div className="w-[60%] min-w-[60%] h-full flex flex-col bg-panel rounded-lg  border-border/40 border shadow-lg/10 p-2 gap-2 justify-between">
            <div className=" h-full bg-linear-to-t  bg-indigo-50 rounded-lg  flex flex-row justify-evenly items-center ">
                <div className=" w-full flex flex-col justify-between  items-start gap-4 p-2">
                    <p className="font-bold text-lg  text-indigo-700">{record.client_name}</p>
                    <div className="flex flex-row w-full  gap-3 items-baseline ">
                        <MapPin size={18} className="relative top-1 right-1 text-indigo-700" />
                        <p className=" text-sm font-semibold text-indigo-700">{record.client_adr || "—"}</p>
                    </div>
                </div>
                <div className="w-[50%] flex flex-row items-center justify-end px-4">
                    <div className="w-14 h-14 rounded-[50%] bg-indigo-200 ">
                        <User size={30} strokeWidth={1.5} className="relative top-3 right-3 text-indigo-600 " />
                    </div>
                </div>
            </div>
            <div className=" h-full bg-linear-to-t bg-teal-100 rounded-lg  flex flex-row justify-evenly items-center ">
                <div className=" w-full flex flex-col justify-between  items-start gap-4 p-2">
                    <p className="font-bold text-lg text-teal-700">{record.doctor_name || "—"}</p>
                    <div className="flex flex-row w-full  gap-3 items-baseline ">
                        <MapPin size={18} className="relative top-1 right-1 text-teal-700" />
                        <p className=" text-sm font-semibold text-teal-700">{record.doctor_adr || "—"}</p>
                    </div>
                </div>
                <div className="w-[50%] flex flex-row items-center justify-end px-4">
                    <div className="w-14 h-14 rounded-[50%] bg-teal-200 ">
                        <Hospital size={30} strokeWidth={1.5} className="relative top-3 right-3 text-teal-600 " />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientDetails