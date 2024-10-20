import "../styles/SignIn.css";
import { useState, useContext } from 'react';
import { Box, Button, TextField, Container, Typography, Paper, Divider } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Data } from "../../App";


export default function SignIn() {
    const navigate = useNavigate();
    const { setter } = useContext(Data);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginError, setLoginError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleUsernameChange = (event) => {
        let email = event.target.value;
        setLoginError('');
        setEmail(email);

        if (!email) {
            setLoginError('Имя пользователя не заполнено');
        } else if(email.length < 3) {
            setLoginError('Имя пользователя должно содержать более 3 букв');
        } else {
            setEmail(email);
        }
    }

    const handlePasswordChange = (event) => {
        let password = event.target.value;
        setPasswordError('');
        setPassword(password);

        if (!password) {
            setPasswordError('Пароль не заполнен');
        } else if (password.length < 8) {
            setPasswordError('Длина пароля должна превышать 7 символов');
        } else {
            setPasswordError(null);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (loginError || passwordError) {
            toast.error('Проверьте правильность заполнения форма перед отправкой');
            return;
        }
        axios.post('/auth/login', { username: email, password })
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    toast.success('Успешная авторизация. Переадресация...');
                    setter({
                        auth:             true,
                        access_token:     response.data.access_token,
                        user_id:          response.data.user.id,
                        username:         response.data.user.username,
                        email:            response.data.user.email,
                        avatar:           response.data.user.avatar,
                        role:             response.data.user.role,
                        subscription_end: response.data.user.subscription_end
                    })
                    navigate('/account');
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch(error => {
                console.error(error)
                toast.error(error.message);
            });
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, height: `calc(100vh - 150px)`, justifyContent: 'center' }}>
            <Paper sx={{ 
                    backdropFilter: 'blur(15px)', 
                    border: "1px solid rgba(0, 0, 0, 0.1)", 
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: "none",
                    boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.05), -2px -2px 2px 2px rgba(0, 0, 0, 0.05), -2px  2px 2px 2px rgba(0, 0, 0, 0.05), 2px -2px 2px 2px rgba(0, 0, 0, 0.05)' }}>
                <Typography variant="h4" mt={2}>
                    Авторизация
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ padding: '10px 25px', borderRadius: '10px' }}>
                    <TextField
                        error={!!loginError}
                        helperText={loginError}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Имя пользователя"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={handleUsernameChange}
                    />
                    <TextField
                        error={!!passwordError}
                        helperText={passwordError}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Войти
                    </Button>
                    <Divider sx={{ mt: 0, mb: 1 }} />
                    <div class="bt" sx={{ mb: 2 }}>
                        <span>Еще не зарегестрировались? <span className="a" onClick={() => navigate('/sign-up')}>Регистрация</span></span>
                    </div>
                </Box>
            </Paper>
        </Container>
    )
};