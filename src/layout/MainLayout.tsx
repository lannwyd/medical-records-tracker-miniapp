import SearchBar from "../features/clients/SearchBar";
import ClientsList from "../features/clients/ClientsList";
import ClientDrawer from "../features/clients/ClientDrawer";

const MainLayout = () => {

    return (

        <div className="w-full h-full flex flex-col  gap-3 min-h-0  ">
            <SearchBar />

            <div className="w-full h-[90%] flex flex-row gap-3 rounded-xl ">
                <ClientsList/>
                <ClientDrawer state : open/>
            </div>
        </div >
    )
}

export default MainLayout