import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { InputAdornment, Grid } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import {
    CustomButtonPrimary,
    CustomContainer,
    CustomErrorMessage,
    CustomSubTitle,
    CustomTextButton,
    CustomTitle,
    Customdot
} from "./Styles";

const Step2 = ({ SetCurrentStep }) => {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleEmail = () => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setError("e-mail inválido!");
            return;
        }

        SetCurrentStep(3)
    };


    return (
        <CustomContainer>
            <CustomTitle>Recuperar senha<Customdot>.</Customdot></CustomTitle>
            <CustomSubTitle>
                Informe o e-mail do seu cadastro. Nós estaremos realizando o envio de um link com as instruções para você redefinir a sua<br />senha.
            </CustomSubTitle>
            <Grid item xs={12}>
                <TextField
                    className={classes.customTextField}
                    placeholder="Informe sua e-mail"
                    variant="outlined"
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(e) => [setEmail(e.target.value), setError("")]}
                    margin="normal"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(!isFocused)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <AlternateEmailIcon className={isFocused ? classes.iconFocused : classes.icon} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs={12} style={{ paddingBottom: 78 }}>
                <CustomButtonPrimary
                    variant="contained"
                    color="primary"
                    onClick={handleEmail}
                >
                    <CustomTextButton>
                        enviar link
                    </CustomTextButton>
                </CustomButtonPrimary>
                <CustomErrorMessage>{error}</CustomErrorMessage>
            </Grid>
        </CustomContainer>
    );
};

export default Step2;

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