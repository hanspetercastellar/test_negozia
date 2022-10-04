import React from "react";
import MainDash from "../../components/MainDash/MainDash";
import Sidebar from "../../components/Sidebar";

export const Home = () => {

    return <>
    <div className="AppGlass">
      <Sidebar/>
      <MainDash/>
    </div>
    </>
}