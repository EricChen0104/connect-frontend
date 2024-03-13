import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Navigation/Navigation";
import MainLogo from "./FrontPage/Main/Main";

const Layout = ({ currentUser, setCurrentUser, moreMenu, setMoreMenu }) => {
  return (
    <>
      <Nav
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        moreMenu={moreMenu}
        setMoreMenu={setMoreMenu}
      />
      <MainLogo currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Outlet />
    </>
  );
};

export default Layout;
