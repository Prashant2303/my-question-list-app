import styles from 'styles/ListSelect.module.css';
import { Paper, MenuItem, TextField } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { statePrivateLists, stateSelectedList } from "store/atoms";

export default function ListSelect({ loading }) {

    const privateLists = useRecoilValue(statePrivateLists);
    const [selectedList, setSelectedlist] = useRecoilState(stateSelectedList);

    const handleChange = (event) => {
        setSelectedlist(event.target.value);
    };

    const renderSelect = () => (
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
    )

    return (
        <Paper className={styles.listSelect} elevation={3}>
            {loading
                ? <div>Loading...</div>
                : !privateLists || privateLists?.length === 0
                    ? <div>Empty List</div>
                    : renderSelect()
            }
        </Paper>
    )
}