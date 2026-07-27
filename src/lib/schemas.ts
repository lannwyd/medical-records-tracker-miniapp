import { z } from "zod";

export const medicationSchema = z.object({
    name: z.string().min(1, "اسم الدواء مطلوب"),
    form: z.string().optional(),
    quantity: z.coerce.number().min(1, "الكمية يجب أن تكون 1 على الأقل"),
});

export const clientFormSchema = z.object({
    client_name: z.string().min(1, "اسم المريض مطلوب"),
    client_adr: z.string().optional(),
    date: z.string().min(1, "التاريخ مطلوب"),
    doctor_name: z.string().optional(),
    doctor_adr: z.string().optional(),
    notes: z.string().optional(),
    medications: z
        .array(medicationSchema)
        .min(1, "يجب إضافة دواء واحد على الأقل"),
});
export type ClientFormData = z.infer<typeof clientFormSchema>;