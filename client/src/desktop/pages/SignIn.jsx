import "../styles/SignIn.css";
import { useState, useContext } from 'react';
import { Box, Button, TextField, Container, Typography, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Data } from "../../App";


export default function SignIn() {
    const navigate = useNavigate();
    const { setter } = useContext(Data);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const [loginError, setLoginError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleUsernameChange = (event) => {
        let username = event.target.value;
        setLoginError('');
        setLogin(username);

        if (!username) {
            setLoginError('Username is required');
        } else if(username.length < 3) {
            setLoginError('Username must be at least 3 characters long');
        } else {
            setLogin(username);
        }
    }

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

    const handleSubmit = (event) => {
        event.preventDefault();
        if (loginError || passwordError) {
            toast.error('Please correct the errors before submitting.');
            return;
        }
        axios.post('/auth/login', { username: login, password })
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    toast.success('Login successful. Redirecting...');
                    setter({
                        access_token: response.data.access_token,
                        auth: true,
                        user_id: response.data.user.id,
                        username: response.data.user.username,
                        role: response.data.user.role,
                        subscription_end: response.data.user.subscription_end
                    })
                    navigate('/account');
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch(error => {
                console.error(error)
                toast.error(error.response.data.message);
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
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ padding: '10px 25px', borderRadius: '10px' }}>
                    <TextField
                        error={!!loginError}
                        helperText={loginError}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={login}
                        onChange={handleUsernameChange}
                    />
                    <TextField
                        error={!!passwordError}
                        helperText={passwordError}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
};