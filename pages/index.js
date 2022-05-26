import styles from '../styles/Index.module.css'
import Container from '@mui/material/Container'
import NavBar from '../components/AppBar';
import AddQuestion from '../components/AddQuestion'
import List from '../components/List';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { atom, useRecoilState } from 'recoil';
import { stateUser, stateQuestions } from '../atom';
export default function Home() {

  const [questions, setQuestions] = useRecoilState(stateQuestions);
  // console.log('Questions', questions);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const fetchQuestions = async () => {
    setLoading(true);
    const response = await fetch('/api/questions');
    const data = await response.json();
    // setList(data);
    setQuestions(data);
    setLoading(false);
  }

  // useEffect(() => {
  //   fetchQuestions();
  // }, [])  //will only run on intial render

  return (
    <Container className={styles.App} maxWidth="md">
      <NavBar />
      <AddQuestion />
      <List questions={questions} loading={loading} />
      <button onClick={fetchQuestions}>Refresh</button>
    </Container>
  );
}
