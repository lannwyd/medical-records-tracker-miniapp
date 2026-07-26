import { NotepadText } from "lucide-react"

const Notes = () => {
    return (
        <div className="w-[95%] h-fit flex flex-col bg-panel rounded-lg  shadow-lg/10 shadow-shadow p-2 gap-2 justify-between">
            <div className="  bg-linear-to-t bg-indigo-50 rounded-lg  flex flex-row justify-evenly items-center ">
                    
                    <div className="flex flex-row w-full  gap-3 items-baseline ">
                        <NotepadText size={18} className="relative top-1 right-1 text-indigo-700" />
                        <p className=" text-sm font-semibold text-indigo-700">واد النجاء</p>
                    </div>
                
            </div> 
        </div>
    )
}

export default Notes