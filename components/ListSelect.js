import styles from 'styles/ListSelect.module.css';
import { Paper, MenuItem, TextField, Button, Grid, IconButton } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { statePrivateLists, stateSelectedList, stateUser } from "store/atoms";
import { useState } from 'react';
import CreateList from './CreateList';
import { DeleteForever } from '@mui/icons-material';
import { useHooks } from 'service/apiCalls';
import { LoadingButton } from '@mui/lab';

export default function ListSelect({loading}) {

    const hooks = useHooks();
    const user = useRecoilValue(stateUser);
    const privateLists = useRecoilValue(statePrivateLists);
    const [selectedList, setSelectedlist] = useRecoilState(stateSelectedList);
    const [showCreate, setShowCreate] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [changing, setChanging] = useState(false);
    const listAccess = privateLists?.find(list => list._id === selectedList).access;

    const handleChange = (event) => {
        setSelectedlist(event.target.value);
    };

    const handleDelete = async () => {
        setDeleting(true);
        await hooks.deleteList();
        setDeleting(false);
    };

    const changeAccess = async () => {
        const value = listAccess === 'Private' ? 'Public' : 'Private';
        setChanging(true);
        await hooks.updateList('access', value);
        setChanging(false);
    }

    const renderSelect = () => (
        <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={8}>
                <TextField
                    select
                    name="selectedList"
                    value={selectedList}
                    label="Selected List"
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    disabled={loading}
                >
                    {privateLists.map(list =>
                        <MenuItem key={list._id} value={list._id} >
                            {list.name} {list._id === user.defaultList ? '(Default)' : null} ({list.access})
                        </MenuItem>)}
                </TextField>
            </Grid>
            <Grid item xs={5} sm={2}>
                <LoadingButton
                    variant="text"
                    disableElevation
                    onClick={changeAccess}
                    size="medium"
                    loading={changing}
                >
                    {listAccess === 'Private' ? 'Set as Public' : 'Set as Private'}
                </LoadingButton>
            </Grid>
            <Grid item xs={4} sm={1.2}>
                <Button size="small" onClick={() => setShowCreate(!showCreate)}>Create</Button>
            </Grid>
            <Grid item xs={3} sm={0.8} textAlign="center">
                <IconButton disabled={deleting} color='error' onClick={handleDelete}>
                    <DeleteForever />
                </IconButton>
            </Grid>
        </Grid>
    )

    return (
        <Paper className={styles.listSelect} elevation={3}>
            {!privateLists || privateLists?.length === 0
                ? null : renderSelect()}
            {showCreate ? <CreateList setShowCreate={setShowCreate} /> : null}
        </Paper>
    )
}