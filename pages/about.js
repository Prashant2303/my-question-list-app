import { Paper } from '@mui/material';

export default function About() {
    return (
        <Paper className="form" elevation={3} sx={{ padding: '15px', marginTop: '10px' }}>
            <h1>About</h1>
            <div>
                MyQuestionList is your personal notebook for coding questions where users can create an account and create multiple lists and users can set those lists to be publicly accessible. Users can add URLs to any question you want
                and set its Difficulty, Status and Category according to you. Users can also add/update notes for any question.
                It features filter and search functionality as well. All this can be achieved using a simple and easy to use
                interface with the fewest clicks possible. <br /><br />
                Built using :- Next.js, Recoil, MUI and MongoDB <br />
                Deployed on :- Vercel
            </div>
        </Paper>
    )
}