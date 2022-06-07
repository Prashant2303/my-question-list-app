import React from "react";
import { Button, Grid, Paper, TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import { useHooks } from "service/apiCalls";

const Toolbar = () => {

    const hooks = useHooks();
    const [query, setQuery] = useState('');
    const [difficulty, setDifficulty] = useState('All');
    const [status, setStatus] = useState('All');

    const handleDifficulty = (e) => {
        setDifficulty(e.target.value);
        hooks.filter(e);
    }

    const handleStatus = (e) => {
        setStatus(e.target.value);
        hooks.filter(e);
    }

    const handleQuery = (e) => {
        setQuery(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            hooks.search(query);
        }
    }

    const handleReset = () => {
        hooks.reset();
        setQuery('');
        setDifficulty('All');
        setStatus('All');
    }

    return (
        <Paper elevation={3} sx={{ 'marginTop': '10px', "padding": '15px' }}>
            <Grid container spacing={1} alignItems="center">
                <Grid item xs={3}>
                    <TextField
                        select
                        name="difficulty"
                        value={difficulty}
                        label="Difficulty"
                        onChange={handleDifficulty}
                        fullWidth
                        size="small"
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Easy">Easy</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Hard">Hard</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        select
                        name="status"
                        value={status}
                        label="Status"
                        onChange={handleStatus}
                        fullWidth
                        size="small"
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Done">Done</MenuItem>
                        <MenuItem value="Revise">Revise</MenuItem>
                        <MenuItem value="Todo">Todo</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        name='query'
                        variant='outlined'
                        size='small'
                        label='Search'
                        value={query}
                        onChange={handleQuery}
                        InputProps={{ onKeyDown: handleKeyDown }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Button size="small" variant="text" onClick={handleReset}>
                        Reset
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default React.memo(Toolbar);