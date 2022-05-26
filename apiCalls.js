import { v4 as uuidv4 } from 'uuid';

export const signin = async (userCreds) => {
    // console.log(JSON.stringify(userCreds, null, 2));
    const response = await fetch('/api/users/signin', {
        method: 'POST',
        body: JSON.stringify({ userCreds }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    console.log('SIGNIN API', data);
    return data;
};

export const signup = async (newuser) => {
    const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ newuser }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    console.log('SIGNUP API', data);
    return data;
};

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