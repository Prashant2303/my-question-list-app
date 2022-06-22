import styles from 'styles/ListSelect.module.css';
import { Paper, MenuItem, TextField, Button, Grid } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { statePrivateLists, stateSelectedList } from "store/atoms";
import { useState } from 'react';
import CreateList from './CreateList';

export default function ListSelect({ loading }) {

    const privateLists = useRecoilValue(statePrivateLists);
    const [selectedList, setSelectedlist] = useRecoilState(stateSelectedList);
    const [showCreate, setShowCreate] = useState(false);

    const handleChange = (event) => {
        setSelectedlist(event.target.value);
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
            <Grid item sm={2}>
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