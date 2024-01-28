import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useTheme } from "styled-components";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { InputAdornment, Typography, Grid } from "@mui/material";
import InputOutlinedIcon from '@mui/icons-material/InputOutlined';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import ShieldQuestion from "../../../assets/images/interrogatorio-de-escudo.svg";
import { createStyles, makeStyles } from "@mui/styles";

const Step1 = ({ SetCurrentStep }) => {
    const theme = useTheme();
    const { signin } = useAuth();
    const navigate = useNavigate();
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const handleFocus = (inputId) => {
        if (inputId === 0) {
            setIsEmailFocused(true);
            setIsPasswordFocused(false);
        } else {
            setIsEmailFocused(false);
            setIsPasswordFocused(true);
        }
    };

    const handleBlur = () => {
        setIsEmailFocused(false);
        setIsPasswordFocused(false);
    };

    const handleLogin = () => {

        if (!email || !password) {
            setError("Preencha todos os campos");
            return;
        }

        const res = signin(email, password);

        if (res) {
            setError(res);
            return;
        }

        SetCurrentStep(4);
    };

    const inputs = [
        {
            id: 0,
            placeholder: "e-mail",
            type: "email",
            value: "email"
        },
        {
            id: 1,
            placeholder: "Informe sua senha",
            type: showPassword ? 'text' : 'password',
            value: "password"
        }
    ]

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
        iconEmail: {
            color: isEmailFocused ? theme.colors.blue500 : theme.colors.gray400
        },
        iconPassword: {
            color: isPasswordFocused ? theme.colors.blue500 : theme.colors.gray400
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
            <Typography style={styles.welcomeText}>Bem-vindo.</Typography>
            <Typography style={styles.infoText}>
                informe as suas credenciais de acesso ao portal
            </Typography>
            {inputs.map((input) => (
                <Grid item xs={12}>
                    <TextField
                        className={classes.customTextField}
                        placeholder={input.placeholder}
                        variant="outlined"
                        fullWidth
                        type={input.type}
                        value={input.id === 0 ? email : password}
                        onChange={(e) => input.id === 0 ? setEmail(e.target.value) : setPassword(e.target.value)}
                        margin="normal"
                        onFocus={() => handleFocus(input.id)}
                        onBlur={handleBlur}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {input.id === 0 ? (
                                        <AlternateEmailIcon
                                            className={isEmailFocused ? classes.iconFocused : classes.icon}
                                        />
                                    ) : (
                                        <>
                                            {showPassword ?
                                                <VisibilityOutlinedIcon
                                                    className={isPasswordFocused ? classes.iconFocused : classes.icon}
                                                    onClick={() => setShowPassword(!showPassword)}
                                                /> :
                                                <VisibilityOffOutlinedIcon
                                                    className={isPasswordFocused ? classes.iconFocused : classes.icon}
                                                    onClick={() => setShowPassword(!showPassword)}
                                                />
                                            }
                                        </>
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            ))}

            <Grid item xs={12} style={{ paddingBottom: 78 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    style={styles.loginButton}
                >
                    <Typography variant="button" style={styles.loginButtonText}>
                        entrar
                    </Typography>
                    <InputOutlinedIcon />
                </Button>
                <Grid item xs={12} style={styles.questionButton}>
                    <Button onClick={() => SetCurrentStep(2)}>
                        <Typography style={styles.questionButtonText}>
                            <img
                                src={ShieldQuestion}
                                alt="Interrogação dentro do escudo"
                                style={styles.questionImage}
                            />
                            Esqueceu a senha?
                        </Typography>
                    </Button>
                    <div style={styles.errorMessage}>{error}</div>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Step1;


const useStyles = makeStyles(() =>
    createStyles({
        customTextField: {
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderRadius: '10px',
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(41 61 113)",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
                color: "rgb(41 61 113)",
                fontFamily: 'Epilogue',
                fontSize: 16,
                fontStyle: 'normal',
                fontWeight: '700',
                lineHeight: 'normal',
                letterSpacing: '-1.04px'
            },
        },
        icon: {
            cursor: "pointer",
            color: "#B7B7B7",
        },
        iconFocused: {
            color: "rgb(41 61 113)",
        },
    })
);