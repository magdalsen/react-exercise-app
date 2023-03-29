import { Link } from "react-router-dom";
import { useThemeContext } from "..//contexts/context";
import { Button } from "../contexts/DarkModeButton";
import style from "./Header.module.css";

export const Header = () => {
    return (
        <header>
            <nav>
                <ul className={style.header}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/clients">Clients</Link>
                    </li>
                    <li>
                        <Link to="/clients/add">Clients Add</Link>
                    </li>
                    <li>
                        <Link to="/orders">Orders</Link>
                    </li>
                    <li>
                        <Link to="/orders/add">Order Add</Link>
                    </li>
                    <li>
                        <Link to="/invoices">Invoices</Link>
                    </li>
                    <Button />
                </ul>
            </nav>
            <hr />
        </header>
    )
}
