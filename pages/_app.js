import "../styles/globals.scss";
import Layout from "../components/Layout/Layout";
// Redux
import { wrapper } from "../Redux/store";

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default wrapper.withRedux(MyApp);
