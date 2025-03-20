import { Link } from "react-router-dom";
import "../css/componentcss/Sidebar.css";
import { useRole } from '../contexts/RoleContext';  // Import the custom hook

const Sidebar = () => {
  const { role } = useRole();  // Get the current role from context

  return (
    <aside className="sidebar">
      <ul>
        <li><Link to={`/dashboards/${role}/${role}-dashboard`}>Dashboard</Link></li>
        <li><Link to={`/dashboards/${role}/issues`}>Issues</Link></li>
        <li><Link to={`/dashboards/${role}/notifications`}>Notifications</Link></li>
        <li><Link to={`/dashboards/${role}/profile`}>Profile</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;

