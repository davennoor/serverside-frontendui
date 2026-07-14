import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function PagesLayout(){
    return(
        <>
            <Outlet />
        </>
    )
}
export default PagesLayout;