import React, { useContext } from "react";
import "./Bar.css";
import { IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
const TopBar = () => {
  return (
    <div className="top-bar">
      {/* Search */}
      <div className="dash-search">
        <InputBase placeholder="search" />
        <IconButton type="button">
          <SearchIcon />
        </IconButton>
      </div>
      {/* Icons */}
      <div>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default TopBar;
