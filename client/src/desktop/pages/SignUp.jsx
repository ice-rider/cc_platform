import "../styles/SignUp.css";
import { useState, useContext } from 'react';
import { Box, Button, TextField, Container, Typography, Paper, Divider } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Data } from "../../App";


export default function SignUp() {
    const navigate = useNavigate();
    const { setter } = useContext(Data);

    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [loginError, setLoginError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordConfirmError, setPasswordConfirmError] = useState('');


    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleUsernameChange = (event) => {
        let login = event.target.value;
        setLoginError('');
        setLogin(login);

        if (!login) {
            setLoginError('Username is required');
        } else if(login.length < 3) {
            setLoginError('Username must be at least 3 characters long');
        } else {
            setLogin(login);
        }
    }
    
    const handleEmailChange = (event) => {
        let email = event.target.value;
        setEmailError('');
        setEmail(email);

        if (!validateEmail(event.target.value)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError(null);
        }
    };

    const handlePasswordChange = (event) => {
        let password = event.target.value;
        setPasswordError('');
        setPassword(password);

        if (!password) {
            setPasswordError('Password is required');
        } else if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
        } else {
            setPasswordError(null);
        }
    }
    const handlePasswordConfirmChange = (event) => {
        let password_confirm = event.target.value;
        setPasswordConfirmError('');
        setPasswordConfirm(password_confirm);

        if (!password_confirm) {
            setPasswordConfirmError('Password confirmation is required');
        } else if (password_confirm !== password) {
            setPasswordConfirmError('Passwords do not match');
        } else {
            setPasswordConfirmError(null);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (emailError || loginError || passwordError || passwordConfirmError) {
            toast.error('Please correct the errors before submitting.');
            return;
        }
        axios.post('/auth/register', { username: login, email, password })
            .then(response => {
                console.log(response)
                if (response.status === 201) {
                    toast.success('Account created successfully. Please sign in.');
                    setter({
                        auth:             true,
                        access_token:     response.data.access_token,
                        user_id:          response.data.user.id,
                        username:         response.data.user.username,
                        email:            response.data.user.email,
                        role:             response.data.user.role,
                        subscription_end: response.data.user.subscription_end
                    })
                    navigate('/account');
                } else {
                    toast.error(response.status.toString() + response.data.message);
                }
            })
            .catch(error => {
                console.log(error)
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
                    boxShadow: '2px  2px 2px 2px rgba(0, 0, 0, 0.05), -2px -2px 2px 2px rgba(0, 0, 0, 0.05), -2px  2px 2px 2px rgba(0, 0, 0, 0.05), 2px -2px 2px 2px rgba(0, 0, 0, 0.05)' }}>
                <Typography variant="h4" mt={2}>
                    Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ padding: '10px 25px', borderRadius: '10px' }}>
                    <TextField
                        error={!!loginError}
                        helperText={loginError}
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Имя пользователя"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={login}
                        onChange={handleUsernameChange}
                    />
                    <TextField
                        error={!!emailError}
                        helperText={emailError}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Почтовый адрес"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={handleEmailChange}
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
                        autoComplete="current-password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <TextField
                        error={!!passwordConfirmError}
                        helperText={passwordConfirmError}
                        margin="normal"
                        required
                        fullWidth
                        name="passwordConfirm"
                        label="Подтверждение пароля"
                        type="password"
                        id="password-confirm"
                        value={passwordConfirm}
                        onChange={handlePasswordConfirmChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Divider sx={{ mt: 0, mb: 1 }} />
                    <div className="bt" sx={{ mb: 2 }}>
                        <span>Уже зарегестрированы? <span className="a" onClick={() => navigate('/sign-in')}>Авторизация</span></span>
                    </div>
                </Box>
            </Paper>
        </Container>
    );
}

