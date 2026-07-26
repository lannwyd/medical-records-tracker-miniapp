import { Drawer } from "vaul"
import ClientDetails from "./ClientDetails"
import Notes from "./Notes"
import { MedicineInfo } from "./MedicineInfo"
import { RecordDate } from "./RecordDate"
import { Quantity } from "./Quantity"
import State from "./State"

const ClientDrawer = () => {
    return (
        <section className="w-full h-full flex-1 ">
            <Drawer.Root direction="left" open={open}>
                <Drawer.Portal>
                    <Drawer.Content className="w-[33%] h-[87%] bg-bg flex flex-col items-center rounded-lg outline-none fixed top-22 left-0 gap-3  ">
                        <State/>
                        <div className="  flex flex-row w-[95%] justify-between ">
                                <ClientDetails/>
                                <div className="w-[38%] flex flex-col gap-2">
                                    <RecordDate/>
                                    <MedicineInfo/>
                                    <Quantity/>
                                </div>
                        </div>
                        
                        <Notes/>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </section >
    )
}

export default ClientDrawer