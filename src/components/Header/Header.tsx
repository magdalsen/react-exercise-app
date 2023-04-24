import { Link } from "react-router-dom";

import { Button } from "../../contexts/DarkModeButton";

import style from "./Header.module.css";

export const Header = () => {
    const links = {
        "properties":[
          {
            "id": 1,
            "name":"Home",
            "adress":"/"
          },
          {
            "id": 2,
            "name":"Clients",
            "adress":"/clients"
          },
          {
            "id": 3,
            "name":"Clients Add",
            "adress":"/clients/add"
          },
          {
            "id": 4,
            "name":"Orders",
            "adress":"/orders"
          },
          {
            "id": 5,
            "name":"Order Add",
            "adress":"/orders/add"
          },
          {
            "id": 6,
            "name":"Invoices",
            "adress":"/invoices"
          }
        ]
    };
    return (
        <header>
            <nav>
                <ul className={style.header}>
                    {links.properties.map((el)=>(
                        <li key={el.id}><Link to={el.adress}>{el.name}</Link></li>
                    ))}
                    <Button />
                </ul>
            </nav>
            <hr />
        </header>
    )

}
