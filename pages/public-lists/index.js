import styles from 'styles/PublicLists.module.css';
import { Paper, Grid, Typography, TextField, Button } from "@mui/material";
import Fuse from 'fuse.js';
import Link from 'next/link';
import { useState } from 'react';
import { base_url } from 'service/apiCalls';

export default function PublicLists({ data }) {

    const ListItem = (list, index) => (
        <Grid className={styles.listItem} container key={list._id}>
            <Grid item xs={8}>
                {index + 1}.{' '}
                <Link href={`/public-lists/${list._id}`}>
                    {list.name}
                </Link>
            </Grid>
            <Grid className={styles.ownerName} item xs={4}>
                {list.ownerName}
            </Grid>
        </Grid>
    )

    const [query, setQuery] = useState('');
    const [filterState, setFilterState] = useState({
        filter: false,
        filteredQuestions: null
    });

    const handleQuery = (e) => setQuery(e.target.value);

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            const listToQuery = filterState.filter ? filterState.filteredQuestions : data;
            const fuse = new Fuse(listToQuery, {
                keys: ['name', 'ownerName']
            })
            const result = fuse.search(query);
            const filtered = result.map(item => item.item);
            setFilterState({
                filter: true,
                filteredQuestions: filtered
            })
        }
    }

    const handleReset = () => {
        setQuery('');
        setFilterState({
            filter: false,
            filteredQuestions: null
        });
    }

    const renderQuestions = filterState.filter ? filterState.filteredQuestions : data;

    return (
        <Paper className={styles.container} elevation={3}>
            <Typography variant="h6" component="h6">
                Public Lists
            </Typography>
            <Grid container marginTop={1}>
                <Grid item xs={10} sm={7.3}>
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
                <Grid container item xs={2} sm={2}>
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
            <Grid container className={styles.rowHeadings}>
                <Grid item xs={8}>Title</Grid>
                <Grid item xs={4}>Author</Grid>
            </Grid>
            {!renderQuestions || renderQuestions?.length === 0 ?
                <div className={styles.emptyList}>No Public Lists</div> :
                renderQuestions.map((list, index) => ListItem(list, index))}
        </Paper>
    )
}

export async function getStaticProps() {
    try {
        const result = await fetch(`${base_url}/api/public-lists`);
        const data = await result.json();
        return {
            props: {
                data
            },
            revalidate: 60
        }
    } catch (err) {
        return {
            props: {
                data: []
            },
            revalidate: 60
        }
    }
}