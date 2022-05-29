import styles from '../styles/Index.module.css'
import Container from '@mui/material/Container'
import NavBar from '../components/AppBar';
import AddQuestion from '../components/AddQuestion'
import List from '../components/List';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useHooks } from '../apiCalls';
import { useRecoilState } from 'recoil';
import { stateShouldFetch } from '../atom';

export default function Home() {

  const hooks = useHooks();
  const router = useRouter();
  const [shouldFetch, ] = useRecoilState(stateShouldFetch);
  const [loading, setLoading] = useState(false);

  const fetchUserInfo = async () => {
    setLoading(true);
    await hooks.signinUsingSession(localStorage.getItem('user'));
    setLoading(false);
  }

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      router.push('/signin');
    }
    else if (shouldFetch) {
      console.log('FETCH INFO');
      fetchUserInfo();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])  //will only run on intial render

  return (
    <Container className={styles.App} maxWidth="md">
      <NavBar />
      <AddQuestion />
      <List loading={loading} />
    </Container>
  );
}
