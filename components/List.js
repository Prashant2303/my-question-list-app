import React from 'react';
import { CircularProgress, Grid, Paper } from '@mui/material';
import Question from './Question';
import { useRecoilState } from 'recoil';
import { stateQuestions } from 'store/atoms';

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
        <Paper className="form" elevation={3} sx={{ padding: '15px', marginTop: '10px' }}>
            <Grid container spacing={1} paddingBottom="10px" marginBottom="10px" sx={{ textAlign: 'center', borderBottom: '1px solid lightgrey' }}>
                <Grid item xs={5.5}>Name</Grid>
                <Grid item xs={2}>Difficulty</Grid>
                <Grid item xs={2}>Status</Grid>
                <Grid item xs={2}>Action</Grid>
                <Grid item xs={0.5}></Grid>
            </Grid>
            {
                loading ? renderLoading()
                    : !questions || questions.length === 0 ? renderNoQuestions()
                        : questions.map((question, index) => <Question key={question.id} index={index} question={question} />)
            }
        </Paper>
    )
}

export default List;