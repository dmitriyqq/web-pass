import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router';
import {Text} from "../components/Text";
import {TextInput} from "../components/TextInput";
import {SketchPicker} from "react-color";
import {firebase} from "../firebase";
import Button from "../components/Button";
import {useSnackbar} from "notistack";

export const SettingsPage = () => {
    const { passwordId } = useParams();

    useEffect(() => {
        const ref = firebase.database().ref(`users/${firebase.auth().currentUser.uid}/passwords/${passwordId}`);
        ref.on('value', (value) => {
            const passwordObject = value.val();
            setDomain(passwordObject?.domain ?? '');
            setAccount(passwordObject?.account ?? '');
            setPassword(passwordObject?.password ?? '');
            setColor(passwordObject?.color ?? '#111');
            setBackgroundColor(passwordObject?.backgroundColor ?? '#FBF8F8');
        })
    }, [passwordId]);

    const [ domain, setDomain ] = useState('');
    const [ account, setAccount ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ color, setColor ] = useState('#111');
    const [ backgroundColor, setBackgroundColor ] = useState('#FBF8F8');
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const createUpdatePassword = () => {
        firebase.database().ref(`users/${firebase.auth().currentUser.uid}/passwords/${passwordId}`).set({
            passwordId,
            account,
            password,
            domain,
            color: color.hex,
            backgroundColor: backgroundColor.hex,
            accessedAt: Date.now(),
        }, (error) => {
            if (error) {
                console.log('error')
                enqueueSnackbar('Ошибка', { variant: 'error'});
                // The write failed...
            } else {
                enqueueSnackbar('Пароль добавлен в базу', { variant: 'success'});
                console.log('suc')
                // Data saved successfully!
            }
        });
    }

    const deletePassword = () => {
        firebase
            .database()
            .ref(`users/${firebase.auth().currentUser.uid}/passwords/${passwordId}`)
            .set(null);

        history.push('/')
    }

    console.log('passwordId');
    console.log(`users/${firebase.auth().currentUser.uid}/passwords/${passwordId}`);

    return (<>
        <div style={{ display: 'flex', flexDirection: 'row'}}>
        <div>
            <div style={{margin: '25px'}}>
                <Text style={{marginBottom: '25px'}}>Сайт:</Text>
                <TextInput value={domain} onChange={setDomain} placeholder={'Сайт'} type='text'/>
            </div>
            <div style={{margin: '25px'}}>
                <Text style={{marginBottom: '25px'}}>Аккаунт:</Text>
                <TextInput value={account} onChange={setAccount} placeholder={'Аккаунт'} type='text'/>
            </div>
            <div style={{margin: '25px'}}>
                <Text style={{marginBottom: '25px'}}>Пароль:</Text>
                <TextInput value={password} onChange={setPassword} placeholder={'Пароль'} type='password'/>
            </div>
        </div>
        <div>
            <div style={{margin: '25px'}}>
                <Text style={{marginBottom: '25px'}}>Цвет текста:</Text>
                <SketchPicker
                    color={ color }
                    onChange={ setColor }
                />
            </div>
            <div style={{margin: '25px'}}>
                <Text style={{marginBottom: '25px'}}>Цвет фона</Text>
                <SketchPicker
                    color={ backgroundColor }
                    onChange={ setBackgroundColor }
                />
            </div>
        </div>
        </div>
        <Button onClick={deletePassword} color={'red'}>Удалить пароль</Button>
        <Button onClick={createUpdatePassword} color={'green'}>Обновить пароль</Button>
    </>);
}