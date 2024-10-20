import { Data } from "../../App";
import { useContext, useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { PhotoCameraOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";
import "../styles/Account.css";
import axios from "axios";

export default function Account() {
    const { user, setter } = useContext(Data);
    console.table(user);
    const [newUsername, setNewUsername] = useState(user.username);
    const [newEmail, setNewEmail] = useState(user.email);
    const [newPassword, setNewPassword] = useState(null);
    const [newPasswordConfirm, setNewPasswordConfirm] = useState(null);
    const [avatar, setAvatar] = useState(user.avatar);
    const [isModified, setIsModified] = useState(false);
    const modified = () => {
        setIsModified(
            (newUsername !== user.username) || (newEmail !== user.email) || (newPassword) || (avatar !== user.avatar)
        );
    }
    useEffect(modified, [newUsername, newEmail, newPassword, avatar, user]);

    const handleAvatarChange = (event) => {
        toast.info("Выберите файл изображения");
        let input = document.createElement("input");
        input.type = "file";
        input.onchange = (e) => {
            if (input.files && input.files[0]) {
                let file = input.files[0];
                if (file.type.startsWith("image")) {
                    let reader = new FileReader();
                    reader.onload = (e) => {
                        setAvatar(e.target.result);
                        toast.success("Файл загружен");
                    }
                    reader.readAsDataURL(file);
                }
                else {
                    toast.error("Файл должен быть изображением");
                }
            }
            else {
                toast.error("Вы не выбрали файл");
            }
        }
        input.click();
    }
    const removePhoto = () => {
        setAvatar(user.avatar);
    }

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    const saveChanges = () => {
        if (newPassword !== newPasswordConfirm) {
            toast.error("Пароли не совпадают");
            return;
        }
        if (!validateEmail(newEmail)) {
            toast.error("некорректная почта")
        }
        let body = {}
        if (avatar !== user.avatar) {
            body.avatar = avatar;
        }
        if (newUsername !== user.username) {
            body.username = newUsername;
        }
        if (newEmail !== user.email) {
            body.email = newEmail;
        }
        if (newPassword) {
            body.password = newPassword;
        }
        axios.patch(`/user/${user.user_id}`, body
            ).then((response) => {
                if (response.status === 200) {
                    toast.success("Изменения сохранены");
                    setter({
                        ...user,
                        username: newUsername || user.username,
                        email: newEmail || user.email,
                        password: newPassword || user.password,
                        avatar: avatar || user.avatar
                    });
                }
                else {
                    toast.error(response.data.message);
                }
            }).catch((error) => {
                toast.error(error.message);
            });
    }

    const sub_status = user.subsription_end > new Date() ? "активна" : "неактивна";
    const sub_final_date = user.subsription_end | "отсутствует";
    const sub_have = 0;
    return (
        <div className="account-page-block">
            <div className="acc-box">
                <div className="profile-avatar">
                    <Avatar 
                        src={avatar}
                        alt={user.username}
                        sx={{ width: "225px", height: "225px", margin: "50px 0" }} />
                    <Button variant="contained" onClick={handleAvatarChange}>
                        <PhotoCameraOutlined /> &nbsp; Загрузить фото
                    </Button>
                    <Button variant="outlined" sx={{ position: "relative", width: "60%", left: "20%", mt: 3 }} onClick={removePhoto}>
                        Удалить
                    </Button>
                </div>
                <div className="profile-info">
                    <TextField label="имя пользователя:" value={newUsername} variant="standard" fullWidth size="medium" onChange={(e) => setNewUsername(e.target.value)} />
                    <TextField label="почтовый адрес:" value={newEmail} variant="standard" fullWidth size="medium" onChange={(e) => setNewEmail(e.target.value)} />
                    <TextField label="новый пароль:" value={newPassword} variant="standard" fullWidth size="medium" onChange={(e) => setNewPassword(e.target.value)} />
                    <TextField label="подтвердите пароль:" value={newPasswordConfirm} variant="standard" fullWidth size="medium" onChange={(e) => setNewPasswordConfirm(e.target.value)} />
                </div>
                <div className="profile-subinfo">
                    <TextField label="статус подписки" value={sub_status} variant="standard" fullWidth size="medium" disabled />
                    <TextField label="дата окончания:" value={sub_final_date} variant="standard" fullWidth size="medium" disabled />
                    <TextField label="осталось:" value={sub_have} variant="standard" fullWidth size="medium" disabled />
                </div>
            </div>
            <Button 
                variant="contained"
                sx={{ width: "300px", left: "50%", transform: "translate(-50%, -50%)" }}
                className="prof-btn"
                size="small"
                disabled={!isModified}
                onClick={saveChanges}
            >
                Сохранить изменения
            </Button>
        </div>
    )
}