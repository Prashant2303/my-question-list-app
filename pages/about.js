import styles from '../styles/Index.module.css';
import { Container, Paper } from '@mui/material';

export default function About() {
    return (
        <Container className={styles.App} maxWidth="md">
            <Paper className="form" elevation={3} sx={{ padding: '15px', marginTop: '15px' }}>
                <h1>About</h1>
                <div>
                    MyQuestionList is your personal question diary where you can add links to questions you want and set its difficulty and status according to you.
                    You can also add/update notes for any question. All this can be achieved using a simple and easy to use interface with the fewest clicks possible.
                </div>
            </Paper>
        </Container>
    )
}