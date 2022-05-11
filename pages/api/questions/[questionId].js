import { questions } from "../../../data/questions";

export default function handler(req, res) {
    const method = req.method;
    switch (method) {
        // case 'GET': {
        //     res.status(200).json(questions);
        //     break;
        // };
        // case 'POST': {
        //     const { question } = req.body;  //get question from req
        //     questions.unshift(question);    //add question at beginning of array
        //     res.status(200).json(question);//return question
        //     break;
        // };
        // case 'DELETE': {
        //     const { questionId } = JSON.parse(req.body);    //req.body is coming as string
        //     console.log('Qid', questionId);
        //     const toDelete = questions.find((question) => question.id === questionId)
        //     if (!toDelete)
        //     res.status(404).json({ 'message': "Item doesn't exist" })
        //     else {
        //         const index = questions.findIndex(question => question.id === questionId);
        //         questions.splice(index, 1);
        //         res.status(200).json({ message: 'Deleted Succesfully' });
        //     }
        //     break;
        // }
        case 'PATCH': {
            const { questionId } = req.query;
            console.log(req.body);
            console.log('QID', questionId);
            res.status(200).json({ 'message': "Got it" })
        }
    }
}