import React, { useState } from 'react';
import Link from "../../desktop/components/Link";
import AuthHeaderView from "../../desktop/components/AuthHeaderView";
import "../styles/MobileHeader.css";

export default function MobileHeader() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleMenuItemClick = () => {
        setMenuOpen(false);
    };

    return (
        <div className="mobile-header-container">
            <div className="mobile-header">
                <div className="mobile-header-logo">
                    <img src="/logo.svg" alt="cc_logo" />
                </div>
                <div className="mobile-header-menu-icon" onClick={toggleMenu}>
                    <img src="/menu-icon.svg" alt="menu_icon" />
                </div>
            </div>
            <div className={`curtain ${menuOpen ? 'open' : 'closed'}`}>
                <div className="curtain-close-icon" onClick={toggleMenu}>
                    <img src="/close-icon.svg" alt="close_icon" />
                </div>
                <nav className="curtain-nav">
                    <Link url="/" text="Главная" onClick={handleMenuItemClick} />
                    <Link url="/subscription" text="Подписка" onClick={handleMenuItemClick} />
                    <Link url="/support" text="Поддержка" onClick={handleMenuItemClick} />
                    <Link url="/about" text="О нас" onClick={handleMenuItemClick} />
                    <AuthHeaderView onClick={handleMenuItemClick} />
                </nav>
            </div>
        </div>
    );
}