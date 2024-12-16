import styles from 'styles/PublicQuestion.module.css';
import { Grid, IconButton } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useState } from "react";

export default function PublicQuestion({ question, index }) {
    const [showNotes, setShowNotes] = useState(false);
    const handleClick = () => {
        setShowNotes(!showNotes);
    }

    return (
        <Grid container>
            <Grid item xs={7.9} sm={9.5}>
                <a className={styles.name} href={question.url} target='_blank' rel="noreferrer">
                    <div>{index + 1}.&nbsp;</div> <div>{question.name}</div>
                </a>
            </Grid>
            <Grid item xs={2.6} sm={1.5}>{question.difficulty}</Grid>
            <Grid item xs={1.5} sm={1} textAlign="center" >
                {question.notes ?
                    <IconButton onClick={handleClick} sx={{ 'padding': '0px' }}>
                        {showNotes ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </IconButton>
                    : <span>N/A</span>}
            </Grid>
            {showNotes ?
                <Grid item xs={12} className={styles.notes}>
                    {question.notes}
                </Grid> : null
            }
        </Grid>
    )
}