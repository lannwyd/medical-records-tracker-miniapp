import { NotepadText } from "lucide-react"

const Notes = () => {
    return (
        <div className="w-[95%] h-full flex flex-col bg-panel rounded-lg  shadow-lg/10 shadow-shadow p-2 gap-2 justify-between">
            <div className="flex flex-col items-center w-full  gap-3  ">
                <div className="flex flex-row  items-center gap-3 p-1">
                    <NotepadText size={26} strokeWidth={1.5} className="text-indigo-600" />
                    <p className="  text-lg font-semibold text-indigo-600">ملاحظة الصيدلي</p>
                </div>
                <div className="bg-slate-300 h-0.5 w-[80%] "></div>
            </div>
        </div>
    )
}

export default Notes