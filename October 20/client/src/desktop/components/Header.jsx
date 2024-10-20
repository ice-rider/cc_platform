import Link from "./Link";
import AuthHeaderView from "./AuthHeaderView";

import "../styles/Header.css";


export default function Header() {
    return (
        <div className="header">
            <div className="header-logo">
                <img src="/logo.svg" alt="cc_logo" />
            </div>
            <div className="header-right-part-wrapper">
                <div className="header-links">
                    <Link url="/" text="Главная" />
                    <Link url="/subscription" text="Подписка" />
                    <Link url="/support" text="Поддержка" />
                    <Link url="/about" text="О нас" />
                </div>
                <AuthHeaderView />
            </div>
        </div>
    )
}
