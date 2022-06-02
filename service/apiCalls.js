import { v4 as uuidv4 } from 'uuid';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { stateUser, stateQuestions, stateShouldFetch } from 'store/atoms';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export const useHooks = () => {

    const router = useRouter();
    const [user, setUser] = useRecoilState(stateUser);
    const [questions, setQuestions] = useRecoilState(stateQuestions);
    const [, setShouldFetch] = useRecoilState(stateShouldFetch);

    const resetUser = useResetRecoilState(stateUser);
    const resetQuestions = useResetRecoilState(stateQuestions);
    const resetShouldFetch = useResetRecoilState(stateShouldFetch);

    return { user, redirectIfLoggedIn, signinUsingSession, signin, signup, logout, addQuestion, updateQuestion, deleteQuestion };

    function redirectIfLoggedIn() {
        if (localStorage.getItem('user')) {
            router.push('/');
        }
    }

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
        if (response.ok) {
            const data = await response.json();
            setUser(data);
            setQuestions(data.questions);
        } else {
            logout();
        }
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
        if (response.ok) {
            toast.success('Signin Successful');
            localStorage.setItem('user', JSON.stringify({ id: data.id, email: data.email, token: data.token }));
            setUser(data);
            setQuestions(data.questions);
            setShouldFetch(false);
            router.push('/');
        } else {
            toast.error(data.message);
        }
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
        if (response.ok) {
            toast.success('Signup Successful');
            localStorage.setItem('user', JSON.stringify({ id: data.id, email: data.email, token: data.token }));
            setUser(data);
            setQuestions(data.questions);
            setShouldFetch(false);
            router.push('/');
        } else {
            toast.error(data.message);
        }
    }

    function logout() {
        resetUser();
        resetQuestions();
        resetShouldFetch();
        localStorage.removeItem('user');
        toast.success('Logged out successfully')
        router.push('/signin');
    }

    async function addQuestion(question) {
        question.id = uuidv4();
        question.date = new Date();
        const response = await fetch('/api/questions', {
            method: 'POST',
            body: JSON.stringify({ question }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            setQuestions([data, ...questions]);
            toast.success('Question added');
            return true;
        }
        toast.error('Something went wrong');
        return false;
    }

    async function updateQuestion(questionId, field, value) {
        const response = await fetch(`/api/questions/${questionId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                [field]: value
            }),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        })
        if (response.ok) {
            toast.success('Updated Successfully');
            return true;
        }
        toast.error('Something went wrong');
        return false;
    }

    async function deleteQuestion(questionId) {
        const response = await fetch(`/api/questions/${questionId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        });
        if (response.ok) {
            const newList = questions.filter(question => question.id !== questionId)
            setQuestions(newList);
            toast.success('Deleted Successfully');
            return true;
        }
        toast.error('Something went wrong');
        return false;
    }
}