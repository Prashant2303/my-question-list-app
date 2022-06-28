/* eslint-disable react-hooks/exhaustive-deps */
import styles from 'styles/Index.module.css';
import AddQuestion from 'components/AddQuestion';
import List from 'components/List';
import Toolbar from 'components/Toolbar';
import ListSelect from 'components/ListSelect';
import { useState, useEffect } from 'react';
import { useHooks } from 'service/apiCalls';
import { useRecoilValue } from 'recoil';
import { stateSelectedList, stateUser } from 'store/atoms';
import { CircularProgress } from '@mui/material';

export default function Home() {

  const hooks = useHooks();
  const user = useRecoilValue(stateUser);
  const selectedList = useRecoilValue(stateSelectedList);
  const [loadingDefaultList, setLoadingDefaultList] = useState(false);
  const [loadingPrivateLists, setLoadingPrivateLists] = useState(false);

  const fetchSelectedList = async () => {
    setLoadingDefaultList(true);
    await hooks.fetchSelectedList();
    setLoadingDefaultList(false);
  }

  const fetchPrivateLists = async () => {
    setLoadingPrivateLists(true);
    await hooks.fetchPrivateLists();
    setLoadingPrivateLists(false);
  }

  useEffect(() => {
    hooks.redirectIfLoggedOut()
  })

  //FOR FETCHING LISTS
  useEffect(() => {
    if (user) fetchPrivateLists();
  }, [user])

  //FOR FETCHING QUESTIONS
  useEffect(() => {
    if (user) fetchSelectedList();
  }, [selectedList])

  const renderLoading = () => (
    <div className={styles.loadingScreen}>
      <CircularProgress sx={{ 'color': 'white' }} />
    </div>
  )

  const renderContent = () => (
    <>
      <AddQuestion />
      <ListSelect />
      <Toolbar />
      <List />
    </>
  )
  return (
    loadingDefaultList || loadingPrivateLists
      ? renderLoading() : renderContent()
  );
}