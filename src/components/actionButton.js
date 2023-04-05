const ActionButton = ({status, label, onClick, type, className}) => {
    return (
        <button 
          disabled={status === 'ACTIVE'} 
          className={`action_button ${type === 'active' ? 'activate' : 'suspend'} ${className}`}
        >
            {label}
        </button>
    )
}

export default ActionButton