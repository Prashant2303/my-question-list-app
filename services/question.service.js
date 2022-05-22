export const loginService = async (userCreds) => {
    const response = await fetch('/api/users/signin', {
        method: 'POST',
        body: JSON.stringify({ userCreds }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    return data;
};