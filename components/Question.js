// import '../App.css';
import React, { useState } from 'react';
import { Grid, TextField, Button, MenuItem } from '@mui/material';
import EditNote from './EditNote';

const Question = ({ question }) => {
    const [showNotes, setShowNotes] = useState(false);
    const handleClick = () => {
        setShowNotes(prevShowNotes => !prevShowNotes);
    }

    const [state, setState] = useState(question);
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    return (
        <Grid container spacing={1} alignItems="center" marginBottom="10px">
            <Grid item xs={6}>
                <a href={question.url} target='_blank' rel="noreferrer">{question.name}</a>
            </Grid>
            <Grid item xs={2}>
                <TextField
                    select
                    id="difficulty"
                    name="difficulty"
                    value={state.difficulty}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    sx={{ backgroundColor: "white", borderRadius: "4px" }}
                >
                    <MenuItem value="Easy">Easy</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Hard">Hard</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={2}>
                <TextField
                    select
                    id="status"
                    name="status"
                    value={state.status}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                >
                    <MenuItem value="Not Attempted">Todo</MenuItem>
                    <MenuItem value="Revise">Revise</MenuItem>
                    <MenuItem value="Done">Done</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={2}>
                <Button variant="outlined" fullWidth onClick={handleClick}>{question.notes === '' ? 'Add Notes' : 'Show Notes'}</Button>
            </Grid>
            {
                showNotes && <Grid item xs={12}>
                    <EditNote question={question} />
                </Grid>
            }
        </Grid>
    )
}

export default Question;
