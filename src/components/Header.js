import React from 'react';
import PropTypes from "prop-types";
import Button from './Button';
import {useLocation} from 'react-router-dom'

const Header = ({title, onAdd, showAdd}) => {
    const location = useLocation()

    return (
        <header className={"header"}>
            <h1>{title}</h1>
            {/* showAdd can be applied to color, too.*/}
            {location.pathname === '/' &&
            (<Button color={"blue"} text={showAdd? "Close" : "Add"} onClick={onAdd}/>)}

        </header>
    )
}

Header.defaultProps ={
    title: "My ToDo Reminder",
}

Header.prototype = {
    title: PropTypes.string.isRequired,
}

// CSS in Js
// const headingStyle = {
//     color: "red",
//     backgroundColor: "green"
// }

export default Header