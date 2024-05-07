import React from "react";
import { useState, useContext } from "react";
import "./SideBar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
import { Link } from "react-router-dom";
const SideBar = () => {
  const [extended, setExtended] = useState(false);
  const { newChat, chatList, loadChat } = useContext(Context);

  return (
    <div className="m-sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="menu_icon"
        />{" "}
        <div className="new-chat" onClick={newChat}>
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {chatList.map((chat, i) => {
              return (
                <div
                  onClick={() => loadChat(chat.id)}
                  key={i}
                  className="recent-entry"
                >
                  <img src={assets.message_icon} alt="" />
                  {extended}
                  <p>{chat.firstPrompt.slice(0, 18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <Link to="/">
            <img className="sideIcon" src={assets.question_icon} alt="" />
          </Link>
          {extended ? <p>Home</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          {" "}
          <Link to="/Exercises">
            <img className="sideIcon" src={assets.history_icon} alt="" />
          </Link>
          {extended ? <p>Exercises</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <Link to="/blog">
            <img className="sideIcon" src={assets.setting_icon} alt="" />
          </Link>
          {extended ? <p>Blogs</p> : null}
        </div>
      </div>
    </div>
  );
};
export default SideBar;
