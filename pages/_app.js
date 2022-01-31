import { StoreProvider } from "../utils/Store";
import "../styles/globals.css";
import ManageNotification from "../components/ManageNotification";

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <ManageNotification>
        <Component {...pageProps} />
      </ManageNotification>
    </StoreProvider>
  );
}

export default MyApp;
