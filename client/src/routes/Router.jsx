import { createBrowserRouter } from "react-router";
import AddBooks from "../pages/AddBooks";
import AddJournal from "../pages/AddJournal";
import AddComic from "../pages/AddComic ";
import EditItem from "../pages/EditItem";
import Home from "../pages/Home";
import Notallowed from "../pages/Notallowed";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add-book",
    element: <AddBooks />,
  },
  {
    path: "/add-journal",
    element: <AddJournal />,
  },
   {
    path: "/add-comic",
    element: <AddComic />,
  },
  {
    path: "/update/:type/:id",
    element: <EditItem />,
  },

  {
    path: "/notallowed",
    element: <Notallowed />,
  },
]);
export default router;
