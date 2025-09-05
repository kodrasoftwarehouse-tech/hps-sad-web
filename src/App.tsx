
import { RouterProvider } from "react-router-dom"; 
import { Router } from "./router";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
  <RouterProvider router={Router} />
  <ToastContainer/>
    </>
  )
  
};

export default App;
