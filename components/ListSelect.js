import styles from 'styles/ListSelect.module.css';
import { Paper, MenuItem, TextField, Button, Grid, IconButton } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { statePrivateLists, stateSelectedList, stateUser } from "store/atoms";
import { useState } from 'react';
import CreateList from './CreateList';
import { DeleteForever } from '@mui/icons-material';
import { useHooks } from 'service/apiCalls';
import { LoadingButton } from '@mui/lab';

export default function ListSelect({ loading }) {

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
            <Grid item sm={8}>
                <TextField
                    select
                    name="selectedList"
                    value={selectedList}
                    label="Selected List"
                    onChange={handleChange}
                    fullWidth
                    size="small"
                >
                    {privateLists.map(list =>
                        <MenuItem key={list._id} value={list._id} >
                            {list.name} {list._id === user.defaultList ? '(Default)' : null} ({list.access})
                        </MenuItem>)}
                </TextField>
            </Grid>
            <Grid item sm={2}>
                <LoadingButton
                    variant="contained"
                    disableElevation
                    onClick={changeAccess}
                    size="medium"
                    loading={changing}
                    sx={{ 'textTransform': 'none', 'backgroundColor': '#1877f2' }}
                >
                    {listAccess === 'Private' ? 'Set as Public' : 'Set as Private'}
                </LoadingButton>
            </Grid>
            <Grid item sm={0.5}>
                <IconButton disabled={deleting} color='error' onClick={handleDelete}>
                    <DeleteForever />
                </IconButton>
            </Grid>
            <Grid item sm={1.5}>
                <Button size="small" onClick={() => setShowCreate(!showCreate)}>Create</Button>
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