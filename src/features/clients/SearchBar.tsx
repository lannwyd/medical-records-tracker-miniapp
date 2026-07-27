import { useState } from "react";
import ClientFormDialog from "./Dialog";
import { useAddRecord } from "../hooks/useAddRecords";

interface SearchBarProps {
    onRecordAdded?: () => void;
}

const SearchBar = ({ onRecordAdded }: SearchBarProps) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const {
        state,
        setters,
        medicationActions,
        loading,
        errors,
        submitForm,
    } = useAddRecord(() => {
        setDialogOpen(false);
        if (onRecordAdded) onRecordAdded();
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await submitForm();
    };

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
                onClick={() => setDialogOpen(true)}
                className="px-6 py-2 rounded-lg text-white font-medium bg-linear-to-r from-indigo-500 via-indigo-600 to-indigo-500 bg-size-[200%_100%] bg-position-[0%_0%] hover:bg-position-[100%_0%] transition-[background-position] duration-500 ease-in-out hover:cursor-pointer"
            >
                إضافة مريض
            </button>

            <ClientFormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                title="إضافة مريض"
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
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-sm font-medium">الأدوية *</p>
                            <button
                                type="button"
                                onClick={medicationActions.addMedicationRow}
                                className="text-xs text-indigo-600 hover:underline"
                            >
                                + إضافة دواء آخر
                            </button>
                        </div>

                        {errors.medications && (
                            <p className="text-red-500 text-xs mb-2">{errors.medications}</p>
                        )}

                        <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pl-1">
                            {state.medications.map((med, i) => (
                                <div key={i} className="flex flex-col gap-1 border-b border-border/20 pb-2">
                                    <div className="grid grid-cols-7 gap-2 items-center">
                                        <input
                                            placeholder="اسم الدواء"
                                            value={med.name}
                                            onChange={(e) =>
                                                medicationActions.updateMedication(i, "name", e.target.value)
                                            }
                                            className="col-span-3 border border-border/40 rounded-lg p-2 text-sm"
                                        />
                                        <input
                                            placeholder="الصيغة"
                                            value={med.form}
                                            onChange={(e) =>
                                                medicationActions.updateMedication(i, "form", e.target.value)
                                            }
                                            className="col-span-2 border border-border/40 rounded-lg p-2 text-sm"
                                        />
                                        <input
                                            placeholder="الكمية"
                                            type="number"
                                            value={med.quantity}
                                            onChange={(e) =>
                                                medicationActions.updateMedication(
                                                    i,
                                                    "quantity",
                                                    parseInt(e.target.value) || 0
                                                )
                                            }
                                            className="col-span-1 border border-border/40 rounded-lg p-2 text-sm"
                                        />
                                        {state.medications.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => medicationActions.removeMedicationRow(i)}
                                                className="col-span-1 text-red-500 text-xs hover:underline"
                                            >
                                                حذف
                                            </button>
                                        )}
                                    </div>
                                    {errors[`medications.${i}.name`] && (
                                        <p className="text-red-500 text-xs">
                                            {errors[`medications.${i}.name`]}
                                        </p>
                                    )}
                                </div>
                            ))}
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