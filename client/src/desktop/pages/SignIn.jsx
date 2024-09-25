import "../styles/SignIn.css";
import { useState } from 'react';
import { Box, Button, TextField, Container, Typography, Paper } from '@mui/material';
import { toast } from 'react-toastify';

export default function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleUsernameChange = (event) => {
        let username = event.target.value;
        setUsernameError('');
        setUsername(username);

        if (!username) {
            setUsernameError('Username is required');
        } else if(username.length < 3) {
            setUsernameError('Username must be at least 3 characters long');
        } else {
            setUsername(username);
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
        if (usernameError || passwordError) {
            toast.error('Please correct the errors before submitting.');
            return;
        }
        toast.info('Signing in...');
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
                    boxShadow: ' 2px  2px 2px 2px rgba(0, 0, 0, 0.05), \
                                -2px -2px 2px 2px rgba(0, 0, 0, 0.05), \
                                -2px  2px 2px 2px rgba(0, 0, 0, 0.05), \
                                 2px -2px 2px 2px rgba(0, 0, 0, 0.05)' }}>
                <Typography variant="h4" mt={2}>
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ padding: '10px 25px', borderRadius: '10px' }}>
                    <TextField
                        error={!!usernameError}
                        helperText={usernameError}
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
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