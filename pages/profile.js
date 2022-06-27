import { Paper, Typography } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { stateUser } from "store/atoms";

export default function Profile() {
    const user = useRecoilValue(stateUser);
    console.log(user);
    return(
        <Paper elevation={3} sx={{marginTop:'10px', padding:'15px'}}>
            <Typography variant="h6" component="div">
                {user.username}
            </Typography>
            Email : {user.email}
        </Paper>
    )
}