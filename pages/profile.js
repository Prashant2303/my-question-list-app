import { Paper, TextField, Typography, MenuItem, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useHooks } from "service/apiCalls";
import { stateUser } from "store/atoms";

export default function Profile() {
    const hooks = useHooks();
    const [user, setUser] = useRecoilState(stateUser);
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [updatingCategory, setUpdatingCategory] = useState(false);
    const [updatingDifficulty, setUpdatingDifficulty] = useState(false);

    const categories = ['Array', 'Linked List', 'Binary Tree', 'Binary Search Tree', 'Tree', 'Heap', 'Stack', 'Matrix', 'String', 'Queue', 'Graph', 'Trie', 'Others'];

    useEffect(() => {
        hooks.redirectIfLoggedOut()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const handleChange = async (e) => {
        const { name, value } = e.target;

        if (name === 'defaultStatus') setUpdatingStatus(true);
        if (name === 'defaultCategory') setUpdatingCategory(true);
        if (name === 'defaultDifficulty') setUpdatingDifficulty(true);

        const updateResult = await hooks.updateUserDetails(name, value);
        if (updateResult) {
            setUser({ ...user, [name]: value })
        }

        if (name === 'defaultStatus') setUpdatingStatus(false);
        if (name === 'defaultCategory') setUpdatingCategory(false);
        if (name === 'defaultDifficulty') setUpdatingDifficulty(false);
    }

    const renderDefaultSelections = () => (
        <Grid container alignItems="center" spacing={1}>
            <Grid item xs={12} padding={1}>
                Default selections :-
            </Grid>
            <Grid item xs={4}>
                <TextField
                    select
                    id="defaultDifficulty"
                    name="defaultDifficulty"
                    label="Difficulty"
                    value={user.defaultDifficulty}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    disabled={updatingDifficulty}
                >
                    <MenuItem value="Easy">Easy</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Hard">Hard</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={4}>
                <TextField
                    select
                    id="defaultStatus"
                    name="defaultStatus"
                    label="Status"
                    value={user.defaultStatus}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    disabled={updatingStatus}
                >
                    <MenuItem value="Todo">Todo</MenuItem>
                    <MenuItem value="Revise">Revise</MenuItem>
                    <MenuItem value="Done">Done</MenuItem>
                </TextField>
            </Grid>
            <Grid item xs={4}>
                <TextField
                    select
                    id="defaultCategory"
                    name="defaultCategory"
                    label="Category"
                    value={user.defaultCategory}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    disabled={updatingCategory}
                >
                    {categories.sort().map((option) => (
                        <MenuItem id={option} key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
        </Grid>
    )

    return (
        user ?
            <Paper elevation={3} sx={{ marginTop: '10px', padding: '15px' }}>
                <Typography variant="h6" component="div">
                    {user?.username}
                </Typography>
                <Grid py={1}>
                    Email : {user?.email}
                </Grid>
                {renderDefaultSelections()}
            </Paper> : null
    )
}