import React, { useRef } from "react";
import classes from "../components/Pages/login.module.scss";
// Imports
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import SubmitButton from "../components/Layout/SubmitButton";
// Axios
import axios from "axios";
// Notifications
import { toast } from "react-toastify";

function Login() {
    // Router
    const router = useRouter();
    // REfs
    const userNameRef = useRef();
    const passwordRef = useRef();

    // Authentication
    const authenticationHandeler = async (e) => {
        // Stop reloading
        e.preventDefault();
        // Get the Data from inputs
        const userName = userNameRef.current.value;
        const password = passwordRef.current.value;

        // Validations
        if (userName.trim().length < 1 || password.trim().length < 1) {
            toast.error("Please fill all inputs 😢");
            return;
        }

        // Axios Request
        const result = await axios
            .post(`https://inventory.gooadmin.art/api/v1/user/login`, {
                userName: userName,
                password: password,
            })
            .then((res) => {
                // return a message for the user and handle login
                if (
                    res.data.success &&
                    res.data.message &&
                    res.status === 201
                ) {
                    toast.success(`${res.data.message} ✨`);

                    // save the session in cookies
                    document.cookie = `authenticated=true;`;
                    // redirect to the home page
                    router.replace("/");
                }

                return res.data;
            })
            .catch((err) => {
                // Return error message for the user
                if (
                    err.response.data.message.includes(
                        "Cannot read properties of undefined"
                    ) &&
                    err.response.data.success === false
                ) {
                    toast.error("Incorrect username or password 😢");
                } else {
                    toast.error(`${err.response.data.message} 😢`);
                }
            });
    };

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
                            <form onSubmit={(e) => authenticationHandeler(e)}>
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
                                        ref={userNameRef}
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
                                        ref={passwordRef}
                                        type={"password"}
                                        placeholder={"Enter Password"}
                                        className={classes.Input}
                                        autoComplete={"true"}
                                    />
                                </div>
                                <div className={classes.BTN_Container}>
                                    <SubmitButton
                                        buttonText={"Login"}
                                        buttonFunction={authenticationHandeler}
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

export default Login;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async (ctx) => {
    // Cookies
    const { authenticated } = ctx.req.cookies;
    // check if the user is valid
    if (authenticated && authenticated !== "false") {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};
