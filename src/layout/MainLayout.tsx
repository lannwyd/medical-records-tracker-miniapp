import SearchBar from "../features/clients/SearchBar";
import ClientsList from "../features/clients/ClientsList";
import ClientDrawer from "../features/clients/ClientDrawer";
import { useRecords } from "../features/hooks/useRecords";

const MainLayout = () => {
    const { records, loading, error, refetch ,deleteRecord } = useRecords();

    return (

        <div className="w-full h-full flex flex-col  gap-3 min-h-0  ">
            <SearchBar onRecordAdded={refetch}/>

            <div className="w-full h-[90%] flex flex-row gap-1 rounded-xl ">
<ClientsList records={records} loading={loading} error={error} onDelete={deleteRecord} />                <ClientDrawer />
            </div>
        </div >
    )
}

export default MainLayout