import { useEffect, useState } from "react";
import { Drawer } from "vaul"

const ClientDrawer = () => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        (window as any).setDrawerOpen = setOpen;
    }, []);

    return (
        <section className="w-full h-full flex-1 bg-bg">
            <Drawer.Root direction="left" open={open}>
                <Drawer.Portal>
                    <Drawer.Content className="w-[33%] h-[87%] bg-panel border-border/40 border shadow-lg/10 shadow-shadow rounded-lg outline-none fixed top-22 left-0 ">
                        <div className="p-4 bg-white h-full"></div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </section >
    )
}

export default ClientDrawer