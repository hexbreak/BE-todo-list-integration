//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
import { FiDelete } from "react-icons/io";

//include bootstrap npm library into the bundle
import "bootstrap";

//include your index.scss file into the bundle
import "../styles/index.scss";

//import your own components
import { Home } from "./component/home.js";

//render your react application
ReactDOM.render(<Home />, document.querySelector("#app"));
