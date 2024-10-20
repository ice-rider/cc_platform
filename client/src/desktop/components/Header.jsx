import Link from "./Link";
import AuthHeaderView from "./AuthHeaderView";

import "../styles/Header.css";
import { useNavigate } from "react-router-dom";


export default function Header() {
    const navigate = useNavigate();
    const clickLogo = () => navigate("/");
    return (
        <div className="header">
            <div className="header-logo">
                <img src="/logo.svg" alt="logoтип" onClick={clickLogo} />
            </div>
            <div className="header-right-part-wrapper">
                <div className="header-links">
                    <Link url="/" text="Главная" />
                    <Link url="/subscription" text="Подписка" />
                    <Link url="/support" text="Контакты" />
                    <Link url="/about" text="О нас" />
                </div>
                <AuthHeaderView />
            </div>
        </div>
    )
}
