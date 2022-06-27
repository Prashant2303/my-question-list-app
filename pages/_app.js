import '../styles/globals.css'
import NavBar from 'components/NavBar';
import { Container } from '@mui/material';
import { RecoilRoot } from 'recoil'
import { Toaster } from 'react-hot-toast';
import AuthCheck from 'components/AuthCheck';

function MyApp({ Component, pageProps }) {
  return (
    <Container maxWidth="md">
      <RecoilRoot>
        <AuthCheck>
          <NavBar />
          <Component {...pageProps} />
          <Toaster />
        </AuthCheck>
      </RecoilRoot>
    </Container>
  )
}

export default MyApp
