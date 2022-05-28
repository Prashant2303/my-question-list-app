import React, { useState } from 'react';
import { Grid, TextField, Paper, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useHooks } from '../apiCalls';

const AddQuestion = () => {

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
    
    const hooks = useHooks();
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
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


    const handleSubmit = async () => {
        if ( errors.url || errors.name || state.url.length === 0 || state.name.length === 0 )
            alert('Please fill all required fields');
        else {
            setLoading(true);
            const data = await hooks.addQuestion(state);
            setState(initialState);
            setLoading(false);
        }
    }

    return (
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
                        size="small"
                    />
                </Grid>
                <Grid item container direction="row-reverse" xs={12} sx={{ display: 'flex' }}>
                    <LoadingButton
                        loading={loading}
                        variant="contained"
                        disableElevation
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Add Question
                    </LoadingButton>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default AddQuestion;