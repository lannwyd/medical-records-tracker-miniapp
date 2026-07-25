const ClientListItem = () => {
    return (
        <div className=" grid grid-cols-8 gap-3 items-center border-border/40 border-b py-3 px-2 text-xs text-text text-right hover:bg-white/5 transition-colors min-h-12.5">
            <p className="whitespace-nowrap ">24/07/2026</p>
            <p className="font-medium leading-snug wrap-break-word">
                مشري فاروق محمد الفاتح
            </p>
            <p className="wrap-break-word">واد النجاء</p>
            <p className="dir-ltr text-right font-medium wrap-break-word">phamoxal 100 mg</p>
            <p className="whitespace-nowrap">6 bts</p>
            <p className="font-medium leading-snug wrap-break-word">
                بن عبد الرحمن محمد الهادي
            </p>
            <p className="wrap-break-word">واد النجاء</p>
            <p className="whitespace-nowrap font-medium">gel</p>
        </div>
    );
};

export default ClientListItem;