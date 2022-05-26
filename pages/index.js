import styles from '../styles/Index.module.css'
import Container from '@mui/material/Container'
import NavBar from '../components/AppBar';
import AddQuestion from '../components/AddQuestion'
import List from '../components/List';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from './_app';
import { useContext } from 'react';

export default function Home() {

  const state = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(state?.questions);

  const fetchQuestions = async () => {
    const response = await fetch('/api/questions');
    const data = await response.json();
    setList(data);
    setLoading(false);
  }

  // useEffect(() => {
  //   fetchQuestions();
  // }, [])  //will only run on intial render

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
    console.log('Add',data);
    setList([data, ...list]);
  }

  const deleteQuestion = async (questionId) => {
    const response = await fetch(`/api/questions/${questionId}`, {
      method: 'DELETE'
    });

    const data = await response.json();
    console.log('DELETE RESPONSE', data);
    const newList = list.filter(question => question.id !== questionId)
    setList(newList);
  }

  return (
    <Container className={styles.App} maxWidth="md">
      <NavBar />
      <AddQuestion addQuestion={addQuestion} />
      <List questions={list} loading={loading} deleteQuestion={deleteQuestion} />
      <button onClick={() => console.log('Array', list)}>List</button>
    </Container>
  );
}
