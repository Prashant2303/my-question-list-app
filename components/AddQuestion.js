import React, { useState } from 'react';
import { Grid, TextField, Button, Paper, MenuItem } from '@mui/material';

const AddQuestion = ({addQuestion}) => {

    const difficulties = ['Easy', 'Medium', 'Hard'];
    const statuses = ['Todo', 'Revise', 'Done'];
    const initialState = {
        'url': '',
        'site': '',
        'name': '',
        'difficulty': 'Medium',
        'status': 'Revise',
        'notes': ''
    };
    const initialErrors = {
        'url': false,
        'name': false
    };

    const [state, setState] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);

    const handleUrlChange = (e) => {
        setErrors({ ...errors, [e.target.name]: false })
        try {
            const url = new URL(e.target.value);
            setState({
                ...state,
                [e.target.name]: e.target.value,
                name: url.pathname.substring(10),
                site: url.hostname
            });
        } catch (err) {
            setState({
                ...state,
                url: e.target.value
            })
            setErrors({ ...errors, [e.target.name]: true })
        }
    }

    const handleChange = (e) => {
        if (e.target.name === 'name') {
            setErrors({ ...errors, [e.target.name]: false })
            if (e.target.value.trim() === '')
                setErrors({ ...errors, [e.target.name]: true })
        }
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        if (errors.url || errors.name)
            alert('Please fill all required fields');
        else
        {   
            addQuestion(state);
            setState(initialState);
        }
    }

    return (
        // <Grid item>
        <Paper className="form" elevation={3} sx={{ padding: '15px' }}>
            <Grid container spacing={2}>    {/* Adding xs and spacing together causes component to shift left */}
                <Grid item xs={6}>
                    <TextField
                        id="url"
                        name="url"
                        label="URL"
                        variant="outlined"
                        placeholder="e.g - https://leetcode.com/problems/basic-calculator-ii/"
                        fullWidth
                        value={state.url}
                        onChange={handleUrlChange}
                        required
                        size="small"
                        error={errors.url}
                        helperText={errors.url ? "Invalid URL" : null}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="name"
                        name="name"
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={state.name}
                        onChange={handleChange}
                        required
                        size="small"
                        error={errors.name}
                        helperText={errors.name ? "Required" : null}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="difficulty"
                        name="difficulty"
                        select
                        label="Difficulty"
                        value={state.difficulty}
                        onChange={handleChange}
                        fullWidth
                        required
                        size="small"
                    >
                        {difficulties.map((option) => (
                            <MenuItem id={option} key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="status"
                        name="status"
                        select
                        label="Status"
                        value={state.status}
                        onChange={handleChange}
                        fullWidth
                        required
                        size="small"
                    >
                        {statuses.map((option) => (
                            <MenuItem id={option} key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="notes"
                        name="notes"
                        label="Notes (Optional)"
                        multiline
                        value={state.notes}
                        onChange={handleChange}
                        fullWidth
                        // margin="normal"
                        size="small"
                    />
                </Grid>
                <Grid item direction="row-reverse" xs={12} sx={{ display: 'flex' }}>
                    <Button variant="contained" disableElevation type="submit" onClick={handleSubmit}>Add Question</Button>
                </Grid>
            </Grid>
        </Paper>
        // </Grid>
    )
}

export default AddQuestion;