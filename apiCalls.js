import { v4 as uuidv4 } from 'uuid';
import { useSetRecoilState } from 'recoil';
import { stateUser, stateQuestions } from './atom';
import { useRouter } from 'next/router';

export const useHooks = () => {
    const setUser = useSetRecoilState(stateUser);
    const setQuestions = useSetRecoilState(stateQuestions);
    const router = useRouter();
    
    return {signin, signup};
    
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
        console.log('SIGNIN HOOK', data);
        setUser(data);
        setQuestions(data.questions);
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
}

export const addQuestion = async (question) => {
    question.id = uuidv4();
    question.date = new Date();
    console.log(question);
    const response = await fetch('/api/questions', {
      method: 'POST',
      body: JSON.stringify({ question }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log('ADD API', data);
    return question;
  }

export const updateQuestion = async (questionId, e) => {
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

export const deleteQuestion = async (questionId) => {
    const response = await fetch(`/api/questions/${questionId}`, {
        method: 'DELETE'
    });

    const data = await response.json();
    console.log('DELETE API', data);
    return data;
};