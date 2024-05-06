import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.js";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@material-tailwind/react";
import { SocketContextProvider } from "./components/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <SocketContextProvider>
            <App />
            <Toaster
              position="top-center"
              reverseOrder={false}
              containerStyle={{
                zIndex: "999999",
              }}
            />
          </SocketContextProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
