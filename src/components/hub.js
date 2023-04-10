import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import moment from 'moment';
import ActionButton from './actionButton';
const Hub = ({item, addFavouriteHub, removeFromFavourite, changedHubStatus}) => {
    
    const add = (hub) => {
       const likedHub = {...hub, favourite: true}
       addFavouriteHub(likedHub)
    }

    const remove = (hub) => {
       const unLiked = {...hub, favourite: false} 
       removeFromFavourite(unLiked)
    }

    const changeStatus = (value) => {
       const modifiedHub = {...item, status:value, latest_updated: new Date()}
       changedHubStatus(modifiedHub)
    }

    return(
        <div data-testid="single-hub" className="hub">
          <p>Serial No: <span className="hub_serial_number">{item.serialNo}</span></p>
          <p>Status: <span className={item.status === 'NEW' ? 'new' : item.status === 'ACTIVE' ? 'status_active' : 'status_suspend'}>
               {item.status}
            </span>
          </p>
          <p>Latest update: <span className="hub_latest_update">{moment(item.latest_updated).format('DD MMM YYYY HH:mm:ss')}</span></p>
          <div className="hub_button_group">
            <ActionButton onClick={()=> changeStatus('ACTIVE')} type='active' label="Activate" disabled={item.status === 'ACTIVE'} status="ACTIVE" className={item.status === 'ACTIVE' ? 'disabled active_background' : ''}/>
            <ActionButton onClick={()=> changeStatus('SUSPENDED')} type='suspend' label="Suspend" disabled={item.status === 'SUSPENDED'} status="SUSPENDED" className={item.status === 'SUSPENDED' ? 'disabled suspend_background' : ''}/>
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