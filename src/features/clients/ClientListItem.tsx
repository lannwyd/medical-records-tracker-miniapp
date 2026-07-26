import {X,SquarePen,Copy} from "lucide-react"


const ClientListItem = () => {
    return (
        <div className=" grid grid-cols-9 gap-3 items-center border-border/40 border-b py-3 px-2 text-xs text-text text-right hover:bg-white/5 transition-colors min-h-12.5">
            <p className="whitespace-nowrap ">24/07/2026</p>
            <p className="font-medium leading-snug wrap-break-word">
                مشري فاروق محمد الفاتح
            </p>
            <p className="wrap-break-word">واد النجاء</p>
            <p dir="ltr" className=" text-right font-medium wrap-break-word">phamoxal 100 mg</p>
            <p dir="ltr" className=" whitespace-nowrap ">6 bts</p>
            <p className="font-medium leading-snug wrap-break-word">
                بن عبد الرحمن محمد الهادي
            </p>
            <p className="wrap-break-word">واد النجاء</p>
            <p className="whitespace-nowrap font-medium">gel</p>
            <div className="flex flex-row  gap-2">
                <X size={24} className="text-red-600 hover:text-red-900 hover:cursor-pointer"/>
                <SquarePen size={24} className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer"/>
                <Copy size={24} className="text-slate-600 hover:text-slate-900 hover:cursor-pointer"/>
            </div>
        </div>
    );
};

export default ClientListItem;