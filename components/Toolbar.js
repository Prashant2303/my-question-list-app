import React from "react";
import { Button, Grid, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { useHooks } from "service/apiCalls";

const Toolbar = () => {

    const hooks = useHooks();
    const [query, setQuery] = useState('');

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
    }

    return (
        <Paper elevation={3} sx={{ 'marginTop': '10px', "padding": '10px' }}>
            <Grid container spacing={1}>
                {/* <Grid item>
                    <Button value="Todo" size="small" variant="contained" onClick={(e) => hooks.filter('status', e)}>
                        Easy
                    </Button>
                </Grid> */}
                <Grid item>
                    <TextField variant='outlined' label='Search' value={query} onChange={handleQuery} InputProps={{ onKeyDown: handleKeyDown }} size='small' name='query' />
                </Grid>
                <Grid item>
                    <Button size="small" variant="text" onClick={handleReset}>
                        Reset
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default React.memo(Toolbar);