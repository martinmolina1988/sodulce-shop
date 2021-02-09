import Cart from "../components/Cart/Cart";
import Contacto from "../components/Contacto";
import SobreMi from "../components/sobremi/SobreMi";
import ToTop from "../components/toTop";
import Home from "../page/Home";



export default [



    {
        path: "/contacto",
        exact: true,
        page: Contacto
    },
    {
        path: "/cart",
        exact: true,
        page: Cart,
    },
    {
        path: "/sobremi",
        exact: true,
        page: SobreMi,
    },
    {
        path: "/sodulce/totop",
        exact: true,
        page: ToTop,
    },
    {
        path: "/totop",
        exact: true,
        page: ToTop,
    },
    {
        path: "/",
        exact: true,
        page: Home,
    },
    {
        path: "*",
        page: Home
    },
];

