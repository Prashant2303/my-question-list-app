import { Container, Paper } from "@mui/material";
import { connectToDatabase } from "helpers/db";
import { ObjectId } from "mongodb";

export default function PublicListDetails({ list }) {
    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ 'padding': '15px', 'marginTop': '10px' }}>
                <div>{list.name} by {list.ownerName}</div>
                {
                    list.questions.map(question => (
                        <div key={question.id}>{question.name}</div>
                    ))
                }
            </Paper>
        </Container>
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