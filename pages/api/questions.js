import { questions } from "../../data/questions";

export default function handler(req, res) {
    const method = req.method;
    switch (method) {
        case 'GET': {
            res.status(200).json(questions);
            break;
        };
        case 'POST': {
            const { question } = req.body;  //get question from req
            questions.unshift(question);    //add question at beginning of array
            res.status(200).json(question);//return question
            break;
        }
    }
}