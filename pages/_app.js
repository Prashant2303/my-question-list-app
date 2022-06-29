import '../styles/globals.css'
import NavBar from 'components/NavBar';
import GlobalLoading from 'components/GlobalLoading';
import { Container } from '@mui/material';
import { RecoilRoot } from 'recoil'
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <Container maxWidth="md">
      <RecoilRoot>
        <NavBar />
        <GlobalLoading>
          <Component {...pageProps} />
          <Toaster />
        </GlobalLoading>
      </RecoilRoot>
    </Container>
  )
}

export default MyApp
