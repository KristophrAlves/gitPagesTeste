import React, { useState } from "react";
import Button from "@mui/material/Button";
import useAuth from "../../../hooks/useAuth";
import TextField from "@mui/material/TextField";
import { createStyles, makeStyles } from "@mui/styles";
import { InputAdornment, Grid } from "@mui/material";
import InputOutlinedIcon from '@mui/icons-material/InputOutlined';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ShieldQuestion from "../../../assets/images/interrogatorio-de-escudo.svg";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import {
    CustomButtonPrimary,
    CustomContainer,
    CustomErrorMessage,
    CustomForgotPassword,
    CustomImgIcon,
    CustomSubTitle,
    CustomTextButton,
    CustomTextForgotPassword,
    CustomTitle,
    Customdot
} from "./Styles";

const Step1 = ({ setCurrentStep }) => {
    const classes = useStyles();
    const { signin } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
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

        setCurrentStep(4);
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
    ];

    return (
        <CustomContainer>
            <CustomTitle>Bem-vindo<Customdot>.</Customdot></CustomTitle>
            <CustomSubTitle>
                informe as suas credenciais de acesso ao portal
            </CustomSubTitle>
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
                <CustomButtonPrimary
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                >
                    <CustomTextButton>
                        entrar
                    </CustomTextButton>
                    <InputOutlinedIcon />
                </CustomButtonPrimary>

                <CustomForgotPassword>
                    <Button onClick={() => setCurrentStep(2)}>
                        <CustomTextForgotPassword>
                            <CustomImgIcon
                                src={ShieldQuestion}
                                alt="Interrogação dentro do escudo"
                            />
                            Esqueceu a senha?
                        </CustomTextForgotPassword>
                    </Button>
                    <CustomErrorMessage>{error}</CustomErrorMessage>
                </CustomForgotPassword>

            </Grid>
        </CustomContainer>
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