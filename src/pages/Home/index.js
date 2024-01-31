import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useTheme } from "styled-components";
import { experimentalStyled as styled } from "@mui/material/styles";
import { axiosInstance, createMarvelAPIUrl } from "../../baseUrls/axiosInstance";
import { Box, Grid, Paper, Typography, Pagination, Stack, Button, Divider } from "@mui/material";

const Home = () => {
  const [offset, setOffset] = useState(0)
  const [pagination, setPagination] = useState(10)
  const [currentPage, setCurrentPage] = useState(0);
  const [characterInfo, setCharacterInfo] = useState([]);


  const handlePaginationChange = (page, event) => {
    const itemsPerPage = 10;
    const newOffset = (page - 1) * itemsPerPage;

    setCurrentPage(page);
    setOffset(newOffset);
    if (pagination > 157) {
      setPagination(pagination + currentPage)
    } else {
      setPagination(157)
    }
  };

  useEffect(() => {
    apiGetItens();
  }, [currentPage]);

  const apiGetItens = async () => {
    const apiUrl = "characters";
    const itemsPerPage = 10;

    const additionalParams = { limit: itemsPerPage, offset: offset };

    try {
      const response = await axiosInstance.get(
        createMarvelAPIUrl(apiUrl, additionalParams)
      );
      const characters = response.data.data.results;

      const characterGroup = characters.map((character) => {
        const maxLength = 155;
        let truncatedDescription = character.description
          ? character.description.substring(0, maxLength)
          : "Descrição não disponível";

        if (
          character.description &&
          character.description.length > maxLength
        ) {
          truncatedDescription += "...";
        }

        return {
          id: character.id,
          name: character.name,
          thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
          description: truncatedDescription,
        };
      });

      setCharacterInfo(characterGroup);
    } catch (error) {
      console.error(
        "Erro na requisição:",
        error.response.status,
        error.response.data
      );
    }
  };

  const theme = useTheme();
  const navigate = useNavigate();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Box sx={{ flexGrow: 1, maxWidth: `calc(1366px - 240px)` }}>
      <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
        {characterInfo.map((character, index) => (
          <Button
            key={character.id}
            style={{ padding: 5, textTransform: 'none' }}
            onClick={() => [navigate(`/perfil/${character.id}`)]}
          >
            <Item
              style={{
                borderRadius: 15,
                padding: 14,
                maxWidth: index === 8 || index === 9 ? "526px" : "258px",
                minWidth: index === 8 || index === 9 ? "526px" : "258px",
                maxHeight: "150px",
                minHeight: "150px",
                backgroundColor: theme.colors.gray100,
              }}
            >
              <Grid display={"flex"}>
                <img
                  src={character.thumbnail}
                  alt="Descrição da imagem"
                  style={{
                    borderRadius: 15,
                    width: "83px",
                    height: "119px",
                    objectFit: "cover",
                  }}
                />
                <Grid style={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    paddingLeft={1}
                    textAlign={"left"}
                    style={{
                      color: theme.colors.black,
                      fontFamily: "Epilogue",
                      fontSize: 16,
                      fontStyle: "normal",
                      fontWeight: "700",
                      lineHeight: "normal",
                      letterSpacing: -0.48,
                    }}
                  >
                    {character.name}
                  </Typography>
                  <Typography
                    paddingLeft={1}
                    textAlign={"left"}
                    style={{
                      color: theme.colors.black,
                      fontFamily: "Epilogue",
                      fontSize: 12,
                      fontStyle: "normal",
                      fontWeight: "300",
                      lineHeight: "normal",
                      letterSpacing: -0.36,
                    }}
                  >
                    {character.description}
                  </Typography>
                </Grid>
              </Grid>
            </Item>
          </Button>
        ))}
      </Grid>
      {characterInfo[0] ?
        <>
          <Divider style={{ paddingTop: '32px', width: '94%' }} />
          <Box mt={2} display="flex" justifyContent="center">
            <Stack spacing={2}>
              <Pagination
                count={pagination}
                variant="outlined"
                shape="rounded"
                onChange={(event, page) => handlePaginationChange(page, event)}
                button
              />
            </Stack>
          </Box>
        </>
        : ''}
    </Box>
  );
};

export default Home;
