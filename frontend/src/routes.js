import TabelContacts from "./components/tabelContacts";
import {Route} from "react-router-dom";
import MainChat from "./components/mainChat";

const MyRoutes = [
    (<Route key="home" path="/" element={<MainChat />} />),
    (<Route key="contacts_with_param" path="contacts" element={<TabelContacts />} />),
    (<Route key="contacts" path="contacts/:whatever" element={<TabelContacts />} />),
];

export default MyRoutes;
