import { useParams } from "react-router";
import EditBook from "./EditBook";
import EditComic from "./EditComic";
import EditJournal from "./EditJournal";
import Notallowed from "./Notallowed";

const EditItem = () => {
  const { type, id } = useParams();

  switch (type) {
    case "books":
      return <EditBook id={id} />;
    case "comics":
      return <EditComic id={id} />;
    case "journals":
      return <EditJournal id={id} />;
    default:
      return <Notallowed />;
  }
};

export default EditItem;
