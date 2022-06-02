import { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useHooks } from 'service/apiCalls';

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
            <LoadingButton
                loading={loading}
                variant="contained"
                disableElevation
                type="submit"
                onClick={handleSubmit}
                sx={{ marginTop: '10px' }}
            >
                Save
            </LoadingButton>
        </Grid>
    )
}

export default EditNote;