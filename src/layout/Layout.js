import { Outlet } from "react-router-dom";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer"

export default function Layout() {
    return (
        <>
            <Header />
            <Menu />
            <Outlet />
            <Footer />
        </>
    );
}
