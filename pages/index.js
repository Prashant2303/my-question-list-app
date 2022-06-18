import styles from '../styles/Index.module.css'
import Container from '@mui/material/Container'
import NavBar from 'components/AppBar';
import AddQuestion from 'components/AddQuestion'
import List from 'components/List';
import Toolbar from 'components/Toolbar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useHooks } from 'service/apiCalls';
import { useRecoilState } from 'recoil';
import { stateShouldFetch, stateUser } from 'store/atoms';

export default function Home() {

  const hooks = useHooks();
  const router = useRouter();
  const [shouldFetch,] = useRecoilState(stateShouldFetch);
  const [user,] = useRecoilState(stateUser);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    setLoading(true);
    await hooks.fetchList();
    setLoading(false);
  }

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      router.push('/signin');
    }
    else if (shouldFetch) {
      hooks.setUserFromSession();
    }
    if (user) {
      fetchList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <Container className={styles.App} maxWidth="md">
      <NavBar />
      <AddQuestion />
      <Toolbar />
      <List loading={loading} />
    </Container>
  );
}
