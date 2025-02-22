import React from "react";
import "./App.css";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import Body from "./layouts/Body/Body";

const App = () => {

  return (
    <>
    
    <div className="app">
      <LeftPanel/>
      <Body/>
    </div>
    </>
  );
};

export default App;
