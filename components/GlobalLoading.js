import Loading from './Loading';
import { useRecoilValue } from "recoil";
import { statePrivateLists, stateUser } from "store/atoms";
import { useHooks } from 'service/apiCalls';
import { useEffect, useState } from 'react';

export default function GlobalLoading({ children }) {
    const hooks = useHooks();
    const user = useRecoilValue(stateUser);
    const privateLists = useRecoilValue(statePrivateLists);
    const [loading, setLoading] = useState(false);

    const fetchPrivateLists = async () => {
        setLoading(true);
        await hooks.fetchPrivateLists();
        setLoading(false);
    }

    useEffect(() => {
        if (localStorage.getItem('user') && !user) {
            hooks.setUserFromSession();
        }
        if (user && !privateLists) {
            fetchPrivateLists()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, privateLists])

    return (
        loading ? <Loading /> : children
    );
}