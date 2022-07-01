import styles from 'styles/Loading.module.css';
import { CircularProgress } from "@mui/material";

export default function Loading() {
    return(
        <div className={styles.loadingScreen}>
            <CircularProgress sx={{ 'color': 'white' }} />
        </div>
    )
}