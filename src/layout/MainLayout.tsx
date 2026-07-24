import SearchBar from "../features/clients/SearchBar";
import ClientsList from "../features/clients/ClientsList";
import ClientDrawer from "../features/clients/ClientDrawer";

const MainLayout = () => {
    return (
        <div className="w-full h-screen flex flex-col  gap-3  p-3 ">
            <SearchBar />
            <div className="w-full h-full flex flex-row gap-3 rounded-xl ">
                <ClientsList/>
                <ClientDrawer/>
            </div>


        </div >
    )
}

export default MainLayout