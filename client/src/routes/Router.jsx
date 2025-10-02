import { createBrowserRouter } from "react-router";
import AddBooks from "../pages/AddBooks";
import EditItem from "../pages/EditItem";
import Home from "../pages/Home";
import Notallowed from "../pages/Notallowed";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add",
    element: <AddBooks />,
  },
  {
    path: "/update/:id",
    element: <EditItem />,
  },

  {
    path: "/notallowed",
    element: <Notallowed />,
  },
]);
export default router;
