import { useState } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useHooks } from 'service/apiCalls';

function getDate(ISODate) {
    const date = new Date(ISODate);
    return `Added: ${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
}

const EditNote = ({ question, setState }) => {

    const hooks = useHooks();
    const [note, setNote] = useState(question.notes);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setNote(e.target.value);
    }

    const handleSubmit = async () => {
        setLoading(true);
        const data = await hooks.updateQuestion(question.id, 'notes', note)
        if (data) setState({ ...question, 'notes': note });
        setLoading(false);
    }

    return (
        <Grid container justifyContent="flex-end">
            <TextField
                id="notes"
                name="notes"
                placeholder="Add Notes"
                multiline
                fullWidth
                onChange={handleChange}
                value={note}
            />
            <Grid container justifyContent="space-between" alignItems="center">
                <Typography variant='subtitle2' sx={{ margin: '10px 0 0 14px' }}>{getDate(question.date)}</Typography>
                <LoadingButton
                    loading={loading}
                    variant="contained"
                    disableElevation
                    type="submit"
                    disabled={note === question.notes}
                    onClick={handleSubmit}
                    sx={{ marginTop: '10px' }}
                >
                    Save
                </LoadingButton>
            </Grid>
        </Grid>
    )
}

export default EditNote;