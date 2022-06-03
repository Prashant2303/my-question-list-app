import { useRef, useState } from 'react';
import { Grid, TextField, Button, MenuItem, IconButton, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNote from './EditNote';
import { useHooks } from 'service/apiCalls';

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

    return (
        <Grid container spacing={1} alignItems="center" marginBottom="10px">
            <Grid item xs={6.1} ref={nameRef} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <Tooltip title={state.name} placement='top-start' disableHoverListener={disableTooltip()} >
                    <a href={state.url} target='_blank' ref={anchorRef} rel="noreferrer">{index + 1}{'. '}{state.name}</a>
                </Tooltip>
            </Grid>
            <Grid item xs={1.7}>
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
            <Grid item xs={1.7}>
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
            <Grid item xs={2}>
                <Button variant="outlined" fullWidth onClick={handleClick}>{state.notes === '' ? 'Add Notes' : 'Show Notes'}</Button>
            </Grid>
            <Grid style={{ 'display': 'flex', 'justifyContent': 'center' }} item xs={0.5}>
                <IconButton disabled={loadingDelete} color='error' onClick={handleDelete}>
                    <DeleteForeverIcon />
                </IconButton>
            </Grid>
            {
                showNotes && <Grid item xs={12}>
                    <EditNote question={state} setState={setState} />
                </Grid>
            }
        </Grid>
    )
}

export default Question;
