import React from 'react'
import {PasswordComponent} from "../components/PasswordComponent";
import {useList} from "react-firebase-hooks/database";
import { firebase } from '../firebase';


export const createPassword = ({domain, account, password, passwordId, color, backgroundColor, accessedAt}) => ({
    passwordId: passwordId,
    domain: domain,
    account: account,
    password: password,
    color: color || '#111',
    accessedAt: accessedAt || '',
    backgroundColor: backgroundColor || '#FBF8F8',
})

export const PasswordsPage: React.FC = () => {
    const [passwords] = useList(firebase.database().ref(`users/${firebase.auth().currentUser.uid}/passwords`))
    console.log(firebase.auth().currentUser.uid)

    console.log(passwords);
    const createdPasswords = passwords.map(v => v.val()).filter(p => p.domain && p.account  && p.password && p.passwordId).map(createPassword);

    console.log(createdPasswords);
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {
                createdPasswords.map((p) => <PasswordComponent key={p.passwordId} password={p}/>)
            }
        </div>
    );
}