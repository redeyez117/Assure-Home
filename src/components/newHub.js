import { useState } from "react"

const NewHub = ({closeForm, add, filteredHubs}) => {
    const [hub, setHub] = useState('')
    const cancelCreation = (value) => {
        closeForm(value)
    }

    const isAlreadyAdded = (hub) => {
        return filteredHubs.find(item => item.serialNo.toLowerCase() === hub.toLowerCase())
    }

    const addNewHub = (value) => {
        if(!value.length) {
          return alert('Please fill serial number field!')
        } 
        if(isAlreadyAdded(value)) {
            return alert(`Hub with serial number ${value} already exist!`)
        }
       const newHub = {
        serialNo: value,
        status: 'NEW',
        latest_updated: new Date()
       }
       add(newHub)
       setHub('')
    }
    
    return (
        <div data-testid='new-hub-div' className="add-hub-form">
            <input value={hub} onChange={(e)=>setHub(e.target.value)} placeholder="Serial number ex H542k...." className="search-input"/>
            <button onClick={()=>addNewHub(hub)} className="action_button form_btn">ADD</button>
            <button onClick={() => cancelCreation(false)} className="action_btn close_form_btn">Cancel</button>
        </div>
    )
}

export default NewHub