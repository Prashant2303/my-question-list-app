import { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const EditNote = ({ question }) => {

    const [note, setNote] = useState(question.notes);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setNote(e.target.value);
    }

    const handleSubmit = async () => {
        setLoading(true);
        const response = await fetch(`/api/questions/${question.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                notes: note
            }),
            headers: {
                'Content-type': 'application/json',
            },
        })
        const data = await response.json();
        console.log('DATA', data);
        question.notes = note;
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