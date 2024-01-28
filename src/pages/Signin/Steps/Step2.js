import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useTheme } from "styled-components";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { InputAdornment, Typography, Grid } from "@mui/material";
import InputOutlinedIcon from '@mui/icons-material/InputOutlined';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

const Step2 = ({ SetCurrentStep }) => {
    const theme = useTheme();
    const { signin } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setError("e-mail inválido!");
            return;
        }

        SetCurrentStep(3)
    };

    const styles = {
        loginContainer: {
            maxWidth: 380,
            maxHeight: 433,
            paddingTop: 49,
            paddingLeft: 30,
            paddingRight: 30,
            borderRadius: 28,
            backgroundColor: theme.colors.white,
        },
        welcomeText: {
            color: theme.colors.blue600,
            textAlign: 'left',
            fontFamily: 'Epilogue',
            fontSize: 36,
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: 'normal',
            letterSpacing: -2.34
        },
        infoText: {
            color: theme.colors.gray500,
            fontFamily: 'Epilogue',
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: "127%",
            letterSpacing: -1.04,
            paddingTop: 16,
        },
        loginButton: {
            display: "flex",
            width: "100%",
            height: 57,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
            backgroundColor: theme.colors.blue600,
            borderRadius: 8
        },
        loginButtonDisabled: {
            display: "flex",
            width: "100%",
            height: 57,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
            backgroundColor: '#C3C3C3',
            boxShadow: 'none'
        },
        loginButtonText: {
            marginRight: 8,
            textTransform: "none",
            color: theme.colors.ray150,
            textAlign: 'right',
            fontFamily: 'Epilogue',
            fontSize: 24,
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: 'normal',
            letterSpacing: -1.56,
        },
        questionButton: {
            textAlign: "right",
            paddingTop: 23
        },
        questionButtonText: {
            color: theme.colors.orange700,
            textAlign: 'right',
            fontFamily: 'Epilogue',
            fontSize: 11,
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
            letterSpacing: -0.715,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            textTransform: 'none'
        },
        questionImage: {
            maxWidth: "100%",
            paddingRight: 4
        },
        errorMessage: {
            textAlign: 'center',
            color: theme.colors.orange700
        }
    };

    return (
        <Grid item xs={12} style={styles.loginContainer}>
            <Typography style={styles.welcomeText}>Recuperar senha.</Typography>
            <Typography style={styles.infoText}>
                Informe o e-mail do seu cadastro. Nós estaremos realizando o envio de um link com as instruções para você redefinir a sua<br />senha.
            </Typography>
            <Grid item xs={12}>
                <TextField
                    placeholder="Informe sua e-mail"
                    variant="outlined"
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(e) => [setEmail(e.target.value), setError("")]}
                    margin="normal"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <AlternateEmailIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={12} style={{ paddingBottom: 78 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    style={styles.loginButton}
                >
                    <Typography variant="button" style={styles.loginButtonText}>
                        enviar link
                    </Typography>
                </Button>
                <Grid item xs={12} style={styles.questionButton}>
                    <div style={styles.errorMessage}>{error}</div>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Step2;