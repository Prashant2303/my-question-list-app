import React from "react";
import { Button, Grid, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { useHooks } from "service/apiCalls";

const Toolbar = () => {

    const categories = ['All', 'Array', 'Linked List', 'Binary Tree', 'Binary Search Tree', 'Tree', 'Heap', 'Stack', 'Matrix', 'String', 'Queue', 'Graph', 'Trie', 'Others'];
    const initialState = {
        difficulty: 'All',
        status: 'All',
        category: 'All',
    }

    const hooks = useHooks();
    const [query, setQuery] = useState('');
    const [state, setState] = useState(initialState);

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
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
        setState(initialState);
    }

    return (
        <Paper elevation={3} sx={{ 'marginTop': '10px', "padding": '15px' }}>
            <Grid container spacing={1} alignItems="center">
                <Grid item xs={4} sm={2.5}>
                    <TextField
                        select
                        name="difficulty"
                        value={state.difficulty}
                        label="Difficulty"
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        SelectProps={{
                            native: true
                        }}
                    >
                        <option value="All">All</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </TextField>
                </Grid>
                <Grid item xs={4} sm={2.5}>
                    <TextField
                        select
                        name="status"
                        value={state.status}
                        label="Status"
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        SelectProps={{
                            native: true
                        }}
                    >
                        <option value="All">All</option>
                        <option value="Done">Done</option>
                        <option value="Revise">Revise</option>
                        <option value="Todo">Todo</option>
                    </TextField>
                </Grid>
                <Grid item xs={4} sm={2.5}>
                    <TextField
                        select
                        name="category"
                        value={state.category}
                        label="Category"
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        SelectProps={{
                            native: true
                        }}
                    >
                        {categories.sort().map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={8} sm={3.5}>
                    <TextField
                        name='query'
                        variant='outlined'
                        size='small'
                        label='Search'
                        fullWidth
                        value={query}
                        onChange={handleQuery}
                        InputProps={{ onKeyDown: handleKeyDown }}
                    />
                </Grid>
                <Grid item xs={4} sm={1} textAlign="center">
                    <Button
                        size="small"
                        variant="text"
                        fullWidth
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default React.memo(Toolbar);