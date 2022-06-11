import styles from 'styles/List.module.css';
import React from 'react';
import { CircularProgress, Grid, Paper } from '@mui/material';
import Question from './Question';
import { useRecoilState } from 'recoil';
import { stateFilter, stateQuestions } from 'store/atoms';
import { Transition, TransitionGroup } from 'react-transition-group';

const List = ({ loading }) => {

    const [questions,] = useRecoilState(stateQuestions);
    const [filterState,] = useRecoilState(stateFilter);

    const renderLoading = () => {
        return (
            <div className={styles.spinner}>
                <CircularProgress />
            </div>
        )
    }

    const renderEmptyList = () => {
        return <div className={styles.emptyList}>No Questions</div>
    }

    const questionsToRender = filterState.filter ? filterState.filteredQuestions : questions;

    const duration = 1000;

    const defaultStyle = {
        transition: `all ${duration}ms linear`,
        opacity: 0,
        maxHeight: '70px',
        marginBottom: '10px',
        overflow: 'hidden'
    }

    const transitionStyles = {
        entering: { opacity: 1, maxHeight: '70px', marginBottom: '10px' },
        entered: { opacity: 1, maxHeight: '70px', marginBottom: '10px' },
        exiting: { opacity: 0, maxHeight: 0, marginBottom: 0 },
        exited: { opacity: 0, maxHeight: 0, marginBottom: 0 },
    };

    const renderQuestions = () => (
        <TransitionGroup>
            {questionsToRender.map((question, index) => (
                <Transition key={question.id} timeout={duration}>
                    {state => (
                        <div style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }}>
                            <Question key={question.id} index={index} question={question} />
                        </div>
                    )}
                </Transition>
            ))}
        </TransitionGroup>
    )

    return (
        <Paper className={styles.list} elevation={3}>
            <Grid container className={styles.headings} spacing={1}>
                <Grid className={styles.nameHeading} item sm={6.4}>Name</Grid>
                <Grid item xs={4} sm={1.7}>Difficulty</Grid>
                <Grid item xs={4} sm={1.7}>Status</Grid>
                <Grid item xs={3} sm={1.7}>Notes</Grid>
                <Grid item xs={1} sm={0.5}></Grid>
            </Grid>
            {
                loading ? renderLoading()
                    : !questionsToRender || questionsToRender.length === 0 ? renderEmptyList()
                        : renderQuestions()
            }
        </Paper>
    )
}

export default List;