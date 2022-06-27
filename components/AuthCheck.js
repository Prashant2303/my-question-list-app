import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useHooks } from "service/apiCalls"
import { stateUser } from "store/atoms";

export default function AuthCheck({ children }) {
    const hooks = useHooks();
    const user = useRecoilValue(stateUser);
    const router = useRouter();

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            router.push('/signin');
        }
        else if (!user) {
            hooks.setUserFromSession();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return (<>{children}</>)
}