import styles from 'styles/List.module.css';
import { Container, Paper, Grid } from "@mui/material";
import NavBar from "components/AppBar";

export default function PublicLists({ data }) {
    return (
        <Container maxWidth="md">
            <NavBar />
            <Paper className={styles.list} elevation={3}>
                <Grid container className={styles.headings} spacing={1}>
                    <Grid className={styles.nameHeading} item sm={10}>Title</Grid>
                    <Grid item xs={4} sm={2}>Author</Grid>
                </Grid>
                {data.map(list => <div key={list._id}>{list.name} by {list.ownerName}</div>)}
            </Paper>
        </Container>
    )
}

export async function getStaticProps() {
    const response = await fetch('http://localhost:3000/api/lists/getPublicLists');
    const data = await response.json();
    return {
        props: {
            data
        },
    }
}