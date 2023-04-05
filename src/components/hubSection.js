import { useState } from "react"
import { entries } from "../data/entries"
import TabContent from "./tabContent"
import TabNavItem from "./tabNavItem"
import Hub from "./hub"
const HubSection = () => {
    const [activeTab, setActiveTab] = useState('tab1')
    const [favouriteHubs, setFavouriteHubs] = useState([])
    const [hubs, setHubs] = useState(entries)

    const addToFavourite = (favourite) => {
        const editedHubs = {...favourite, favourite:favourite.favourite}
        const mappedHubs = hubs.map(item => item.serialNo !== favourite.serialNo ? item : editedHubs)
        const newFavArray = [favourite, ...favouriteHubs]
        setHubs(mappedHubs)
        setFavouriteHubs(newFavArray)
       
        
    }

    const removeFromFavourite = (favourite) => {
        const editedHubs = {...favourite, favourite:favourite.favourite}
        const mappedHubs = hubs.map(item => item.serialNo !== favourite.serialNo ? item : editedHubs)
        const unFavourites = favouriteHubs.filter(item => item.serialNo !== favourite.serialNo)
        setHubs(mappedHubs)
        setFavouriteHubs(unFavourites)
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
          <TabContent id="tab1" activeTab={activeTab}>
            <div className="hub-container">
               {hubs.map(hub=>(
                <Hub key={hub.serialNo} item={hub} addFavouriteHub={addToFavourite} removeFromFavourite={removeFromFavourite}></Hub>
               ))}
            </div>
          </TabContent>
          <TabContent id="tab2" activeTab={activeTab}>
             <div className="hub-container">
                {favouriteHubs.map(favHub=>(
                <Hub key={favHub.serialNo} item={favHub} removeFromFavourite={removeFromFavourite}></Hub>
               ))}
             </div>
          </TabContent>
      </div>
    )
}

export default HubSection