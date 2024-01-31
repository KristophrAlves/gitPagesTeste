import { Grid, Typography } from "@mui/material";

const OtherTabs = ({ theme, items }) => {

    return (
        <Grid
            style={{
                padding: '0px 20px'
            }}>
            <ul>
                {items.map((item) => (
                    <Typography key={item.id} component="li"
                        style={{
                            color: theme.colors.gray500,
                            fontFamily: 'Epilogue',
                            fontSize: 16,
                            fontStyle: 'normal',
                            fontWeight: '600'
                        }}>
                        {item.name}
                    </Typography>
                ))}
            </ul>
        </Grid >
    );
}

export default OtherTabs;