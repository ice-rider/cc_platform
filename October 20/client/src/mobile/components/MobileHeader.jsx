import React, { useState, useEffect, useRef } from 'react';
import Link from "./Link";
import AuthHeaderView from "./AuthHeaderView";
import "../styles/MobileHeader.css";

export default function MobileHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleMenuItemClick = () => {
        setMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <div className="mobile-header-container">
            <div className="mobile-header">
                <div className="mobile-header-logo">
                    <a href='/'><img src="/logo.svg" alt="cc_logo"></img></a>
                </div>
                <div className="mobile-header-menu-icon" onClick={toggleMenu}>
                    <img src="/menu-icon.svg" alt="menu_icon" />
                </div>
            </div>
            <div ref={menuRef} className={`curtain ${menuOpen ? 'open' : 'closed'}`}>
                <div className="curtain-close-icon" onClick={toggleMenu}>
                    <img src="/close-icon.svg" alt="close_icon" />
                </div>
                <nav className="curtain-nav">
                    <Link url="/" text="Главная" onClick={handleMenuItemClick} />
                    <Link url="/subscription" text="Подписка" onClick={handleMenuItemClick} />
                    <Link url="/support" text="Поддержка" onClick={handleMenuItemClick} />
                    <Link url="/about" text="О нас" onClick={handleMenuItemClick} />
                    <AuthHeaderView onClick={handleMenuItemClick} /> {}
                </nav>
            </div>
        </div>
    );
}
