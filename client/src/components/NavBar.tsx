import SearchIcon from "../assets/SearchIcon";
import CreateIcon from "../assets/CreateIcon";
import FireIcon from "../assets/FireIcon";
import { Avatar } from "primereact/avatar";
import profileImage from "../assets/images/ProfilePic.png";

import SideBarDemo from "./SidebarMenu";

interface NavbarProps {
  onOpenModal: () => void;
}

function NavBar({ onOpenModal }: NavbarProps) {
  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <SideBarDemo />
          <div className="search-bar">
            <form className="search-form">
              <div className="search-icon">
                <SearchIcon />
              </div>
              <input
                className="search-box"
                type="search"
                placeholder="Search for existing courses"
                aria-label="Search"
              />
            </form>
          </div>

          <button className="navbar-create" onClick={onOpenModal}>
            <div className="create-icon">
              <CreateIcon />
            </div>
            <div className="create-text">Create</div>
          </button>
        </div>
        <div className="navbar-right">
          <div className="navbar-streak">
            <div className="streak-icon">
              <FireIcon />
            </div>
            <div className="streak-number">5</div>
          </div>
          <div>
            <Avatar image={profileImage} size="xlarge" shape="circle" />
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
