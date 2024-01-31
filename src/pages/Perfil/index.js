import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useTheme } from "styled-components";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Overview from './Overview';
import { axiosInstance, createMarvelAPIUrl } from "../../baseUrls/axiosInstance";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ paddingTop: "29px" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Perfil = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [overview, setOverview] = useState(0);
  const characterId = window.location.pathname.match(/\d+/)[0];
  const [characterInfo, setCharacterInfo] = useState([]);

  useEffect(() => {
    apiGetItens();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setOverview(newValue);
  };

  const apiGetItens = async () => {

    const apiUrl = `characters/${characterId}`;
    const marvelAPIUrl = createMarvelAPIUrl(apiUrl);

    try {
      const response = await axiosInstance.get(marvelAPIUrl);
      const characters = response.data.data.results;
      const characterGroup = characters.map((character) => ({
        name: character.name,
        thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
        description: character.description
      }));
      setCharacterInfo(characterGroup);
    } catch (error) {
      console.error('Erro na requisição:', error.response.status, error.response.data);
    }
  };

  const styles = {
    titleOne: {
      paddingRight: 4,
      color: theme.colors.blue600,
      fontSize: 24,
      fontWeight: '700',
      fontFamily: 'Epilogue',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: -0.72
    },
    backSlash: {
      paddingRight: 4,
      color: theme.colors.orange500,
      fontSize: 24,
      fontWeight: '700',
      fontFamily: 'Epilogue',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: -0.72
    },
    titleTwo: {
      color: theme.colors.gray500,
      fontSize: 24,
      fontWeight: '300',
      fontFamily: 'Epilogue',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: -0.72
    },
    tab: {
      padding: 0,
      color: theme.colors.blue600,
      fontFamily: 'Epilogue',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: '500',
      textTransform: 'none'
    }
  }

  const menu = [
    {
      id: 1,
      label: 'Visão Geral'
    },
    {
      id: 2,
      label: 'Teams'
    },
    {
      id: 3,
      label: 'Powers'
    },
    {
      id: 4,
      label: 'Species'
    },
    {
      id: 5,
      label: 'Authors'
    },
  ]

  const renderOverview = () => {
    switch (overview) {
      case 0:
        return <Overview theme={theme} characterInfo={characterInfo[0]} />;
      case 1:
        return <Typography></Typography>;
      case 2:
        return <Typography></Typography>;
      case 3:
        return <Typography></Typography>;
      case 4:
        return <Typography></Typography>;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: `calc(1366px - 240px)` }}>
      <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
        <Typography style={styles.titleOne}>
          Perfil
        </Typography>
        <Typography style={styles.backSlash}>
          /
        </Typography>
        <Typography style={styles.titleTwo}>
          A-Bomb
        </Typography>
      </Grid>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            {menu.map((item) => (
              <Tab key={item.id} style={styles.tab} label={item.label} onChange={() => setValue(item.id)} />
            ))}
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={overview} >
          {renderOverview()}
        </CustomTabPanel>

      </Box>

    </Box >
  );
}

export default Perfil;
