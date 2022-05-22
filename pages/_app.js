import '../styles/globals.css'
import { createContext, useState } from 'react'

const AppContext = createContext();
export { AppContext };

function MyApp({ Component, pageProps }) {
  
  const [user, setUser] = useState(null)
  const [questions, setQuestions] = useState([]);
  const [signedIn, setSignedIn] = useState(false)
  const [fetchQuestions, setFetchQuestions] = useState(false)

  const context = {
    user,
    setUser,
    questions,
    setQuestions,
    signedIn,
    setSignedIn,
    fetchQuestions,
    setFetchQuestions
  }

  // if(!signedIn)
  //   router push '/login'
  // else
  //   fetchQuestions(true);
  
  return (
    <AppContext.Provider value={context}>
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default MyApp
