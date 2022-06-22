import { useRecoilState, useResetRecoilState } from 'recoil';
import { stateUser, stateQuestions, stateFilter, statePrivateLists, stateSelectedList } from 'store/atoms';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Fuse from 'fuse.js';

let params = {};
export const useHooks = () => {

    const router = useRouter();
    const [user, setUser] = useRecoilState(stateUser);
    const [questions, setQuestions] = useRecoilState(stateQuestions);
    const [, setFilter] = useRecoilState(stateFilter);
    const [privateLists, setPrivateLists] = useRecoilState(statePrivateLists);
    const [selectedList, setSelectedlist] = useRecoilState(stateSelectedList);

    const resetUser = useResetRecoilState(stateUser);
    const resetQuestions = useResetRecoilState(stateQuestions);
    const resetFilter = useResetRecoilState(stateFilter);
    const resetPrivateLists = useResetRecoilState(statePrivateLists);
    const resetSelectedList = useResetRecoilState(stateSelectedList);

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
        fetchSelectedList,
        fetchPrivateLists,
        createList
    };

    function redirectIfLoggedIn() {
        if (localStorage.getItem('user')) {
            router.replace('/');
        }
    }

    async function setUserFromSession() {
        const sessionUser = JSON.parse(localStorage.getItem('user'));
        setUser(sessionUser);
        setSelectedlist(sessionUser.defaultList);
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
            setSelectedlist(data.defaultList);
            router.replace('/');
        } else {
            toast.error(data.message);
        }
    }

    async function fetchSelectedList() {
        const response = await fetch(`/api/lists/${selectedList}`)
        const data = await response.json();
        setQuestions(data);
    }

    async function fetchPrivateLists() {
        const response = await fetch('api/lists', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        })
        const data = await response.json();
        setPrivateLists(data);
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
            router.replace('/');
        } else {
            toast.error(data.message);
        }
    }

    function logout() {
        resetUser();
        resetQuestions();
        resetPrivateLists();
        resetSelectedList();
        localStorage.removeItem('user');
        toast.success('Logged out successfully')
        router.push('/signin');
    }

    async function createList(listdata) {
        const listBody = {
            ...listdata,
            ownerName: user.username,
        }
        const response = await fetch('/api/lists', {
            method: 'POST',
            body: JSON.stringify({ listBody }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const data = await response.json();
        if (response.ok) {
            setPrivateLists([...privateLists, data]);
            setSelectedlist(data._id);
            return true;
        } else {
            toast.error(data.message);
            return false;
        }
    }

    async function addQuestion(question) {
        const response = await fetch(`/api/questions/${selectedList}`, {
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
        const response = await fetch(`/api/questions/${selectedList}/${questionId}`, {
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
        const response = await fetch(`/api/questions/${selectedList}/${questionId}`, {
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