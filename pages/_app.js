import '../styles/globals.css'
import NavBar from 'components/NavBar';
import { Container } from '@mui/material';
import { RecoilRoot } from 'recoil'
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <Container maxWidth="md">
      <RecoilRoot>
          <NavBar />
          <Component {...pageProps} />
          <Toaster />
      </RecoilRoot>
    </Container>
  )
}

export default MyApp
