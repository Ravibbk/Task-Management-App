import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="dark"
        toastStyle={{
          background: "#1a1a2e",
          border: "1px solid rgba(255,255,255,0.1)",
          fontFamily: "'Satoshi', sans-serif",
        }}
      />
    </>
  );
}

export default App;