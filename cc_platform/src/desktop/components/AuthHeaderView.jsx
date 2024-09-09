import "../styles/Header.css"
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Data } from "../../App";
import { Divider, MenuItem, Menu, Button, Avatar,
    Typography, Paper, ListItemIcon, ListItemText, MenuList } from "@mui/material";
import { Settings, Logout, AccountCircleOutlined, AccountCircle } from '@mui/icons-material';


export default function AuthHeaderView() {
    const user = useContext(Data);

    return (
        <div className="header-auth">
            { user.auth ?
                <AuthHeaderBlock user={user} />
                : <NoAuthHeaderBlock />
            }
        </div>
    )
}

function AuthHeaderBlock({ user }) {
    const [isShowedMenu, setIsShowedMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    return (
        <div className="header-auth-block">
            <HeaderProfile 
                user={user}
                handleClick={(event) => {
                    setAnchorEl(event.currentTarget); setIsShowedMenu(true)} 
                } />
            <HeaderProfileMenu
                anchorEl={anchorEl}
                open={isShowedMenu} 
                handleClose={() => setIsShowedMenu(false)} />
        </div>
    );
}

function HeaderProfile({user, handleClick}) {
    const username = user.username || "Anonymous";
    return (
        <div className="header-profile" onClick={handleClick} >
            { user.avatar ?
                <Avatar alt={user.username} src={avatar_url} /> : <AccountCircleOutlined />
            }
            <Typography variant="h6"> {username} </Typography>
        </div>
    )
}

function HeaderProfileMenu ({ anchorEl, open, handleClose }) {
    const navigate = useNavigate();
    const handle_click = (text) => {
        handleClose();
        switch (text) {
            case "Profile":
                navigate("/profile");
                break;
            case "Settings":
                navigate("/settings");
                break;
            case "Logout":
                navigate("/sign-out");
                break;
        }
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
                        <MenuItem onClick={() => handle_click("Profile")}>
                            <ListItemIcon>
                                <AccountCircle />
                            </ListItemIcon>
                            <ListItemText>Личный кабинет</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => handle_click("Settings")}>
                            <ListItemIcon>
                                <Settings />
                            </ListItemIcon>
                            <ListItemText>Настройки</ListItemText>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => handle_click("Logout")}>
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
    const navigate = useNavigate();
    return (
        <div className="header-auth-buttons">
            <Button variant="contained" color="primary" onClick={() => navigate("/sign-in")}>
              sign in
            </Button>
            <Button variant="outlined" color="primary" onClick={() => navigate("/sign-up")}>
              sign up
            </Button>
        </div>
    );
}