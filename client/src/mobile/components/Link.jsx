import { useNavigate } from "react-router-dom";
import "../styles/MobileHeader.css";

export default function Link({ url, text, onClick }) {
    const navigate = useNavigate();
    
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        navigate(url); 
    };

    return (
        <div className="header-link" onClick={handleClick}>
            {text}
        </div>
    );
}
