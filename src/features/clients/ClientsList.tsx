import ClientListItem from "./ClientListItem"
const ClientsList = () => {
    return (
        <section className="w-full flex-2 overflow-auto custom-y-scrollbar bg-panel border-border/40 border shadow-lg/10 shadow-shadow rounded-xl p-2 font-rubik">
            <div className="grid grid-cols-9 gap-2 h-8 items-center border-border/40 border-b px-2 text-xs font-semibold text-text/70 text-right">
                <p>تاريخ</p>
                <p>اسم المريض</p>
                <p>العنوان</p>
                <p>الدواء</p>
                <p>الكمية</p>
                <p>الطبيب</p>
                <p>العنوان</p>
                <p>الصيغة</p>
            </div>

            <div className="w-full flex flex-col gap-1 mt-1 ">
                {Array.from({ length: 15 }).map((_, index) => (
                    <ClientListItem key={index} />
                ))}
            </div>
        </section>
    )
}

export default ClientsList