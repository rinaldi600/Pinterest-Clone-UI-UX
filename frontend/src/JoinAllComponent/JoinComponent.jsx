import "./JoinComponent.css";
import Navbar from "../Navbar/Navbar";
import ContentComponent from "../ContentComponent/ContentComponent";
import {Fragment, useEffect, useState} from "react";

function JoinComponent(props) {

    return (
        <Fragment>
            <Navbar/>
            <ContentComponent/>
        </Fragment>
    );
}

export default JoinComponent;