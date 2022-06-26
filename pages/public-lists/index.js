import styles from 'styles/PublicLists.module.css';
import { Paper, Grid, Typography } from "@mui/material";
import { connectToDatabase } from 'helpers/db';
import Link from 'next/link';

export default function PublicLists({ data }) {

    const ListItem = (list) => (
        <Grid className={styles.listItem} container key={list._id}>
            <Grid item xs={8}>
                <Link href={`/public-lists/${list._id}`}>
                    {list.name}
                </Link>
            </Grid>
            <Grid className={styles.ownerName} item xs={4}>
                {list.ownerName}
            </Grid>
        </Grid>
    )

    return (
        <Paper className={styles.container} elevation={3}>
            <Typography variant="h6" component="div">
                Public Lists
            </Typography>
            {!data || data?.length === 0 ?
                <div className={styles.emptyList}>No Public Lists</div> :
                <>
                    <Grid container className={styles.rowHeadings}>
                        <Grid item xs={8}>Title</Grid>
                        <Grid item xs={4}>Author</Grid>
                    </Grid>
                    {data.map(list => ListItem(list))}
                </>
            }
        </Paper>
    )
}

export async function getStaticProps() {
    try {
        const { listsCollection } = await connectToDatabase();
        const cursor = await listsCollection.find({ access: 'Public' }).project({ questions: 0 });
        const lists = await cursor.toArray();
        const data = JSON.parse(JSON.stringify(lists));
        return {
            props: {
                data
            },
            revalidate: 60
        }
    } catch (err) {
        console.log(err);
        const data = [];
        return {
            props: {
                data
            },
            revalidate: 60
        }
    }
}