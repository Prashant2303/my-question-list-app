import { useRecoilState, useResetRecoilState } from 'recoil';
import { stateUser, stateQuestions, stateShouldFetch, stateFilter } from 'store/atoms';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Fuse from 'fuse.js';

let params = {};
export const useHooks = () => {

    const router = useRouter();
    const [user, setUser] = useRecoilState(stateUser);
    const [questions, setQuestions] = useRecoilState(stateQuestions);
    const [, setShouldFetch] = useRecoilState(stateShouldFetch);
    const [, setFilter] = useRecoilState(stateFilter);

    const resetUser = useResetRecoilState(stateUser);
    const resetQuestions = useResetRecoilState(stateQuestions);
    const resetShouldFetch = useResetRecoilState(stateShouldFetch);
    const resetFilter = useResetRecoilState(stateFilter);

    return {
        user,
        redirectIfLoggedIn,
        setUserFromSession,
        signin,
        signup,
        logout,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        filter,
        search,
        reset,
        fetchList
    };

    function redirectIfLoggedIn() {
        if (localStorage.getItem('user')) {
            router.replace('/');
        }
    }

    async function setUserFromSession() {
        setUser(JSON.parse(localStorage.getItem('user')));
        setShouldFetch(false);
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
            localStorage.setItem('user', JSON.stringify(data));
            setUser(data);
            setShouldFetch(false);
            router.replace('/');
        } else {
            toast.error(data.message);
        }
    }

    async function fetchList() {
        const response = await fetch(`/api/lists/${user?.defaultList}`)
        const data = await response.json();
        setQuestions(data);
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
            router.replace('/');
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

    function search(query) {
        const fuse = new Fuse(user?.questions, {
            keys: ['name']
        });

        const result = fuse.search(query);
        const filtered = result.map(item => item.item);
        setFilter({
            filter: true,
            filteredQuestions: filtered,
        });
    }

    function filter(e) {
        if (e.target.value === "All") {
            delete params[e.target.name];
        } else {
            params[e.target.name] = e.target.value;
        }

        const filtered = questions.filter((question) => {
            let flag = true;
            for (const key in params) {
                if (question[key] !== params[key]) {
                    flag = false;
                    break;
                }
            }
            return flag;
        });

        setFilter({
            filter: true,
            filteredQuestions: filtered,
        });
    }

    function reset() {
        params = {};
        resetFilter();
    }
}