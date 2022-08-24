import styles from 'styles/Question.module.css';
import { useRef, useState } from 'react';
import { Grid, TextField, Button, MenuItem, IconButton, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNote from './EditNote';
import CustomModal from './CustomModal';
import { useHooks } from 'service/apiCalls';
import { Transition } from 'react-transition-group';

const Question = ({ index, question }) => {

    const hooks = useHooks();
    const [state, setState] = useState(question);
    const [showNotes, setShowNotes] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [loadingDifficulty, setLoadingDifficulty] = useState(false);
    const nameRef = useRef();
    const anchorRef = useRef();

    const handleChange = async (e) => {

        if (e.target.name === 'status') {
            setLoadingStatus(true);
        } else {
            setLoadingDifficulty(true);
        }

        const result = await hooks.updateQuestion(state.id, e.target.name, e.target.value);
        if (result) setState({ ...state, [e.target.name]: e.target.value });

        if (e.target.name === 'status') {
            setLoadingStatus(false);
        } else {
            setLoadingDifficulty(false);
        }
    }

    const handleDelete = async () => {
        closeModal();
        setLoadingDelete(true);
        await hooks.deleteQuestion(state.id);
        setLoadingDelete(false);
    }

    const handleClick = () => {
        setShowNotes(prevShowNotes => !prevShowNotes);
    }

    const difficultyColor = () => {
        if (state.difficulty === 'Easy') return "#bbfcc5";
        if (state.difficulty === 'Medium') return "#c7f2fc";
        if (state.difficulty === 'Hard') return "#fabebe";
    }

    const statusColor = () => {
        if (state.status === 'Done') return "#bbfcc5";
        if (state.status === 'Revise') return "#c7f2fc";
        if (state.status === 'Todo') return "#fabebe";
    }

    const disableTooltip = () => {
        const textWidth = anchorRef.current?.offsetWidth;
        const containerWidth = nameRef.current?.offsetWidth;
        return textWidth < containerWidth ? true : false
    }

    const [modalState, setModalState] = useState(false);
    const openModal = () => setModalState(true);
    const closeModal = () => setModalState(false);

    const renderQuestion = () => (
        <>
            <Grid item className={styles.name} xs={12} sm={6.4} ref={nameRef}>
                <Tooltip title={state.name} placement='top-start' disableHoverListener={disableTooltip()} >
                    <a href={state.url} target='_blank' ref={anchorRef} rel="noreferrer">{index + 1}{'. '}{state.name}</a>
                </Tooltip>
            </Grid>
            <Grid item xs={4} sm={1.7} >
                <TextField
                    select
                    id="difficulty"
                    name="difficulty"
                    value={state.difficulty}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    disabled={loadingDifficulty}
                    sx={{ backgroundColor: difficultyColor(), borderRadius: "4px" }}
                >
                    <MenuItem value="Easy">Easy</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Hard">Hard</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={4} sm={1.7} >
                <TextField
                    select
                    id="status"
                    name="status"
                    value={state.status}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    disabled={loadingStatus}
                    sx={{ backgroundColor: statusColor(), borderRadius: "4px" }}
                >
                    <MenuItem value="Todo">Todo</MenuItem>
                    <MenuItem value="Revise">Revise</MenuItem>
                    <MenuItem value="Done">Done</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={3} sm={1.7} >
                <Button variant="outlined" fullWidth onClick={handleClick}>{showNotes ? 'Hide' : state.notes === '' ? 'Add' : 'View'}</Button>
            </Grid>
            <Grid item className={styles.delete} xs={1} sm={0.5} >
                <CustomModal
                    open={modalState}
                    closeModal={closeModal}
                    passedFunction={handleDelete}
                    content={{
                        'header': 'Delete this question ?',
                        'body': 'This action is not reversible.'
                    }}
                >
                    <IconButton disabled={loadingDelete} color='error' onClick={openModal}>
                        <DeleteForeverIcon />
                    </IconButton>
                </CustomModal>
            </Grid>
        </>
    )

    const duration = 300;

    const defaultStyle = {
        transition: `all ${duration}ms linear`,
    }

    const transitionStyles = {
        entering: {
            opacity: 0,
            marginTop: '0px',
        },
        entered: {
            opacity: 1,
            marginTop: '0px'
        },
        exiting: {
            opacity: 0,
            marginTop: '-10px',
        },
        exited: {
            opacity: 0,
            marginTop: '-10px',
        },
    };

    const renderNote = () => (
        <Transition in={showNotes} timeout={duration} mountOnEnter unmountOnExit>
            {animationstate => (
                <Grid item xs={12} style={{
                    ...defaultStyle,
                    ...transitionStyles[animationstate],
                }}>
                    <EditNote question={state} setState={setState} />
                </Grid>
            )}
        </Transition>
    )

    return (
        <Grid container className={styles.question} spacing={1} alignItems="center">
            {renderQuestion()}
            {renderNote()}
        </Grid>
    )
}

export default Question;
