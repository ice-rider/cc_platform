import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Divider, MenuItem, Menu, Avatar, ListItemIcon, ListItemText, MenuList, Paper } from "@mui/material";
import { Settings, Logout, AccountCircle } from '@mui/icons-material';

import { Data } from "../../App";
import Link from "./Link";
    
import "../styles/Header.css";


export default function AuthHeaderView() {
    const { user } = useContext(Data);
    console.table(user);
    return (
        <div className="header-auth">
            { user.auth ? <AuthHeaderBlock user={user} /> : <NoAuthHeaderBlock /> }
        </div>
    )
}

function AuthHeaderBlock({ user }) {
    const [isShowedMenu, setIsShowedMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const username = user.username || "Anonymous";
    const avatar_url = user.avatar || null;

    const handle_profile_click = (event) => {
        setAnchorEl(event.currentTarget); 
        setIsShowedMenu(true);
    }

    return (
        <>
            <div className="header-profile" onClick={handle_profile_click} >
                <Avatar alt={username} src={avatar_url} />
            </div>
            <HeaderProfileMenu anchorEl={anchorEl} open={isShowedMenu} handleClose={() => setIsShowedMenu(false)} />
        </>
    );
}

function HeaderProfileMenu ({ anchorEl, open, handleClose }) {
    const navigate = useNavigate();
    const url_mapping = {"Profile": "/account", "Settings": "/settings", "Logout": "/sign-out"}

    const menu_elem_clicked = (value) => {
        handleClose();
        navigate(url_mapping[value])
    }

    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{ padding: 0 }}
        >
            <Paper sx={{ width: 200, maxWidth: '100%' }} elevation={0} square>
                <MenuList>
                    <MenuItem onClick={() => menu_elem_clicked("Profile")}>
                        <ListItemIcon>
                            <AccountCircle />
                        </ListItemIcon>
                        <ListItemText>Личный кабинет</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => menu_elem_clicked("Settings")}>
                        <ListItemIcon>
                            <Settings />
                        </ListItemIcon>
                        <ListItemText>Настройки</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => menu_elem_clicked("Logout")}>
                        <ListItemIcon>
                            <Logout color="error" />
                        </ListItemIcon>
                        <ListItemText sx={{ color: "#d32f2f" }}>Выйти</ListItemText>
                    </MenuItem>
                </MenuList>
            </Paper>
        </Menu>
        
    )
}


function NoAuthHeaderBlock() {
    return (
        <div className="header-auth-buttons">
            <Link text="Войти" url="/sign-in" />
        </div>
    );
}