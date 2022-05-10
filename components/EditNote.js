import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';

const EditNote = ({ question }) => {
    const [note, setNote] = useState(question.notes);
    const handleChange = (e) => {
        setNote(e.target.value);
    }
    const handleSubmit = () => {
        question.notes = note;
    }
    return (
        <Grid container justifyContent="flex-end">
            <TextField
                id="editNote"
                placeholder="Add Notes"
                multiline
                fullWidth
                onChange={handleChange}
                value={note}
            />
            <Button variant="contained" disableElevation type="submit" onClick={handleSubmit} sx={{ marginTop: '10px' }}>Save</Button>
        </Grid>
    )
}

export default EditNote;