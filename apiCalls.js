import { v4 as uuidv4 } from 'uuid';
import { useRecoilState } from 'recoil';
import { stateUser, stateQuestions, stateShouldFetch } from './atom';
import { useRouter } from 'next/router';

export const useHooks = () => {
    const [user, setUser] = useRecoilState(stateUser);
    const [questions, setQuestions] = useRecoilState(stateQuestions);
    const [, setShouldFetch] = useRecoilState(stateShouldFetch);
    const router = useRouter();

    return { signinUsingSession, signin, signup, addQuestion, updateQuestion, deleteQuestion };

    async function signinUsingSession(storedUser) {
        const loggedInUser = JSON.parse(storedUser);
        const { id, token } = loggedInUser;
        const response = await fetch(`/api/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log('SIGNIN SESSION HOOK', data);
        setUser(data);
        setQuestions(data.questions);
    }

    async function signin(userCreds) {
        // console.log(JSON.stringify(userCreds, null, 2));
        const response = await fetch('/api/users/signin', {
            method: 'POST',
            body: JSON.stringify({ userCreds }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify({ id: data.id, token: data.token }));
        console.log('SIGNIN HOOK', data);
        setUser(data);
        setQuestions(data.questions);
        setShouldFetch(false);
        router.push('/');
    }

    async function signup(newuser) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ newuser }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        console.log('SIGNUP HOOK', data);
        setUser(data);
        setQuestions(data.questions);
        router.push('/');
    }

    async function addQuestion(question) {
        question.id = uuidv4();
        question.date = new Date();
        const response = await fetch('/api/questions', {
            method: 'POST',
            body: JSON.stringify({ question }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log('ADD HOOK', data);
        setQuestions([data, ...questions]);
    }

    async function updateQuestion(questionId, e) {
        const response = await fetch(`/api/questions/${questionId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                [e.target.name]: e.target.value
            }),
            headers: {
                'Content-type': 'application/json',
            },
        })
        const data = await response.json();
        console.log('UPDATE API', data);
        return data;
    }

    async function deleteQuestion(questionId) {
        const response = await fetch(`/api/questions/${questionId}`, {
            method: 'DELETE'
        });

        const data = await response.json();
        console.log('DELETE HOOK', data);
        const newList = questions.filter(question => question.id !== questionId)
        setQuestions(newList);
    }
}