import { Hospital, User, MapPin } from "lucide-react"
const ClientDetails = () => {
    return (
        <div className="w-[95%] h-fit flex flex-col bg-panel rounded-lg  shadow-lg/10 shadow-shadow p-2 gap-2 justify-between">
            <div className="  bg-linear-to-t bg-indigo-50 rounded-lg  flex flex-row justify-evenly items-center ">
                <div className=" w-full flex flex-col justify-between  items-start gap-4 p-4">
                    <p className="font-bold text-lg  text-indigo-700">مشري فاروق محمد الفاتح</p>
                    <div className="flex flex-row w-full  gap-3 items-baseline ">
                        <MapPin size={18} className="relative top-1 right-1 text-indigo-700" />
                        <p className=" text-sm font-semibold text-indigo-700">واد النجاء</p>
                    </div>
                </div>
                <div className="w-[50%] flex flex-row items-center justify-end px-4">
                    <div className="w-17 h-17 rounded-[50%] bg-indigo-200 ">
                        <User size={40} className="relative top-3 right-3.5 text-indigo-600 " />
                    </div>
                </div>
            </div>
            <div className=" bg-linear-to-t bg-teal-100 rounded-lg  flex flex-row justify-evenly items-center ">
                <div className=" w-full flex flex-col justify-between  items-start gap-4 p-4">
                    <p className="font-bold text-lg text-teal-700">مشري فاروق محمد الفاتح</p>
                    <div className="flex flex-row w-full  gap-3 items-baseline ">
                        <MapPin size={18} className="relative top-1 right-1 text-teal-700" />
                        <p className=" text-sm font-semibold text-teal-700">واد النجاء</p>
                    </div>
                </div>
                <div className="w-[50%] flex flex-row items-center justify-end px-4">
                    <div className="w-17 h-17 rounded-[50%] bg-teal-200 ">
                        <Hospital size={40} className="relative top-3 right-3.5 text-teal-600 " />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientDetails