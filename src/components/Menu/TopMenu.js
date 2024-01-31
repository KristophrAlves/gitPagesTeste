import {
    AppBar,
    Grid,
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Paper,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from "../../assets/images/search.svg";
import { axiosInstance, createMarvelAPIUrl } from "../../baseUrls/axiosInstance";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const drawerWidth = 240;

const TopMenu = ({
    theme,
    handleDrawerToggle
}) => {

    const navigate = useNavigate();
    const [nameSearch, setNameSearch] = useState('');
    const [tempCharacterInfo, setTempCharacterInfo] = useState([]);
    const [characterInfo, setCharacterInfo] = useState([]);
    const [url, setUrl] = useState([]);
    const location = useLocation();

    const getUrl = () => {
        setUrl(window.location.pathname.match(/\/(\w+)/)[1]);
    }

    useEffect(() => {
        getUrl();
    }, [location.pathname])

    useEffect(() => {
        if (nameSearch.length < 1) {
            setTempCharacterInfo([]);
            setCharacterInfo([]);
        } else {
            apiGetItens();
        }
    }, [nameSearch]);

    const handleClick = (id) => {
        setTempCharacterInfo([]);
        setCharacterInfo([]);
        navigate(`/perfil/${id}`)
    }

    const apiGetItens = async () => {
        const apiUrl = 'characters';
        const additionalParams = { nameStartsWith: nameSearch };

        const marvelAPIUrl = createMarvelAPIUrl(apiUrl, additionalParams);

        try {
            const response = await axiosInstance.get(marvelAPIUrl);
            const characters = response.data.data.results;
            const characterGroup = characters.map((character) => ({
                id: character.id,
                name: character.name,
                thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
            }));
            setTempCharacterInfo(characterGroup);
        } catch (error) {
            console.error('Erro na requisição:', error.response.status, error.response.data);
        }
    };

    useEffect(() => {
        setCharacterInfo(tempCharacterInfo);
    }, [tempCharacterInfo]);

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth} px` },
                boxShadow: 'none',
                borderBottom: '1px solid #EBEFF2'
            }}
        >
            <Toolbar style={{ backgroundColor: 'white' }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={() => handleDrawerToggle()}
                    sx={{ mr: 2, display: { sm: 'none', backgroundColor: theme.colors.blue200 } }}
                >
                    <MenuIcon />
                </IconButton>
                {url == "home" ?
                    <Typography variant="h6" noWrap component="div">
                        <Paper
                            component="form"
                            style={{
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                width: 400
                            }}
                        >
                            <IconButton style={{ padding: '10px' }}>
                                <img
                                    src={SearchIcon}
                                    alt="icone de busca"
                                    style={{ height: '15px' }}
                                />
                            </IconButton>
                            <InputBase
                                onChange={(item) => setNameSearch(item.target.value)}
                                value={nameSearch}
                                style={{
                                    color: theme.colors.blue200,
                                    fontFamily: 'Epilogue',
                                    fontSize: 12,
                                    fontStyle: 'normal',
                                    fontWeight: '500',
                                    lineHeight: 'normal',
                                    letterSpacing: -0.36
                                }}
                                placeholder="Busque um agente"
                            />
                        </Paper>

                        <List
                            style={{
                                position: "absolute",
                                maxWidth: " 400px",
                                maxHeight: "250px",
                                overflowY: "auto",
                                backgroundColor: theme.colors.white,
                                borderRadius: 15,
                                marginTop: 7,
                            }}
                        >
                            {characterInfo.map((item) => (
                                <ListItem
                                    key={item.id}
                                    style={{
                                        color: theme.colors.blue200,
                                        fontFamily: "Epilogue",
                                        fontSize: 12,
                                        fontWeight: 500,
                                        letterSpacing: -0.36,
                                        borderRadius: 15,
                                        boxShadow: "6px 0px 18px 0px rgba(0, 0, 0, 0.06)",
                                        marginBottom: 7,
                                        height: 40
                                    }}
                                >
                                    <ListItemButton onClick={() => handleClick(item.id)}>
                                        <Grid paddingTop={1} paddingRight={1}>
                                            <img
                                                src={item.thumbnail} alt={item.name}
                                                style={{ width: 24, height: 24, borderRadius: 20 }}
                                            />
                                        </Grid>
                                        <ListItemText primary={item.name} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Typography>
                    : ''}
            </Toolbar>
        </AppBar>
    );
}

export default TopMenu;
