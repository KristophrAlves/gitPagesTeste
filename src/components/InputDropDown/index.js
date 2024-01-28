import React from "react";
import User from "../../assets/images/user.svg";
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FormControl, Select, MenuItem, Typography, Grid } from "@mui/material";

const InputDropDown = ({
    characterSelected,
    characterInfo,
    handleChange
}) => {

    return (
        <FormControl fullWidth>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={characterSelected}
                onChange={handleChange}
                IconComponent={KeyboardArrowDownIcon}
                style={{ height: '40px', borderRadius: '10px' }}
                MenuProps={{
                    PaperProps: {
                        style: {
                            borderRadius: '10px',
                            marginTop: 8,
                        },
                    },
                }}
                startAdornment={
                    !characterSelected ? (
                        <Grid container flexDirection="row" style={{ width: 900, height: '100%', alignItems: 'center' }}>
                            <Grid item paddingRight={1}>
                                <img src={User} alt="icone user" style={{ height: '24px' }} />
                            </Grid>
                            <Grid item textAlign="center">
                                <Typography>
                                    Selecione um agente
                                </Typography>
                            </Grid>
                        </Grid>
                    ) : (
                        ''
                    )
                }
                renderValue={(selected) => (
                    <Grid container flexDirection="row" style={{ width: '100%', alignItems: 'center' }}>
                        <Grid item paddingRight={1} paddingTop={1}>
                            <img
                                src={selected.thumbnail} alt={selected.name}
                                style={{ width: 24, height: 24, borderRadius: 20 }}
                            />
                        </Grid>
                        <Grid item width={'85%'} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                            <Typography>{selected.name}</Typography>
                        </Grid>
                    </Grid>
                )}
            >
                {characterInfo.map((character) => (
                    <MenuItem key={character.id} value={character}>
                        <Grid
                            flexDirection="row"
                            style={{ width: '100%', alignItems: 'center', display: 'flex' }}
                        >
                            <Grid paddingTop={1} paddingRight={1}>
                                <img
                                    src={character.thumbnail} alt={character.name}
                                    style={{ width: 24, height: 24, borderRadius: 20 }}
                                />
                            </Grid>
                            <Grid
                                width={'100%'}
                                display={"flex"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                            >
                                <Typography>{character.name}</Typography>
                                {character.id === characterSelected.id && <CheckIcon />}
                            </Grid>
                        </Grid>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default InputDropDown;
