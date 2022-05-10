import styles from '../styles/Index.module.css'
import Container from '@mui/material/Container'
import PrimarySearchAppBar from '../components/AppBar';
import AddQuestion from '../components/AddQuestion'
import List from '../components/List';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  const fetchQuestions = async () => {
    const response = await fetch('/api/questions');
    const data = await response.json();
    setList(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchQuestions();
  }, [])  //will only run on intial render

  const addQuestion = async (question) => {
    question.id = uuidv4();
    question.date = new Date();
    const response = await fetch('/api/questions', {
      method: 'POST',
      body: JSON.stringify({ question }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    setList([data, ...list]);
  }

  return (
    <Container className={styles.App} maxWidth="md">
      <PrimarySearchAppBar />
      <AddQuestion addQuestion={addQuestion} />
      <List questions={list} loading={loading} />
      <button onClick={() => console.log('Array', list)}>List</button>
    </Container>
  );
}
