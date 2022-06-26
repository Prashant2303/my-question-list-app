import styles from 'styles/PublicList.module.css';
import { Paper, Grid, Typography } from "@mui/material";
import { connectToDatabase } from "helpers/db";
import { ObjectId } from "mongodb";
import PublicQuestion from "components/PublicQuestion";

export default function PublicListDetails({ list }) {

    return (
        <Paper className={styles.container} elevation={3}>
            <Typography variant="h6" component="div">
                {list.name} by {list.ownerName}
            </Typography>
            <Grid container className={styles.rowHeadings}>
                <Grid item xs={8} sm={9.5}>Name</Grid>
                <Grid item xs={2.5} sm={1.5}>Difficulty</Grid>
                <Grid item xs={1.5} sm={1} textAlign="center">Notes</Grid>
            </Grid>
            <Grid container>
                {list.questions.map(question => (
                    <PublicQuestion key={question.id} question={question} />
                ))}
            </Grid>
        </Paper>
    )
}

export async function getStaticPaths() {
    const { listsCollection } = await connectToDatabase();
    const cursor = await listsCollection.find({ access: 'Public' }).project({ _id: 1 });
    const lists = await cursor.toArray();
    const data = JSON.parse(JSON.stringify(lists));
    const paths = data.map(list => {
        return {
            params: {
                listId: `${list._id}`
            }
        }
    })
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const { listId } = context.params;
    const { listsCollection } = await connectToDatabase();
    const result = await listsCollection.findOne({ _id: ObjectId(listId), access: 'Public' }, { projection: { ownerId: 0 } });
    const data = JSON.parse(JSON.stringify(result));
    return {
        props: {
            list: data
        },
        revalidate: 60
    }
}