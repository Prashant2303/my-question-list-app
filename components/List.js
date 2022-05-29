import React from 'react';
import { CircularProgress, Grid, Paper } from '@mui/material';
import Question from './Question';
import { useRecoilState } from 'recoil';
import { stateQuestions } from '../atom';

const List = ({ loading }) => {

    const [questions,] = useRecoilState(stateQuestions);

    const renderLoading = () => {
        return (
            <div style={{ 'display': 'flex', 'justifyContent': 'center' }}>
                <CircularProgress />
            </div>
        )
    }

    const renderNoQuestions = () => {
        return <div style={{ 'textAlign': 'center' }}>No Questions</div>
    }
    
    return (
        <Paper className="form" elevation={3} sx={{ padding: '15px', marginTop: '15px' }}>
            <Grid container spacing={1} alignItems="center" marginBottom="10px">
                <Grid item xs={6}>Name</Grid>
                <Grid item xs={2}>Difficulty</Grid>
                <Grid item xs={2}>Status</Grid>
                <Grid item xs={2}>Action</Grid>
            </Grid>
            {
                loading ? renderLoading()
                    : !questions || questions.length === 0 ? renderNoQuestions()
                        : questions.map((question) => <Question key={question.id} question={question} />)
            }
        </Paper>
    )
}

export default List;