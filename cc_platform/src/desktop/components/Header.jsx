import { useNavigate } from "react-router-dom"

import AuthHeaderView from "./AuthHeaderView"
import "../styles/Header.css"


export default function Header() {
    return (
        <div className="header">
            <div className="header-logo">
                <img src="/logo.svg" alt="cc_logo" />
            </div>
            <div className="header-right-part-wrapper">
                <div className="header-links">
                    <HeaderLink url="/" text="Главная" />
                    <HeaderLink url="/subscription" text="Подписка" />
                    <HeaderLink url="/support" text="Поддержка" />
                    <HeaderLink url="/about" text="О нас" />
                </div>
                <AuthHeaderView />
            </div>
        </div>
    )
}

function HeaderLink({url, text}) {
    const navigate = useNavigate();
    return (
        <div className="header-link" onClick={() => navigate(url)}>
            {text}
        </div>
    )
}