import { RecordRow } from "../types";

export const Quantity = ({ record }: { record: RecordRow }) => {
    return (
        <div className=" h-full px-3 flex flex-col border-border/40 border  shadow-lg/10 bg-panel rounded-lg gap-3  shadow-shadow  justify-center ">
            <div className=" flex flex-row gap-3 items-center ">
                <p className="font-bold text-sm  text-indigo-700">الكمية : {record.quantity}</p>
            </div>
        </div>
    )
}