import React from "react";
import classes from "../components/Pages/login.module.scss";
// Imports
import Image from "next/image";
import Head from "next/head";
import SubmitButton from "../components/Layout/SubmitButton";

function login() {
    return (
        <>
            <Head>
                <title>Login</title>
                <meta
                    name='description'
                    content='Login Page for Scanner Project'
                />
            </Head>
            <div className={classes.Login}>
                <div className={classes.Login_Grid}>
                    <section className={classes.Left}>
                        <div className={classes.LogoContainer}>
                            <div className={classes.Logo}>
                                <Image
                                    src={"/Images/Logo.png"}
                                    layout='fill'
                                    objectFit='contain'
                                    alt='Background'
                                />
                            </div>
                        </div>
                        <div className={classes.Developer}>
                            <p>
                                Developed By <span>GooAdmin</span>
                            </p>
                        </div>
                    </section>
                    <section className={classes.Right}>
                        <div className={classes.LogoContainer}>
                            <div className={classes.Logo}>
                                <Image
                                    src={"/Images/Logo.png"}
                                    layout='fill'
                                    objectFit='contain'
                                    alt='Background'
                                />
                            </div>
                        </div>
                        <div className={classes.Form_Container}>
                            <form>
                                <h1 className={classes.Header}>
                                    <Image
                                        src={"/Icons/Login_Scanner.svg"}
                                        width={40}
                                        height={40}
                                        alt={"scanner Icon"}
                                    />
                                    <span>Login</span>
                                </h1>
                                <div className={classes.Input_Container}>
                                    <div className={classes.TextContainer}>
                                        <Image
                                            src={"/Icons/Username.svg"}
                                            width={14}
                                            height={19}
                                            alt={"username Icon"}
                                        />
                                        <span>Username</span>
                                    </div>
                                    <input
                                        type={"text"}
                                        placeholder={"Enter Username"}
                                        className={classes.Input}
                                    />
                                </div>
                                <div className={classes.Input_Container}>
                                    <div className={classes.TextContainer}>
                                        <Image
                                            src={"/Icons/Password.svg"}
                                            width={18}
                                            height={20}
                                            alt={"scanner Icon"}
                                        />
                                        <span>Password</span>
                                    </div>
                                    <input
                                        type={"password"}
                                        placeholder={"Enter Password"}
                                        className={classes.Input}
                                        autoComplete={"true"}
                                    />
                                </div>
                                <div className={classes.BTN_Container}>
                                    <SubmitButton
                                        buttonText={"Login"}
                                        buttonFunction={() => {}}
                                    />
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default login;
