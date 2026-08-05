import { useState, useEffect, useRef } from "react";
import ClientFormDialog from "./Dialog";
import { useAddRecord } from "../hooks/useAddRecords";
import { RecordRow } from "../types";

interface SearchBarProps {
    onRecordAdded?: () => void;
    formTarget: { mode: "add" | "edit" | "duplicate"; record: RecordRow | null } | null;
    onFormTargetChange: (target: { mode: "add" | "edit" | "duplicate"; record: RecordRow | null } | null) => void;
    searchQuery: string;
    onSearchQueryChange: (value: string) => void;
    dateFrom: string;
    onDateFromChange: (value: string) => void;
    dateTo: string;
    onDateToChange: (value: string) => void;
    hasNotesOnly: boolean;
    onHasNotesOnlyChange: (value: boolean) => void;
}

const SearchBar = ({
    onRecordAdded,
    formTarget,
    onFormTargetChange,
    searchQuery,
    onSearchQueryChange,
    dateFrom,
    onDateFromChange,
    dateTo,
    onDateToChange,
    hasNotesOnly,
    onHasNotesOnlyChange,
}: SearchBarProps) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const firstFieldRef = useRef<HTMLInputElement>(null);
    const doctorNameRef = useRef<HTMLInputElement>(null);
    const mode = formTarget?.mode ?? "add";
    const isDuplicate = mode === "duplicate";
    const initialData = mode === "edit" || mode === "duplicate" ? formTarget?.record : null;

    useEffect(() => {
        if (formTarget) setDialogOpen(true);
    }, [formTarget]);

    useEffect(() => {
        if (dialogOpen) {
            const timer = setTimeout(() => {
                if (isDuplicate) {
                    doctorNameRef.current?.focus();
                } else {
                    firstFieldRef.current?.focus();
                }
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [dialogOpen, isDuplicate]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== "Enter") return;
            if (dialogOpen) return;
            const active = document.activeElement;
            const isTyping = active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement;
            if (isTyping) return;
            e.preventDefault();
            searchInputRef.current?.focus();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    
    
    }, [dialogOpen]);

    const titles = { add: "إضافة مريض", edit: "تعديل السجل", duplicate: "نسخ السجل" };


    const {
        state,
        setters,
        loading,
        errors,
        submitForm,
    } = useAddRecord(
        () => {
            setDialogOpen(false);
            onFormTargetChange(null);
            if (onRecordAdded) onRecordAdded();
        },
        initialData,
        mode
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await submitForm();
    };

    const handleOpenChange = (open: boolean) => {
        setDialogOpen(open);
        if (!open) onFormTargetChange(null);
    };

    const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== "Enter") return;
    const target = e.target as HTMLElement;

    if (target.tagName === "TEXTAREA" && e.shiftKey) return;

    if (target instanceof HTMLButtonElement && target.type === "submit") return;

    e.preventDefault();

    const focusable = Array.from(
        formRef.current?.querySelectorAll<HTMLElement>("input, textarea, select, button[type='submit']") ?? []
    );
    const currentIndex = focusable.indexOf(target);
    const next = focusable[currentIndex + 1];
    next?.focus();
};


    return (
        <section className="w-full min-h-16 flex flex-row justify-between items-center bg-panel border-border/40 border shadow-lg/10 shadow-shadow rounded-xl px-4 gap-4">
            <div className="flex flex-row gap-4 items-center justify-center">
                <label htmlFor="client">البحث عن المريض :</label>
                <input
                    ref={searchInputRef}
                    type="text"
                    name="client"
                    id="client-input"
                    placeholder="اسم المريض . . ."
                    value={searchQuery}
                    onChange={(e) => onSearchQueryChange(e.target.value)}
                    className="bg-surface rounded-lg p-1.5"
                />
            </div>

            <div className="flex flex-row gap-3 items-center text-sm">
                <div className="flex flex-row gap-1 items-center">
                    <label htmlFor="date-from" className="text-text/70">من:</label>
                    <input
                        type="date"
                        id="date-from"
                        value={dateFrom}
                        onChange={(e) => onDateFromChange(e.target.value)}
                        className="bg-surface rounded-lg p-1.5 text-xs"
                    />
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <label htmlFor="date-to" className="text-text/70">إلى:</label>
                    <input
                        type="date"
                        id="date-to"
                        value={dateTo}
                        onChange={(e) => onDateToChange(e.target.value)}
                        className="bg-surface rounded-lg p-1.5 text-xs"
                    />
                </div>
                <label className="flex flex-row gap-1 items-center text-text/70 hover:cursor-pointer">
                    <input
                        type="checkbox"
                        checked={hasNotesOnly}
                        onChange={(e) => onHasNotesOnlyChange(e.target.checked)}
                        className="hover:cursor-pointer"
                    />
                    فقط مع ملاحظات
                </label>
            </div>

            <button
                onClick={() => onFormTargetChange({ mode: "add", record: null })}
                className="px-6 py-2 rounded-lg text-white font-medium bg-linear-to-r from-indigo-500 via-indigo-600 to-indigo-500 bg-size-[200%_100%] bg-position-[0%_0%] hover:bg-position-[100%_0%] transition-[background-position] duration-500 ease-in-out hover:cursor-pointer"
            >
                إضافة مريض
            </button>

            <ClientFormDialog
                open={dialogOpen}
                onOpenChange={handleOpenChange}
                title={titles[mode]}
            >
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    onKeyDown={handleFormKeyDown}
                    className="flex flex-col gap-3 text-right"
                    dir="rtl"
                >
                    {errors.submit && (
                        <p className="text-red-500 text-xs text-center">{errors.submit}</p>
                    )}

                    <div>
                        <label className="text-sm text-text/70">اسم المريض *</label>
                        <input
                            ref={firstFieldRef}
                            value={state.clientName}
                            onChange={(e) => setters.setClientName(e.target.value)}
                            readOnly={isDuplicate}
                            className={`w-full border border-border/40 rounded-lg p-2 text-sm ${isDuplicate ? "bg-gray-100 text-text/60" : ""}`}
                        />
                        {errors.client_name && (
                            <p className="text-red-500 text-xs mt-0.5">{errors.client_name}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm text-text/70">العنوان</label>
                        <input
                            value={state.clientAdr}
                            onChange={(e) => setters.setClientAdr(e.target.value)}
                            readOnly={isDuplicate}
                            className={`w-full border border-border/40 rounded-lg p-2 text-sm ${isDuplicate ? "bg-gray-100 text-text/60" : ""}`}
                        />
                    </div>


                    <div>
                        <label className="text-sm text-text/70">التاريخ *</label>
                        <input
                            type="date"
                            value={state.date}
                            onChange={(e) => setters.setDate(e.target.value)}
                            className="w-full border border-border/40 rounded-lg p-2 text-sm"
                        />
                        {errors.date && (
                            <p className="text-red-500 text-xs mt-0.5">{errors.date}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm text-text/70">الطبيب*</label>
                        <input
                            ref={doctorNameRef}
                            value={state.doctorName}
                            onChange={(e) => setters.setDoctorName(e.target.value)}
                            className="w-full border border-border/40 rounded-lg p-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-text/70">عنوان الطبيب*</label>
                        <input
                            value={state.doctorAdr}
                            onChange={(e) => setters.setDoctorAdr(e.target.value)}
                            className="w-full border border-border/40 rounded-lg p-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-text/70">ملاحظات</label>
                        <textarea
                            rows={2}
                            value={state.notes}
                            onChange={(e) => setters.setNotes(e.target.value)}
                            placeholder="أي ملاحظات إضافية..."
                            className="w-full border border-border/40 rounded-lg p-2 text-sm resize-none"
                        />
                    </div>

                    <div className="border-t border-border/40 pt-3 mt-1">
                        <p className="text-sm font-medium mb-2">الدواء *</p>

                        {errors.med_name && (
                            <p className="text-red-500 text-xs mb-2">{errors.med_name}</p>
                        )}

                        <div className="grid grid-cols-5  gap-2 items-center">
                            <input
                                placeholder="اسم الدواء"
                                value={state.medName}
                                onChange={(e) => setters.setMedName(e.target.value)}
                                className="col-span-3 border border-border/40 rounded-lg p-2 text-sm"
                            />
                            <label className="col-span-1 text-left rounded-lg p-2 text-sm">الكمية*</label>
                            <input
                                type="number"
                                value={state.quantity}
                                onChange={(e) => setters.setQuantity(parseInt(e.target.value) || 0)}
                                className="col-span-1 border border-border/40 rounded-lg p-2 text-sm"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-3 bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 transition-colors disabled:opacity-50 hover:cursor-pointer"
                    >
                        {loading ? "جاري الحفظ..." : "حفظ"}
                    </button>
                </form>
            </ClientFormDialog>
        </section>
    );
};

export default SearchBar;