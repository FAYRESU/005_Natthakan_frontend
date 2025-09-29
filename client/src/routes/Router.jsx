import { createBrowserRouter } from "react-router";
import Add from "../pages/Add";
import Update from "../pages/Update";
import Home from "../pages/Home";
import Notallowed from "../pages/Notallowed";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add",
    element: <Add />,
  },
  {
    path: "/update/:id",
    element: <Update />,
  },

  {
    path: "/notallowed",
    element: <Notallowed />,
  },
]);
export default router;
