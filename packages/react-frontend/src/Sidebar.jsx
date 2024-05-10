import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="home-button">Home</button>
      </div>
      <div className="dividers-folders">
        <div className="divider">Physics</div>
        <button className="folder-button">Homework</button>
      </div>
      <div className="add-button-container">
        <button className="add-button">+</button>
      </div>
    </div>
  );
};

export default Sidebar;