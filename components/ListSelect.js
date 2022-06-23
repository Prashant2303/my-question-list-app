import styles from 'styles/ListSelect.module.css';
import { Paper, MenuItem, TextField, Button, Grid, IconButton } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { statePrivateLists, stateSelectedList } from "store/atoms";
import { useState } from 'react';
import CreateList from './CreateList';
import { DeleteForever } from '@mui/icons-material';
import { useHooks } from 'service/apiCalls';

export default function ListSelect({ loading }) {

    const hooks = useHooks();
    const privateLists = useRecoilValue(statePrivateLists);
    const [selectedList, setSelectedlist] = useRecoilState(stateSelectedList);
    const [showCreate, setShowCreate] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleChange = (event) => {
        setSelectedlist(event.target.value);
    };

    const handleDelete = async () => {
        setDeleting(true);
        await hooks.deleteList();
        setDeleting(false);
    };

    const renderSelect = () => (
        <Grid container spacing={1} alignItems="center">
            <Grid item sm={10}>
                <TextField
                    select
                    name="selectedList"
                    value={selectedList}
                    label="Selected List"
                    onChange={handleChange}
                    fullWidth
                    size="small"
                >
                    {privateLists.map(list => <MenuItem key={list._id} value={list._id} >{list.name}</MenuItem>)}
                </TextField>
            </Grid>
            <Grid item sm={1.5}>
                <Button size="small" onClick={() => setShowCreate(!showCreate)}>Create</Button>
            </Grid>
            <Grid item sm={0.5}>
                <IconButton disabled={deleting} color='error' onClick={handleDelete}>
                    <DeleteForever />
                </IconButton>
            </Grid>
        </Grid>
    )

    return (
        <Paper className={styles.listSelect} elevation={3}>
            {loading
                ? <div>Loading...</div>
                : !privateLists || privateLists?.length === 0
                    ? <div>Empty List</div>
                    : renderSelect()
            }
            {showCreate ? <CreateList setShowCreate={setShowCreate} /> : null}
        </Paper>
    )
}