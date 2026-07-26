
const SearchBar = () => {

    return (
        <section className="w-full min-h-16 flex flex-row justify-between items-center bg-panel border-border/40 border shadow-lg/10 shadow-shadow  rounded-xl px-4 ">
            <div className="flex flex-row gap-4 items-center justify-center">
                <label htmlFor="client">البحث عن المريض :</label>
                <input type="text" name="client" id="client-input" placeholder="اسم المريض" className="bg-surface rounded-lg p-1.5" />
            </div>
            <button className="px-6 py-2 rounded-lg text-white font-medium
            bg-linear-to-r from-indigo-500 via-indigo-600 to-indigo-500 bg-size-[200%_100%] bg-position-[0%_0%]
            hover:bg-position-[100%_0%]
            transition-[background-position] duration-500 ease-in-out hover:cursor-pointer">
                إضافة مريض
            </button>
        </section>
    )
}

export default SearchBar