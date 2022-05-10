import React from 'react';
import { CircularProgress, Grid, Paper } from '@mui/material';
import Question from './Question';

const List = ({ questions, loading, deleteQuestion }) => {
    return (
        <Paper className="form" elevation={3} sx={{ padding: '15px', marginTop: '15px' }}>
            <Grid container spacing={1} alignItems="center" marginBottom="10px">
                <Grid item xs={6}>Name</Grid>
                <Grid item xs={2}>Difficulty</Grid>
                <Grid item xs={2}>Status</Grid>
                <Grid item xs={2}>Action</Grid>
            </Grid>
            {
                loading ? <div style={{ 'display': 'flex', 'justifyContent': 'center' }}> <CircularProgress /> </div> :
                    questions.map((question) => <Question key={question.id} question={question} deleteQuestion={deleteQuestion} />)
            }
        </Paper>
    )
}

export default List;