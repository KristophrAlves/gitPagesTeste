import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Typography, Grid } from "@mui/material";
import InputDropDown from "../../../components/InputDropDown";
import { axiosInstance, createMarvelAPIUrl } from "../../../baseUrls/axiosInstance";

const Step4 = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [characterSelected, setCharacterSelected] = useState('');
    const [characterInfo, setCharacterInfo] = useState([]);

    const handleChange = (event) => {
        setCharacterSelected(event.target.value);
    };

    useEffect(() => {
        apiGetItens();
    }, []);

    const apiGetItens = async () => {

        const apiUrl = 'characters';
        const additionalParams = { limit: 5 };

        const marvelAPIUrl = createMarvelAPIUrl(apiUrl, additionalParams);

        try {
            const response = await axiosInstance.get(marvelAPIUrl);
            const characters = response.data.data.results;
            const characterGroup = characters.map((character) => ({
                id: character.id,
                name: character.name,
                thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
            }));
            setCharacterInfo(characterGroup);
        } catch (error) {
            console.error('Erro na requisição:', error.response.status, error.response.data);
        }
    };

    const styles = {
        container: {
            maxWidth: 380,
            maxHeight: 433,
            paddingTop: 49,
            paddingLeft: 30,
            paddingRight: 30,
            borderRadius: 28,
            backgroundColor: theme.colors.white,
        },
        title: {
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
        button: {
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
        buttonText: {
            textTransform: "none",
            color: theme.colors.ray150,
            fontFamily: 'Epilogue',
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: 'normal'
        },
        errorMessage: {
            textAlign: 'center',
            color: theme.colors.orange700
        }
    };

    return (
        <Grid item xs={12} style={styles.container}>
            <Typography style={styles.title}>Selecione o seu agente mais legal.</Typography>
            <Typography style={styles.infoText}>
                Tenha a visão completa do seu agente.
            </Typography>

            <Grid item xs={12} style={{ paddingTop: 9, paddingBottom: 16 }}>

                <InputDropDown characterSelected={characterSelected} characterInfo={characterInfo} handleChange={handleChange} />

            </Grid>

            <Grid item xs={12} style={{ paddingBottom: 48, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/Perfil/${characterSelected.id}`)}
                    style={styles.button}
                >
                    <Typography variant="button" style={styles.buttonText}>
                        Entrar
                    </Typography>
                </Button>
            </Grid>
        </Grid>
    );
};

export default Step4;