import { Grid, Paper, Typography, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function About() {
    return (
        <Paper className="form" elevation={3} sx={{ padding: '15px', marginTop: '10px' }}>
            <Typography variant="h6" component="div">
                About
            </Typography>
            <p>
                MyQuestionList is your personal notebook for coding questions where users can create multiple lists and can make any of those lists publicly accessible. Users can add URLs to any question they want
                and set its Difficulty, Status and Category according to them. Users can also add/update notes for any question.
                It features filter and search functionality as well. All this can be achieved using a simple and easy to use
                interface with the fewest clicks possible. Changes related to public lists are reflected after a minute.<br /><br />
                Built using :- Next.js, Recoil, MUI and MongoDB <br />
                Deployed on :- Vercel
            </p>
            <Grid container justifyContent="center" my={1}>
                <a target='_blank' rel='noreferrer' href='https://github.com/Prashant2303/mql-extension#readme'>
                    <Button
                        variant="contained"
                        startIcon={<GitHubIcon />}
                        aria-label="To get the extension, visit the Github page which opens in a new window."
                    >
                        Get the extension
                    </Button>
                </a>
            </Grid>
        </Paper>
    )
}