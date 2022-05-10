import { useState } from "react";

export default function Home() {

    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState('');

    const fetchQuestions = async () => {
        setLoading(true);
        const response = await fetch('/api/questions')
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
    }

    const addQuestion = async () => {
        const response = await fetch('/api/questions', {
            method: 'POST',
            body: JSON.stringify({ question }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setQuestions(data);
    }

    return (
        <div>
            <h2>Questions</h2>
            {
                loading ? <div>Loading</div>
                    : questions.map(question => <div key={question.id}>{question.name}</div>)
            }
            <input id="question" type="text" value={question} onChange={e=>setQuestion(e.target.value)} />
            <button onClick={addQuestion}>Add Question</button>
            <button onClick={fetchQuestions}>Get Question</button>
        </div>
    );
}