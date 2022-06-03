import React, { useState } from 'react';
import { Grid, TextField, Paper, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useHooks } from 'service/apiCalls';

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
        'url': '',
        'name': ''
    };

    const hooks = useHooks();
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(initialErrors);

    const handleUrlChange = (e) => {
        setErrors({ url: '', name: '' })
        try {
            const url = new URL(e.target.value);
            setState({
                ...state,
                url: e.target.value,
                name: url.pathname.substring(10),
                site: url.hostname
            });
        } catch (err) {
            setState({
                ...state,
                url: e.target.value
            })
            setErrors({ ...errors, url: 'Invalid URL' })
        }
    }

    const handleChange = (e) => {
        if (e.target.name === 'name') {
            setErrors({ ...errors, name: '' })
            if (e.target.value.trim() === '')
                setErrors({ ...errors, name: 'Required' })
            if (e.target.value.trim().length > 100)
                setErrors({ ...errors, name: 'Must be less than 100 characters' })
        }
        setState({ ...state, [e.target.name]: e.target.value });
    }


    const handleSubmit = async () => {
        if (!state.url.length || !state.name.length) {
            if (state.name.length) {
                setErrors({ ...errors, url: 'Required' })
            } else if (state.url.length) {
                setErrors({ ...errors, name: 'Required' })
            } else {
                setErrors({ url: 'Required', name: 'Required' })
            }
        } else {
            setLoading(true);
            const result = await hooks.addQuestion(state);
            if (result) {
                setState(initialState);
            }
            setLoading(false);
        }
    }

    return (
        <Paper className="form" elevation={3} sx={{ padding: '15px', marginTop: '10px' }}>
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
                        error={!!errors.url}
                        helperText={errors.url}

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
                        error={!!errors.name}
                        helperText={errors.name}
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