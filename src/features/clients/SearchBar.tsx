
const SearchBar = () => {

    return (
        <section className="w-full min-h-16 flex flex-row justify-center items-center bg-panel border-border/40 border shadow-lg/10 shadow-shadow gap-4 rounded-xl ">
            <label htmlFor="client">البحث عن المريض :</label>    
            <input type="text" name="client" id="client-input" className="bg-surface rounded-lg p-1.5" />
        </section>
    )
}

export default SearchBar