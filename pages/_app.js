import '../styles/globals.css'
import { RecoilRoot } from 'recoil'
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
      <Toaster />
    </RecoilRoot>
  )
}

export default MyApp
