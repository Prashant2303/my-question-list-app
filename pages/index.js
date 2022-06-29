import AddQuestion from 'components/AddQuestion';
import List from 'components/List';
import Toolbar from 'components/Toolbar';
import ListSelect from 'components/ListSelect';
import Loading from 'components/Loading';
import { useState, useEffect } from 'react';
import { useHooks } from 'service/apiCalls';
import { useRecoilValue } from 'recoil';
import { statePrivateLists, stateSelectedList, stateUser } from 'store/atoms';

export default function Home() {

  const hooks = useHooks();
  const user = useRecoilValue(stateUser);
  const selectedList = useRecoilValue(stateSelectedList);
  const privateLists = useRecoilValue(statePrivateLists);
  const [loadingSelectedList, setLoadingSelectedList] = useState(false);

  const fetchSelectedList = async () => {
    setLoadingSelectedList(true);
    await hooks.fetchSelectedList();
    setLoadingSelectedList(false);
  }

  useEffect(() => {
    hooks.redirectIfLoggedOut()
  })

  useEffect(() => {
    if (user) fetchSelectedList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedList])

  const renderContent = (
    <>
      <AddQuestion />
      <ListSelect loading={loadingSelectedList} />
      <Toolbar />
      <List loading={loadingSelectedList} />
    </>
  )

  return (
    !privateLists ? <Loading /> : renderContent
  );
}