import { useState } from "react"
import { entries } from "../data/entries"
import TabContent from "./tabContent"
import TabNavItem from "./tabNavItem"
import Hub from "./hub"
import NewHub from "./newHub"
const HubSection = () => {
    const [activeTab, setActiveTab] = useState('tab1')
    const [favouriteHubs, setFavouriteHubs] = useState([])
    const [hubs, setHubs] = useState(entries)
    const [filteredHubs, setFilteredHubs] = useState(hubs)
    const [isAdding, setIsAdding] = useState(false)
    const addToFavourite = (favourite) => {
        const editedHubs = {...favourite, favourite:favourite.favourite}
        const mappedHubs = filteredHubs.map(item => item.serialNo !== favourite.serialNo ? item : editedHubs)
        const newFavArray = [favourite, ...favouriteHubs]
        setFilteredHubs(mappedHubs)
        setFavouriteHubs(newFavArray)
    }
    const removeFromFavourite = (favourite) => {
        const editedHubs = {...favourite, favourite:favourite.favourite}
        const mappedHubs = filteredHubs.map(item => item.serialNo !== favourite.serialNo ? item : editedHubs)
        const unFavourites = favouriteHubs.filter(item => item.serialNo !== favourite.serialNo)
        setFilteredHubs(mappedHubs)
        setFavouriteHubs(unFavourites)
    }

    const showHubsAfterStatusChange = (statusChangedHub) => {
        const editedHubs = {...statusChangedHub, status:statusChangedHub.status, latest_update:statusChangedHub.latest_update}
        const mappedHubs = filteredHubs.map(item => item.serialNo !== statusChangedHub.serialNo ? item : editedHubs)
        const favouriteMappedHub = favouriteHubs.map(item => item.serialNo !== statusChangedHub.serialNo ? item : editedHubs)
        setFilteredHubs(mappedHubs)
        setFavouriteHubs(favouriteMappedHub)
    }

    const handleSearch = (value) => {
        const searched = hubs.filter(item => item.serialNo.toLocaleLowerCase().includes(value.toLowerCase()))
        setFilteredHubs(searched)
    }

    const newHubAdded = (newHub) => {
        setFilteredHubs([newHub, ...hubs])
    }

    return(
        <div className="Tabs">
        <ul className="nav">
          <TabNavItem
            title="All Hubs"
            id="tab1"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          ></TabNavItem>
          <TabNavItem
            title="Favourite Hubs"
            id="tab2"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          ></TabNavItem>
        </ul>
        <div className="search-section">
        <input data-testid='searchbox' onChange={(e)=>handleSearch(e.target.value)} className="search-input" placeholder="Search hub..."/>
        {activeTab === 'tab1' && <button data-testid="create-hub" onClick={()=>setIsAdding(true)} className="action_button add_hub_btn">CREATE HUB</button>}
        </div>
        {isAdding && activeTab ==='tab1' && <NewHub filteredHubs={filteredHubs} activeTab={activeTab} add={newHubAdded} closeForm={setIsAdding}/>}
          <TabContent id="tab1" activeTab={activeTab}>
            <div className="hub-container">
               {filteredHubs.map(hub=>(
                <Hub key={hub.serialNo} item={hub} addFavouriteHub={addToFavourite} removeFromFavourite={removeFromFavourite} changedHubStatus={showHubsAfterStatusChange}></Hub>
               ))}
            </div>
          </TabContent>
          <TabContent id="tab2" activeTab={activeTab}>
             <div className="hub-container">
                {favouriteHubs.map(favHub=>(
                <Hub key={favHub.serialNo} item={favHub} removeFromFavourite={removeFromFavourite} changedHubStatus={showHubsAfterStatusChange}></Hub>
               ))}
             </div>
          </TabContent>
      </div>
    )
}

export default HubSection