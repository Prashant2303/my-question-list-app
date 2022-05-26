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
    console.log('In apiCalls ', data);
    return data;
};

export const deleteQuestion = async (questionId) => {
    const response = await fetch(`/api/questions/${questionId}`, {
        method: 'DELETE'
    });

    const data = await response.json();
    console.log('In apiCalls', data);
    return data;
};