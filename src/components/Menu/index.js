import React, { useState } from 'react';
import TopMenu from './TopMenu';
import SideMenu from './SideMenu';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from 'styled-components';
import CssBaseline from '@mui/material/CssBaseline';

const drawerWidth = 240;

const Menu = ({ children }, props) => {
    const { wd } = props;
    const theme = useTheme();
    const navigate = useNavigate();
    const { signout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [currentStep, SetCurrentStep] = useState(1);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const container = wd !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex', backgroundColor: 'white' }}>
            <CssBaseline />

            <TopMenu theme={theme} handleDrawerToggle={handleDrawerToggle} />

            <Box
                component="nav"
                sx={{
                    width: { sm: drawerWidth },
                    flexShrink: { sm: 0 },
                }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <SideMenu theme={theme} signout={signout} navigate={navigate} currentStep={currentStep} SetCurrentStep={SetCurrentStep} />
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            boxShadow: '6px 0px 18px 0px rgba(0, 0, 0, 0.06)',
                            border: 'none',
                        },
                    }}
                    open
                >
                    <SideMenu theme={theme} signout={signout} navigate={navigate} currentStep={currentStep} SetCurrentStep={SetCurrentStep} />
                </Drawer>
            </Box>

            <Grid style={{ width: '100%', height: '100vh' }}>
                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sx: `calc(100% - ${drawerWidth}px)` } }}>
                    <Toolbar />
                    <Box>{children}</Box>
                </Box>
            </Grid>
        </Box >
    );
}

export default Menu;
