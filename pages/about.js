import styles from '../styles/Index.module.css';
import { Container, Paper } from '@mui/material';

export default function About() {
    return (
        <Container className={styles.App} maxWidth="md">
            <Paper className="form" elevation={3} sx={{ padding: '15px', marginTop: '15px' }}>
                <h1>About</h1>
                <div>
                    MyQuestionList is your personal notebook for coding questions where users can create an account add URLs to any question you want
                    and set its Difficulty, Status and Category according to you. Users can also add/update notes for any question.
                    It features filter and search functionality as well. All this can be achieved using a simple and easy to use 
                    interface with the fewest clicks possible. <br />
                    Built using :- Next.js, Recoil, MUI and MongoDB <br />
                    Deployed on :- Vercel
                </div>
            </Paper>
        </Container>
    )
}