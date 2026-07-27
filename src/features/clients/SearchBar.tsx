import { useState, useEffect } from "react";
import ClientFormDialog from "./Dialog";
import { useAddRecord } from "../hooks/useAddRecords";
import { RecordRow } from "../types";

interface SearchBarProps {
    onRecordAdded?: () => void;
    formTarget: { mode: "add" | "edit" | "duplicate"; record: RecordRow | null } | null;
    onFormTargetChange: (target: { mode: "add" | "edit" | "duplicate"; record: RecordRow | null } | null) => void;
}

const SearchBar = ({ onRecordAdded, formTarget, onFormTargetChange }: SearchBarProps) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        if (formTarget) setDialogOpen(true);
    }, [formTarget]);

    const mode = formTarget?.mode ?? "add";
    const initialData = mode === "edit" || mode === "duplicate" ? formTarget?.record : null;

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

    const titles = { add: "إضافة مريض", edit: "تعديل السجل", duplicate: "نسخ السجل" };

    return (
        <section className="w-full min-h-16 flex flex-row justify-between items-center bg-panel border-border/40 border shadow-lg/10 shadow-shadow rounded-xl px-4">
            <div className="flex flex-row gap-4 items-center justify-center">
                <label htmlFor="client">البحث عن المريض :</label>
                <input
                    type="text"
                    name="client"
                    id="client-input"
                    placeholder="اسم المريض"
                    className="bg-surface rounded-lg p-1.5"
                />
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
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-right" dir="rtl">
                    {errors.submit && (
                        <p className="text-red-500 text-xs text-center">{errors.submit}</p>
                    )}

                    <div>
                        <label className="text-sm text-text/70">اسم المريض *</label>
                        <input
                            value={state.clientName}
                            onChange={(e) => setters.setClientName(e.target.value)}
                            className="w-full border border-border/40 rounded-lg p-2 text-sm"
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
                            className="w-full border border-border/40 rounded-lg p-2 text-sm"
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
                        <label className="text-sm text-text/70">الطبيب</label>
                        <input
                            value={state.doctorName}
                            onChange={(e) => setters.setDoctorName(e.target.value)}
                            className="w-full border border-border/40 rounded-lg p-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-text/70">عنوان الطبيب</label>
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

                        <div className="grid grid-cols-7 gap-2 items-center">
                            <input
                                placeholder="اسم الدواء"
                                value={state.medName}
                                onChange={(e) => setters.setMedName(e.target.value)}
                                className="col-span-3 border border-border/40 rounded-lg p-2 text-sm"
                            />
                            <input
                                placeholder="الصيغة"
                                value={state.medForm}
                                onChange={(e) => setters.setMedForm(e.target.value)}
                                className="col-span-2 border border-border/40 rounded-lg p-2 text-sm"
                            />
                            <input
                                placeholder="الكمية"
                                type="number"
                                value={state.quantity}
                                onChange={(e) => setters.setQuantity(parseInt(e.target.value) || 0)}
                                className="col-span-2 border border-border/40 rounded-lg p-2 text-sm"
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