import { Grid, Typography } from "@mui/material";

const Overview = ({ theme, characterInfo }) => {
    return (
        <Grid style={{
            width: '100%',
            boxShadow: '0px 6px 18px 0px rgba(0, 0, 0, 0.06)',
            borderRadius: 15
        }}>
            {characterInfo ?
                < Grid
                    style={{
                        padding: '42px 34px 42px 34px'
                    }}
                    display={"flex"}>
                    <img
                        src={characterInfo.thumbnail}
                        alt="Descrição da imagem"
                        style={{
                            borderRadius: 50,
                            width: "90px",
                            height: "90px",
                            objectFit: "cover",
                            marginRight: 31,
                            flexShrink: 0
                        }}
                    />
                    <Grid style={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                            paddingLeft={1}
                            textAlign={"left"}
                            style={{
                                color: theme.colors.blue600,
                                fontFamily: "Epilogue",
                                fontSize: 24,
                                fontStyle: "normal",
                                fontWeight: "700",
                                lineHeight: "normal",
                                letterSpacing: -0.72,
                            }}
                        >
                            {characterInfo.name}
                        </Typography>
                        <Typography
                            paddingLeft={1}
                            textAlign={"left"}
                            style={{
                                paddingTop: 9,
                                color: theme.colors.gray500,
                                fontFamily: "Epilogue",
                                fontSize: 16,
                                fontStyle: "normal",
                                fontWeight: "600",
                                lineHeight: "normal",
                                letterSpacing: -0.48,
                            }}
                        >
                            {characterInfo.description ? characterInfo.description : 'Descrição não disponível'}
                        </Typography>
                    </Grid>
                </Grid>
                : <></>}
        </Grid >
    );
}

export default Overview;