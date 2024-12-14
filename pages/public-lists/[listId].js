import styles from 'styles/PublicList.module.css';
import { Paper, Grid, Typography, TextField, Button } from "@mui/material";
import PublicQuestion from "components/PublicQuestion";
import Fuse from 'fuse.js';
import { useState } from 'react';
import { base_url } from 'service/apiCalls';

export default function PublicListDetails({ list }) {

    const categories = ['All', 'Array', 'Linked List', 'Binary Tree', 'Binary Search Tree', 'Tree', 'Heap', 'Stack', 'Matrix', 'String', 'Queue', 'Graph', 'Trie', 'Others'];
    const initialState = {
        difficulty: 'All',
        status: 'All',
        category: 'All',
    }

    const [query, setQuery] = useState('');
    const [state, setState] = useState(initialState);
    const [filterState, setFilterState] = useState({
        filter: false,
        filteredQuestions: null
    });

    const [filters, setFilters] = useState({});
    console.log('FILTERS', filters);

    const handleChange = (e) => {
        const { name, value } = e.target;

        const newFilters = { ...filters };

        if (value === "All") {
            delete newFilters[name];
        } else {
            newFilters[name] = value;
        }

        // Filter on parameters
        const filtered = list.questions.filter(question => {
            let flag = true;
            for (const key in newFilters) {
                if (question[key] !== newFilters[key]) {
                    flag = false;
                    break;
                }
            }
            return flag;
        })

        // Set Result
        setQuery('');
        setFilterState({
            filter: true,
            filteredQuestions: filtered
        })
        setFilters(newFilters);
        setState({ ...state, [name]: value });
    }

    const handleQuery = (e) => {
        setQuery(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            const listToQuery = filterState.filter ? filterState.filteredQuestions : list.questions;
            const fuse = new Fuse(listToQuery, {
                keys: ['name']
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
        setState(initialState);
        setFilterState({
            filter: false,
            filteredQuestions: null
        });
        setFilters({});
    }

    const renderQuestions = filterState.filter ? filterState.filteredQuestions : list.questions;

    const renderFilters = () => (
        <Grid container spacing={1} marginTop={1}>
            <Grid item xs={6} sm={3}>
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
            <Grid item xs={6} sm={3}>
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
            <Grid item xs={9} sm={4.9}>
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
            <Grid container item xs={3} sm={1.1} alignItems="center" textAlign="center">
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
    )

    const renderEmptyList = () => {
        return <div className={styles.emptyList}>No Questions</div>
    }

    return (
        <Paper className={styles.container} elevation={3}>
            <Typography variant="h6" component="div">
                {list.name} by {list.ownerName}
            </Typography>
            {renderFilters()}
            <Grid container className={styles.rowHeadings}>
                <Grid item xs={7.9} sm={9.5}>Name</Grid>
                <Grid item xs={2.6} sm={1.5}>Difficulty</Grid>
                <Grid item xs={1.5} sm={1} textAlign="center">Notes</Grid>
            </Grid>
            <Grid container gap={'10px'}>
                {renderQuestions.length === 0 ? renderEmptyList()
                    : renderQuestions.map(question => (
                        <PublicQuestion key={question.id} question={question} />
                    ))}
            </Grid>
        </Paper>
    )
}

export async function getStaticPaths() {
    const res = await fetch(`${base_url}/api/public-lists`);
    const data = await res.json();
    const paths = data.map(list => {
        return {
            params: {
                listId: list._id
            }
        }
    })

    return {
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps({ params }) {
    const { listId } = params;
    const res = await fetch(`${base_url}/api/public-lists/${listId}`);
    const data = await res.json();

    return {
        props: {
            list: data
        },
        revalidate: 60
    }
}