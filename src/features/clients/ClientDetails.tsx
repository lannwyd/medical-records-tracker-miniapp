import { Hospital, UserRound, MapPin } from "lucide-react"
const ClientDetails = () => {
    return (
        <div className="w-full h-full flex flex-col p-2">
            <div className="w-full h-[25%] grid grid-cols-2 grid-rows-1 gap-2 ">
                <div className=" bg-linear-to-t from-indigo-200 to-indigo-300 rounded-lg border-border/40 border shadow-lg/50 shadow-shadow flex flex-col justify-evenly items-center">
                    <div className="w-full flex justify-between items-center p-2">
                        <p className="font-bold w-[50%] text-indigo-700">مشري فاروق محمد الفاتح</p>
                        <div className="w-[50px] h-[50px] rounded-[50%] border-indigo-700 border-3">
                            <UserRound size={36} className="relative top-1 right-1 text-indigo-700" />
                        </div>
                    </div>
                    <div className="bg-indigo-700 h-1 rounded-xl w-[90%] "></div>
                    <div className=" w-full flex justify-between items-center p-2">
                        <div className=" w-[50px] h-[50px] rounded-[50%] border-indigo-700 border-3">
                            <MapPin size={36} className="relative top-1 right-1 text-indigo-700" />
                        </div>
                        <p className=" font-bold w-[50%] text-indigo-700">واد النجاء</p>
                    </div>
                </div>
                <div className=" bg-linear-to-t from-teal-200 to-teal-300 rounded-lg border-border/40 border shadow-lg/50 shadow-shadow flex flex-col justify-evenly items-center">
                    <div className="w-full flex justify-between items-center p-2">
                        <p className="font-bold w-[50%] text-teal-700">مشري فاروق محمد الفاتح</p>
                        <div className="w-[50px] h-[50px] rounded-[50%] border-teal-700 border-3">
                            <Hospital size={36} className="relative top-1 right-1 text-teal-700" />
                        </div>
                    </div>
                    <div className="bg-teal-700 h-1 rounded-xl w-[90%] "></div>
                    <div className=" w-full flex justify-between items-center p-2">
                        <div className=" w-[50px] h-[50px] rounded-[50%] border-teal-700 border-3">
                            <MapPin size={36} className="relative top-1 right-1 text-teal-700" />
                        </div>
                        <p className=" font-bold w-[50%] text-teal-700">واد النجاء</p>
                    </div>
                </div>
                

            </div>
        </div>
    )
}

export default ClientDetails