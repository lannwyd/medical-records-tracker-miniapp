import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface ClientFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
    title: string;
}

const ClientFormDialog = ({ open, onOpenChange, children, title }: ClientFormDialogProps) => {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
                <Dialog.Content
                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg bg-panel rounded-xl shadow-lg p-6 outline-none"
                >
                    <div className="flex items-center justify-between mb-4">
                        <Dialog.Title className="text-lg font-semibold text-text">{title}</Dialog.Title>
                        <Dialog.Close asChild>
                            <button className="text-text/60 hover:text-text">
                                <X size={20} />
                            </button>
                        </Dialog.Close>
                    </div>

                    {children}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default ClientFormDialog;