import React, { useState } from 'react';
import { Grid, TextField, Button, MenuItem, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNote from './EditNote';

const Question = ({ question, deleteQuestion }) => {
    const [showNotes, setShowNotes] = useState(false);
    const handleClick = () => {
        setShowNotes(prevShowNotes => !prevShowNotes);
    }

    const [state, setState] = useState(question);
    const handleChange = async (e) => {
        const response = await fetch(`/api/questions/${question.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                [e.target.name]: e.target.value
            }),
            headers: {
                'Content-type': 'application/json',
            },
        })
        const data = await response.json();
        console.log('DATA', data);
        setState({ ...state, [e.target.name]: e.target.value });
    }

    return (
        <Grid container spacing={1} alignItems="center" marginBottom="10px">
            <Grid item xs={5.5}>
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
                    <MenuItem value="Todo">Todo</MenuItem>
                    <MenuItem value="Revise">Revise</MenuItem>
                    <MenuItem value="Done">Done</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={2}>
                <Button variant="outlined" fullWidth onClick={handleClick}>{question.notes === '' ? 'Add Notes' : 'Show Notes'}</Button>
            </Grid>
            <Grid style={{ 'display': 'flex', 'justifyContent': 'center' }} item xs={0.5}>
                <IconButton color='error' onClick={() => deleteQuestion(question.id)}>
                    <DeleteForeverIcon />
                </IconButton>
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
