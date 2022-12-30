import classes from "../components/Pages/Home.module.scss";
// Imports
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
// Helpers
import check_token from "../helpers/check_token";

export default function Home() {
    // initialize Router
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Home</title>
                <meta
                    name='description'
                    content='Inventory Home Page where you can create or scan a product'
                />
            </Head>
            <div className={classes.Home}>
                <div className={classes.Content}>
                    <div className={classes.Top}>
                        <div className={classes.LogoContainer}>
                            <div className={classes.Logo}>
                                <Image
                                    src={"/Images/Logo.png"}
                                    width={237}
                                    height={60}
                                    alt={"Company logo"}
                                />
                            </div>
                        </div>
                        <button className={classes.LogOut}>
                            <Image
                                src={"/Icons/Logout.svg"}
                                width={18}
                                height={18}
                                alt={"Logout Icon"}
                            />
                            Logout
                        </button>
                    </div>
                    <div className={classes.Bottom}>
                        <button
                            className={classes.MainBTN}
                            onClick={() => router.push("/scan")}
                        >
                            <Image
                                src={"/Icons/ScannerBTN.svg"}
                                width={40}
                                height={40}
                                alt={"Scanner Icon"}
                            />
                            <span className={classes.BTNContent}>Scan</span>
                        </button>
                        <button className={classes.SecondaryBTN}>
                            <Image
                                src={"/Icons/Create.svg"}
                                width={40}
                                height={40}
                                alt={"Scanner Icon"}
                            />
                            <span className={classes.BTNContent}>Create</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async (ctx) => {
    // Cookies
    const { authenticated, authentication_token } = ctx.req.cookies;
    // check if the token is valid
    const real_token = check_token(authentication_token);
    // check if the user is valid
    if (!authenticated || !real_token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};
