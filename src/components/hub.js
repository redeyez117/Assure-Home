import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import moment from 'moment';
import { useState } from 'react';
import ActionButton from './actionButton';
const Hub = ({item, addFavouriteHub, removeFromFavourite}) => {
    
    const add = (hub) => {
       const likedHub = {...hub, favourite: true}
       addFavouriteHub(likedHub)
    }

    const remove = (hub) => {
       const unLiked = {...hub, favourite: false} 
       removeFromFavourite(unLiked)
    }

    return(
        <div className="hub">
          <p>Serial No: <span className="hub_serial_number">{item.serialNo}</span></p>
          <p>Status: <span className={item.status === 'NEW' ? 'new' : item.status === 'ACTIVE' ? 'status_active' : 'status_suspend'}>
               {item.status}
            </span>
          </p>
          <p>Latest update: <span className="hub_latest_update">{moment(item.latest_update).format('DD MMM YYYY HH:mm')}</span></p>
          <div className="hub_button_group">
            <ActionButton type='active' label="Activate" status="ACTIVE" className={item.status === 'ACTIVE' ? 'disabled active_background' : ''}/>
            <ActionButton type='suspend' label="Suspend" status="SUSPEND" className={item.status === 'SUSPENDED' ? 'disabled suspend_background' : ''}/>
          </div>
          { item.favourite ? 
            <FavoriteOutlinedIcon onClick={() => remove(item)} className={`favorite-icon ${item.favourite ? 'toggled' : ''}`}/>
            :
            <FavoriteBorderOutlinedIcon onClick={() => add(item)} className={`favorite-icon ${item.favourite ? 'toggled' : ''}`}/>
            }
        </div>
    )
}

export default Hub