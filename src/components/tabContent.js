const TabContent = ({id, activeTab, children}) => {
    return (
      activeTab === id ? <div data-testid='tab' className="TabContent">
        { children }
      </div>
      : null
    );
   };
    
export default TabContent;