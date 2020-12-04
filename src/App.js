import React, { useEffect, useState, useContext } from 'react';
import firebase from 'firebase/app';

import { useAuthState } from "react-firebase-hooks/auth"
import { SnackbarProvider } from 'notistack';
import "firebase/auth";
import 'firebase/database';

import { FirebaseDatabaseNode, FirebaseDatabaseProvider, FirebaseDatabaseMutation } from "@react-firebase/database";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {PasswordsPage} from "./pages/PasswordsPage";
import {AboutPage} from "./pages/AboutPage";
import {HistoryPage} from "./pages/HistoryPage";
import {NotFoundPage} from "./pages/NotFoundPage";
import {SettingsPage} from "./pages/SettingsPage";
import {Header} from "./components/Header";
import {Container} from "./components/Container";
import {Navigation} from "./components/Navigation";
import Button from "./components/Button";
import {Text} from "./components/Text";
import { firebaseContext, auth } from './firebase';

const PasswordList = ({user}) => {
  return <div>PasswordList</div>
}

const CreatePassword = ({user}) => {
  const [ passwords, setPasswords ] = useState([])
  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const uid = firebase?.auth()?.currentUser?.uid
        if (uid) {
          console.log();
          const database = firebase.database();
          const passwords = await database.ref(`users/${user?.uid}/passwords`).once('value');
          setPasswords(passwords.val())
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchPasswords();
  }, [])
  
  console.log(passwords);

  return (
    <>
      <div>CreatePassword</div>
      <ul>
        { passwords.map((p, k) => <li key={k}>{p.toString()}</li>)}
      </ul>

    </>
  )
}

export const SignInComponent = () => {
    const {auth} = useContext(firebaseContext)

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
    }

    return (<div style={{ display: 'grid'}}>
        <div style={{ placeSelf: 'center  center'}}>
          <Text style={{ marginTop: '15px', marginBottom: '15px'}}> Вы не авторизованы. </Text>
          <Button
              style={{ marginTop: '15px'}}
              onClick={() => {
                  signInWithGoogle()
              }}
          >
            Sign In with Google
          </Button>
      </div>
    </div>);
};

function App() {
    const [user, loading] = useAuthState(auth)


  return (
    <firebaseContext.Provider value={{user, auth}}>
    <SnackbarProvider maxSnack={3}>
    <Container>
        {user && (<Router>
          <>
            <Header />
            <Navigation />
            <Switch>
            <Route path="/passwords/:passwordId" component={SettingsPage} exact />
            <Route path="/" component={PasswordsPage} exact />
            <Route path="/about" component={AboutPage} exact />
            <Route path="/history" component={HistoryPage} exact />
            <Route path="*" component={NotFoundPage} exact />
            </Switch>
          </>
        </Router>)}
        {!user && <SignInComponent />}
    </Container>
    </SnackbarProvider>
    </firebaseContext.Provider>
  );
}

export default App;
