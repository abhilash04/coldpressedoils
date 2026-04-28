import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Tabs, 
  Tab, 
  TextField, 
  Button, 
  Paper, 
  Divider,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff, Google } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { apiList, invokeApi } from "../../services/apiServices";

const LoginPage = () => {
  const [tab, setTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Snackbar State
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  const showSnackbar = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response = await invokeApi(apiList.login, { email, password });

      if (response?.status === 200 && response.data.responseCode === "200") {
        login({ 
          name: response.data.name, 
          email, 
          id: response.data.userId,
          roles: response.data.roles 
        }, response.data.token);
        showSnackbar("Login successful! Welcome back.", "success");
        setTimeout(() => navigate('/'), 1500);
      } else {
        showSnackbar(response?.data?.responseMessage || "Invalid email or password", "error");
      }
    } catch (err) {
      showSnackbar("Connection error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let params = {
      email,
      name,
      phoneNumber: phone,
      password
    };

    try {
      let response = await invokeApi(apiList.signup, params);

      if (response?.status === 200 && response.data.responseCode === "200") {
        showSnackbar("Account created! You can now login.", "success");
        setTab(0); // Switch to login tab
      } else {
        showSnackbar(response?.data?.responseMessage || "Registration failed", "error");
      }
    } catch (err) {
      showSnackbar("Connection error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Paper sx={{ borderRadius: 0, overflow: 'hidden', border: '1px solid #eee' }} elevation={0}>
        <Tabs 
          value={tab} 
          onChange={(e, v) => setTab(v)} 
          variant="fullWidth"
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            '& .MuiTab-root': { py: 2, fontWeight: 600, letterSpacing: 1 }
          }}
        >
          <Tab label="LOGIN" />
          <Tab label="REGISTER" />
        </Tabs>

        <Box sx={{ p: 4 }}>
          {tab === 0 ? (
            <Box component="form" onSubmit={handleLoginSubmit}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>Welcome Back</Typography>
              <TextField 
                fullWidth 
                label="Email Address" 
                margin="normal" 
                variant="outlined" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField 
                fullWidth 
                label="Password" 
                type={showPassword ? 'text' : 'password'}
                margin="normal" 
                variant="outlined" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Button type="submit" fullWidth variant="contained" disabled={loading} color="primary" size="large" sx={{ mt: 3, py: 1.5, borderRadius: 0 }}>
                {loading ? "AUTHENTICATING..." : "LOGIN"}
              </Button>
              <Button fullWidth variant="text" sx={{ mt: 1, color: 'text.secondary', fontSize: '0.8rem' }}>
                Forgot Password?
              </Button>

              <Divider sx={{ my: 3 }}><Typography variant="body2" sx={{ color: '#999' }}>OR</Typography></Divider>

              <Button 
                fullWidth 
                variant="outlined" 
                startIcon={<Google />} 
                sx={{ mb: 1, borderColor: '#EEE', color: 'text.primary', borderRadius: 0 }}
              >
                Sign in with Google
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleRegisterSubmit}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>Join Our Community</Typography>
              <TextField 
                fullWidth 
                label="Full Name" 
                margin="normal" 
                variant="outlined" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField 
                fullWidth 
                label="Email Address" 
                margin="normal" 
                variant="outlined" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField 
                fullWidth 
                label="Mobile Number" 
                margin="normal" 
                variant="outlined" 
                required 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField 
                fullWidth 
                label="Create Password" 
                type="password" 
                margin="normal" 
                variant="outlined" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" fullWidth variant="contained" disabled={loading} color="primary" size="large" sx={{ mt: 3, py: 1.5, borderRadius: 0 }}>
                {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
              </Button>
              <Typography variant="caption" sx={{ display: 'block', mt: 2, textAlign: 'center', color: 'text.secondary' }}>
                By registering, you agree to our Terms & Privacy Policy.
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginPage;

