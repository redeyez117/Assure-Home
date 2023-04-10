const TabNavItem = ({ id, title, activeTab, setActiveTab }) => {
 
    const handleClick = () => {
      setActiveTab(id);
    };
    
   return (
      <li data-testid='tab-list' onClick={handleClick} className={activeTab === id ? "active" : ""}>
        { title }
      </li>
    );
   };
   export default TabNavItem;