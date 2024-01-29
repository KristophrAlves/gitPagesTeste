import {
    AppBar,
    IconButton,
    InputBase,
    Paper,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from "../../assets/images/search.svg";

const drawerWidth = 240;

const TopMenu = ({
    theme,
    handleDrawerToggle
}) => {
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
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
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
                        <IconButton
                            style={{
                                padding: '10px'
                            }}
                        >
                            <img
                                src={SearchIcon}
                                alt="icone de busca"
                                style={{ height: '15px' }}
                            />
                        </IconButton>
                        <InputBase
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
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default TopMenu;