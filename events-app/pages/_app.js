import "../styles/globals.css";
import Layout from "../components/layout/layout";
import "../components/CkEditor.css";
import "antd/dist/antd.css";

import "@ckeditor/ckeditor5-basic-styles/theme/code.css";
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
