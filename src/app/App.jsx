import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import withRouter from "../hooks/withRouter";
import AppRoutes from "./routes";
import Headermain from "../header";
import AnimatedCursor from "../hooks/AnimatedCursor";
import "./App.css";

const BASE_NAME = import.meta.env.BASE_URL;

function _ScrollToTop(props) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return props.children;
}

export default function App() {
  useEffect(() => {
    // Handle hash route redirection (e.g. #/products -> /products)
    if (window.location.hash && window.location.hash.startsWith("#/")) {
      const hashPath = window.location.hash.slice(2);
      if (hashPath) {
        const cleanBase = (BASE_NAME || "/").replace(/\/$/, "");
        window.history.replaceState(null, null, `${cleanBase}/${hashPath}`);
      }
    }
  }, []);

  return (
    <Router basename={BASE_NAME}>
      <div className="cursor__dot">
        <AnimatedCursor
          innerSize={15}
          outerSize={15}
          color="255, 255 ,255"
          outerAlpha={0.4}
          innerScale={0.7}
          outerScale={5}
        />
      </div>
      <ScrollToTop>
        <Headermain />
        <AppRoutes />
      </ScrollToTop>
    </Router>
  );
}
