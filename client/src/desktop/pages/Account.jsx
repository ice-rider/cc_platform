import { Data } from "../../App";
import { useContext } from "react";
import { Avatar, Button, TextField } from "@mui/material";
import { PhotoCameraOutlined } from "@mui/icons-material";
import "../styles/Account.css";

export default function Account() {
    const { user } = useContext(Data);
    const sub_status = user.subsription_end > new Date() ? "активна" : "неактивна";
    const sub_final_date = user.subsription_end | "отсутствует";
    const sub_have = 0;
    return (
        <div className="account-page-block">
            <div className="acc-box">
                <div className="profile-avatar">
                    <Avatar 
                        src={user.avatar}
                        alt={user.username}
                        sx={{ width: "225px", height: "225px", margin: "50px 0" }} />
                    <Button variant="contained">
                        <PhotoCameraOutlined /> &nbsp; Загрузить фото
                    </Button>
                    <Button variant="outlined" sx={{ position: "relative", width: "60%", left: "20%", mt: 3 }}>
                        Удалить
                    </Button>
                </div>
                <div className="profile-info">
                    <TextField label="имя пользователя:" value={user.username} variant="standard" fullWidth size="medium" />
                    <TextField label="почтовый адрес:" value={user.email} variant="standard" fullWidth size="medium" />
                    <TextField label="новый пароль:" value={user.email} variant="standard" fullWidth size="medium" />
                    <TextField label="подтвердите пароль:" value={user.email} variant="standard" fullWidth size="medium" />
                </div>
                <div className="profile-subinfo">
                    <TextField label="статус подписки" value={sub_status} variant="standard" fullWidth size="medium" disabled />
                    <TextField label="дата окончания:" value={sub_final_date} variant="standard" fullWidth size="medium" disabled />
                    <TextField label="осталось:" value={sub_have} variant="standard" fullWidth size="medium" disabled />
                </div>
            </div>
            <Button variant="contained" sx={{ width: "300px", left: "50%", transform: "translate(-50%, -50%)" }} className="prof-btn" size="small">Сохранить изменения</Button>
        </div>
    )
}