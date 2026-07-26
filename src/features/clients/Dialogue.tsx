import * as Dialog from "@radix-ui/react-dialog"


const Dialogue = () => {
    return (
        <Dialog.Root open={open}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md">
                    {/* ClientForm goes here */}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default Dialogue