import { Drawer } from "vaul"
import ClientDetails from "./ClientDetails"
import Notes from "./Notes"

const ClientDrawer = () => {
    return (
        <section className="w-full h-full flex-1 ">
            <Drawer.Root direction="left" open={open}>
                <Drawer.Portal>
                    <Drawer.Content className="w-[33%] h-[87%] bg-bg flex flex-col items-center rounded-lg outline-none fixed top-22 left-0 gap-3 ">
                        <ClientDetails/>
                        <Notes/>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </section >
    )
}

export default ClientDrawer