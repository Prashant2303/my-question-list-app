import styles from 'styles/PublicQuestion.module.css';
import { Grid, IconButton } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useState } from "react";

export default function PublicQuestion({ question }) {
    const [showNotes, setShowNotes] = useState(false);
    const handleClick = () => {
        setShowNotes(!showNotes);
    }

    return (
        <Grid container className={styles.question}>
            <Grid item xs={8} sm={9.5} className={styles.name}>
                <a href={question.url} target='_blank' rel="noreferrer">{question.name}</a>
            </Grid>
            <Grid item xs={2.5} sm={1.5}>{question.difficulty}</Grid>
            <Grid item xs={1.5} sm={1} textAlign="center" >
                {question.notes ?
                    <IconButton onClick={handleClick} sx={{'padding':'0px'}}>
                        {showNotes ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </IconButton>
                    : <>N/A</>}
            </Grid>
            {showNotes ?
                <Grid item xs={12} className={styles.notes}>
                    {question.notes}
                </Grid> : null
            }
        </Grid>
    )
}