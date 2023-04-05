const ActionButton = ({status, label, disabled, onClick, type, className}) => {
    return (
        <button 
          onClick={onClick}
          disabled={disabled} 
          className={`action_button ${type === 'active' ? 'activate' : 'suspend'} ${className}`}
        >
            {label}
        </button>
    )
}

export default ActionButton