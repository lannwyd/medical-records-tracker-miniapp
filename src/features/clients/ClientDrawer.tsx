import { motion, AnimatePresence } from "framer-motion";
import ClientDetails from "./ClientDetails"
import Notes from "./Notes"
import { MedicineInfo } from "./MedicineInfo"
import { RecordDate } from "./RecordDate"
import { Quantity } from "./Quantity"
import { RecordRow } from "../types";
import { X } from "lucide-react";
interface ClientDrawerProps {
    record: RecordRow | null;
    onClose: () => void;
}

const ClientDrawer = ({ record, onClose }: ClientDrawerProps) => {
    return (
        <div className="h-full w-full overflow-hidden relative">
            <AnimatePresence>
                {record && (
                    <motion.section
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 300, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="h-full w-full bg-bg flex flex-col items-center shadow-shadow rounded-lg gap-3 relative"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-2 left-2 z-10 text-text/50 hover:text-text hover:cursor-pointer"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex flex-row w-full justify-between">
                            <ClientDetails record={record} />
                            <div className="w-[38%] flex flex-col gap-2">
                                <RecordDate record={record} />
                                <MedicineInfo record={record} />
                                <Quantity record={record} />
                            </div>
                        </div>

                        <Notes record={record} />
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ClientDrawer