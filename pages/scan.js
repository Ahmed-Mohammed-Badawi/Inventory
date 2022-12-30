import Head from "next/head";
import React from "react";
import App from "../components/Scanner/App";
import check_token from "../helpers/check_token";

function scan() {
    return (
        <>
            <Head>
                <title>Scan</title>
                <meta
                    name='description'
                    content='Scan your barcode or upload an image'
                />
            </Head>
            <App />
        </>
    );
}

export default scan;

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