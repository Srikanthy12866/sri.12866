import React, { useEffect, useState } from "react";
import { WiMoonAltNew, WiMoonAltWaningCrescent4, WiMoonFull, WiMoonNew } from "react-icons/wi";


const Themetoggle = () => {
  const [theme, settheme] = useState(localStorage.getItem("theme"));
  const themetoggle = () => {
    settheme(theme === "dark" ? "light" : "dark");
  };
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme ); 
  }, [theme]);
  return (
    <div className="nav_ac" onClick={themetoggle}>
      theme {theme=== "dark" ? <WiMoonFull /> : <WiMoonAltNew />}
    </div>
  );
};

export default Themetoggle;
