import { Hospital, UserRound, MapPin } from "lucide-react"
const ClientDetails = () => {
    return (
        <div className="w-full h-full flex flex-col p-2">
            <div className="w-full h-[25%] grid grid-cols-2 grid-rows-1 gap-2 ">
                <div className=" bg-linear-to-t from-indigo-200 via-indigo-100 to-indigo-200 rounded-lg border-border/40 border shadow-lg/40 shadow-shadow flex flex-col justify-evenly items-center">
                    <div className="w-full flex justify-between  items-center p-2">
                        <p className="font-bold w-[50%] text-indigo-700">مشري فاروق محمد الفاتح</p>
                        <div className="w-12.5 h-12.5 rounded-[50%] border-indigo-700 border-3">
                            <UserRound size={36} className="relative top-1 right-1 text-indigo-700" />
                        </div>
                    </div>
                    <div className="bg-indigo-700 h-1 rounded-xl w-[90%] "></div>
                    <div className=" w-full flex justify-between items-center p-2">
                        <div className=" w-12.5 h-12.5 rounded-[50%] border-indigo-700 border-3">
                            <MapPin size={36} className="relative top-1 right-1 text-indigo-700" />
                        </div>
                        <p className=" font-bold w-[50%] text-indigo-700">واد النجاء</p>
                    </div>
                </div>
                <div className=" bg-linear-to-t from-teal-200 via-teal-100 to-teal-200 rounded-lg border-border/40 border shadow-lg/40 shadow-shadow flex flex-col justify-evenly items-center">
                    <div className="w-full flex justify-between items-center p-2">
                        <p className="font-bold w-[50%] text-teal-700">مشري فاروق محمد الفاتح</p>
                        <div className="w-12.5 h-12.5 rounded-[50%] border-teal-700 border-3">
                            <Hospital size={36} className="relative top-1 right-1 text-teal-700" />
                        </div>
                    </div>
                    <div className="bg-teal-700 h-1 rounded-xl w-[90%] "></div>
                    <div className=" w-full flex justify-between items-center p-2">
                        <div className=" w-12.5 h-12.5 rounded-[50%] border-teal-700 border-3">
                            <MapPin size={36} className="relative top-1 right-1 text-teal-700" />
                        </div>
                        <p className=" font-bold w-[50%] text-teal-700">واد النجاء</p>
                    </div>
                </div>
            </div>
            <div className="w-full h-full flex flex-col justify-between">
                <div className="">
                    <p className="font-bold">ملاحظة الصيدلي :</p>
                </div>
                <div className="w-full h-[40%]  rounded-lg border-border/40 border shadow-lg/30 shadow-shadow overflow-auto custom-y-scrollbar">
                    <p className="font-bold">ملاحظة الصيدلي :</p>
                    <p>تتسارع الأيام وتتداخل الأحداث في عالم لا يتوقف عن الحركة، حيث يبحث الإنسان دائمًا عن لحظة هدوء يسترجع فيها أنفاسه.
                        بين تفاصيل الحياة اليومية الصغيرة، تكمن حكايات لا تُحكى ومشاعر نغفل عنها في زحام المواعيد والالتزامات.
                        القهوة الصباحية، وصوت المطر، ونظرة أمل في عين غريب، كلها لوحات بسيطة تشكل جوهر وجودنا الإنساني.
                        نحن لا نحتاج دومًا إلى إنجازات ضخمة لنشعر بالرضا، بل يكفي أن نكون حاضرين بقلوبنا في كل تجربة نمر بها.
                        التغيير ليس عدوًا كما نظن، بل هو النافذة الوحيدة التي تسمح للأنوار الجديدة بالدخول إلى أرواحنا وتجديد شغفنا.
                        قد تتعثر الخطوات في بعض الأحيان وتصبح الطريق غائمة، لكن الصبر يظل البوصلة التي تهدينا نحو بر الأمان.
                        استمع إلى حكايات من حولك بقلب مفتوح، فكل شخص تقابله يحمل درسًا أو حكمة لم تكن تعرفها من قبل.
                        المعرفة ليست مجرد معلومات نجمعها، بل هي كيفية استخدام تلك المعرفة لنجعل العالم مكانًا أكثر دفئًا وتفهمًا.
                        ابتسم للتحديات، فما هي إلا فصول في كتاب حياتك ستجعل القصة أكثر جمالًا وإثارة عند قراءتها مستقبلاً.
                        وفي نهاية المطاف، يبقى الأثر الطيب والكلمة الصادقة هما الشيء الوحيد الذي ينير عتمة الأيام ولا يزول أبدًا.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ClientDetails