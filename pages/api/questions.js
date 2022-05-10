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
            const newQuestion = {           //create question body
                id: Date.now(),
                url: 'https://leetcode.com/problems/two-sum/',
                site: 'Leetcode',
                name: question,
                difficulty: 'Easy',
                status: 'Done',
                notes: '',
            }
            questions.unshift(newQuestion); //add question at beginning of array
            res.status(200).json(questions);//return new Questions array
            break;
        }
    }
}