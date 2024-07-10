import { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { List } from "react-bootstrap-icons";
import { Divider } from "primereact/divider";
import { NavLink } from "react-router-dom";

const SidebarMenu = () => {
  const [visibleLeft, setVisibleLeft] = useState(false);

  return (
    <div>
      <Sidebar visible={visibleLeft} onHide={() => setVisibleLeft(false)}>
        <NavLink
          to="/"
          onClick={() => {
            setVisibleLeft(false);
          }}
        >
          <h4>Home</h4>
        </NavLink>
        <Divider />
        <h4>Create</h4>
        <Divider />
        <h4>Profile</h4>
      </Sidebar>

      <List
        className="navbar-menu"
        color="white"
        size={45}
        onClick={() => setVisibleLeft(true)}
      />
    </div>
  );
};

export default SidebarMenu;
