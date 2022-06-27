/* eslint-disable react-hooks/exhaustive-deps */
import AddQuestion from 'components/AddQuestion'
import List from 'components/List';
import Toolbar from 'components/Toolbar';
import ListSelect from 'components/ListSelect';
import { useState, useEffect } from 'react';
import { useHooks } from 'service/apiCalls';
import { useRecoilValue } from 'recoil';
import { stateSelectedList, stateUser } from 'store/atoms';

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

  //FOR FETCHING LISTS
  useEffect(() => {
    if (user) fetchPrivateLists();
  }, [user])

  //FOR FETCHING QUESTIONS
  useEffect(() => {
    if (user) fetchSelectedList();
  }, [selectedList])

  return (
    <>
      <AddQuestion />
      <ListSelect loading={loadingPrivateLists} />
      <Toolbar />
      <List loading={loadingDefaultList} />
    </>
  );
}