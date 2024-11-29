import styles from './styles.module.css';
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useState } from 'react';
import { useHooks } from 'service/apiCalls';
import { LoadingButton } from '@mui/lab';

export function Suggestions() {
    const hooks = useHooks();

    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    async function getSuggestions() {
        setLoading(true);
        try {
            const data = await hooks.getSuggestions();
            setSuggestions(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return <Paper elevation={3} className={styles.suggestions} >
        <Grid container justifyContent="center">
            <LoadingButton onClick={getSuggestions} loading={loading}>
                Get suggestions based on the list using Gemini
            </LoadingButton>
        </Grid>
        {suggestions.map((suggestion, index) => <div key={index}>
            <Typography variant='h6'>{suggestion.topicName}</Typography>
            <ul className={styles.list}>
                {suggestion.questionList.map((question, index) => <li key={index}>{question.questionName}</li>)}
            </ul>
        </div>)}
        {!!suggestions.length &&
            <Grid container justifyContent="end">
                <Button size="small" onClick={() => setSuggestions([])}>
                    Reset
                </Button>
            </Grid>
        }
    </Paper>
}
