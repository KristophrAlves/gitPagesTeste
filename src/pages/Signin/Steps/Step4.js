import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InputDropDown from "../../../components/InputDropDown";
import { axiosInstance, createMarvelAPIUrl } from "../../../baseUrls/axiosInstance";
import {
    CustomButtonSecondary,
    CustomContainer,
    CustomSubTitle,
    CustomTextButton,
    CustomTitle,
    Customdot
} from "./Styles";

const Step4 = () => {

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

    return (
        <CustomContainer>
            <CustomTitle>Selecione o seu agente mais legal<Customdot>.</Customdot></CustomTitle>
            <CustomSubTitle>
                Tenha a visão completa do seu agente.
            </CustomSubTitle>

            <Grid item xs={12} style={{ paddingTop: 9, paddingBottom: 16 }}>

                <InputDropDown characterSelected={characterSelected} characterInfo={characterInfo} handleChange={handleChange} />

            </Grid>

            <Grid item xs={12} style={{ paddingBottom: 48, display: 'flex', justifyContent: 'flex-end' }}>
                <CustomButtonSecondary
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/perfil/${characterSelected.id}`)}
                >
                    <CustomTextButton>
                        Entrar
                    </CustomTextButton>
                </CustomButtonSecondary>
            </Grid>
        </CustomContainer>
    );
};

export default Step4;