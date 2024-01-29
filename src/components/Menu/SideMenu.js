import {
    Divider,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Toolbar,
    Typography
} from "@mui/material";
import User from "../../assets/images/user.svg";
import UserRed from "../../assets/images/userRed.svg";
import Logo from "../../assets/images/PontuaLogoSecondary.svg";
import ArrowBack from "../../assets/images/corner-up-left.svg";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { useEffect, useState } from "react";

const SideMenu = ({
    theme,
    signout,
    navigate,
    currentStep,
    SetCurrentStep
}) => {
    const [urlNumb, setUrlNumb] = useState(0);

    useEffect(() => {
        getUrl();
    }, [window.location.pathname]);

    const getUrl = () => {
        const urlName = window.location.pathname.match(/\/(\w+)/);
        if (urlName && urlName[1]) {
            renderStep(urlName[1]);
        }
    }

    const renderStep = (urlName) => {
        switch (urlName) {
            case 'home':
                setUrlNumb(1);
                break;
            case 'perfil':
                setUrlNumb(2);
                break;
            default:
                setUrlNumb(0);
                break;
        }
    };

    const StyleBase = {
        fontFamily: 'Epilogue',
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 'normal',
        letterSpacing: -0.39
    }

    const items = [
        {
            action: () => [navigate('/home'), SetCurrentStep(1), getUrl()],
            icon: <DashboardOutlinedIcon
                style={{ color: currentStep && urlNumb === 1 ? theme.colors.orange500 : theme.colors.black }}
            />,
            style: {
                color: currentStep && urlNumb === 1 ? theme.colors.orange500 : '#000000',
                StyleBase
            },
            name: 'Home'
        },
        {
            action: () => [navigate(`/perfil/${0}`), SetCurrentStep(2), getUrl()],
            icon: <img
                src={currentStep && urlNumb === 2 ? UserRed : User} alt="icone user" color={theme.colors.orange500}
                height={24}
            />,
            style: {
                color: currentStep && urlNumb === 2 ? theme.colors.orange500 : '#000000',
                StyleBase
            },
            name: 'Perfil'
        }
    ]

    return (
        <Grid>
            <Toolbar>
                <img src={Logo} alt="Logo Pontua" />
            </Toolbar>
            <Divider />
            <List>
                {items.map((item) => (
                    <ListItem disablePadding style={{ padding: '0px 20px 8px 16px' }}>
                        <ListItemButton onClick={item.action}
                            sx={{
                                '&:hover': {
                                    borderRadius: 10,
                                    backgroundColor: '#F5F6F8'
                                }
                            }}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <Typography
                                style={item.style}
                            >
                                {item.name}
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem disablePadding style={{ padding: '0px 20px 8px 16px' }}>
                    <ListItemButton onClick={() => [signout(), navigate("/")]}
                        sx={{
                            '&:hover': {
                                borderRadius: 10,
                                backgroundColor: '#F5F6F8'
                            }
                        }}>
                        <ListItemIcon>
                            <img src={ArrowBack} alt="icone user" height={24} />
                        </ListItemIcon>
                        <Typography
                            style={{
                                color: '#000000',
                                StyleBase
                            }}
                        >
                            Sair
                        </Typography>
                    </ListItemButton>
                </ListItem>
            </List>
        </Grid >
    );
}

export default SideMenu;