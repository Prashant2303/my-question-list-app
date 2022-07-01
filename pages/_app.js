import '../styles/globals.css'
import NavBar from 'components/NavBar';
import GlobalLoading from 'components/GlobalLoading';
import Footer from 'components/Footer';
import { Container } from '@mui/material';
import { RecoilRoot } from 'recoil'
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <Container maxWidth="md" style={{ 'height': '100vh', display: 'flex', flexDirection: 'column' }}>
      <RecoilRoot>
        <NavBar />
        <GlobalLoading>
          <Component {...pageProps} />
          <Toaster />
        </GlobalLoading>
      </RecoilRoot>
      <Footer />
    </Container>
  )
}

export default MyApp
