import React from 'react'
import {PasswordComponent, PasswordHistoryComponent} from "../components/PasswordComponent";
import {useList} from "react-firebase-hooks/database";
import {firebase} from "../firebase";
import {createPassword} from "./PasswordsPage";

export const HistoryPage: React.FC = () => {
    const [passwords] = useList(firebase.database().ref(`users/${firebase.auth().currentUser.uid}/passwords`))

    const createdPasswords = passwords.map(v => v.val()).filter(p => p.domain && p.account  && p.password && p.passwordId).map(createPassword);

    return <div style={{ display: 'flex', flexDirection: 'column'}}>
        {
            createdPasswords.map((p) => <PasswordHistoryComponent key={p.passwordId} password={p}/>)
        }
    </div>;
}