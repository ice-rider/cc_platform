import { useNavigate } from "react-router-dom";

import "../styles/Header.css";


export default function Link({url, text}) {
    const navigate = useNavigate();
    return (
        <div className="header-link" onClick={() => navigate(url)}>
            {text}
        </div>
    )
}