import React from "react";
import classes from './Buttons.module.scss';
// Imports
import Image from "next/image";


function SubmitButton() {
    return (
        <button className={classes.Submit_BTN}>
            <Image src={"/Icons/SubmitLogin_Icon.svg"} width={16} height={16} alt={"Send Icon"} />
            <span>Login</span>
        </button>
    );
}

export default SubmitButton;
