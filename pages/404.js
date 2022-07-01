import styles from "styles/404.module.css";
import { Grid, Paper, Typography } from "@mui/material";

export default function PageNotFound() {
    return (
        <Paper className={styles.error} elevation={3} sx={{ height: '100vh' }}>
            <Grid container justifyContent="center">
                <Typography variant="h4">
                    Page not found
                </Typography>
            </Grid>
        </Paper>
    )
}