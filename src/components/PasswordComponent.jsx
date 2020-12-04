import React from 'react';
import {Text} from "./Text";
import AccountIcon from '../icons/account.svg';
import PasswordIcon from '../icons/padlock.svg';
import {Paper} from "./Paper";
import CopyIcon from '../icons/copy.svg';
import ConfigIcon from '../icons/configuration-gears.svg';
import {Link} from "react-router-dom";
import { useSnackbar } from 'notistack';
import {firebase} from "../firebase";

export const MyIcon = ({ src, onClick }) => {
    return <img
                src={src}
                onClick={onClick}
                style={{
                    width: '32px',
                    height: '32px',
                    margin: '15px',
                    cursor: 'pointer',
                }} alt='icon'
            />
}

export const Domain: React.FC = ({ domain }) => {
    return (<div style={{display: 'flex', alignItems: 'center'}}>
        <MyIcon src={`http://${domain}/favicon.ico`} />
        <Text style={{margin: '15px'}}>{domain}</Text>
    </div>);
}

export const Account: React.FC = ({ account }) => {
    return (<div style={{display: 'flex', alignItems: 'center'}}>
        <MyIcon src={AccountIcon}/>
        <Text style={{margin: '15px'}}>{account}</Text>
    </div>);
}

export const Password: React.FC = ({ password }) => {
    return (<div style={{display: 'flex', alignItems: 'center'}}>
        <MyIcon src={PasswordIcon} />
        <Text style={{margin: '15px'}}>********</Text>
    </div>);
}

export const Actions = ({ passwordId, password}) => {
    const { enqueueSnackbar } = useSnackbar();

    const updateDate = () => {
        firebase
            .database()
            .ref(`users/${firebase.auth().currentUser.uid}/passwords/${passwordId}/accessedAt`)
            .set(Date.now());
    }

    function fallbackCopyTextToClipboard(text) {
        console.log('fallbackCopyTextToClipboard');
        var textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            var successful = document.execCommand('copy');
            enqueueSnackbar( 'Пароль скопирован в буфер обмена', { variant: 'success'});
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Fallback: Copying text command was ' + msg);
            updateDate();
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }

        document.body.removeChild(textArea);
    }
    function copyTextToClipboard(text) {
        console.log('copyTextToClipboard')
        if (!navigator.clipboard) {
            fallbackCopyTextToClipboard(text);
            return;
        }
        navigator.clipboard.writeText(text).then(function() {
            console.log('Async: Copying to clipboard was successful!');
            enqueueSnackbar('Пароль скопирован в буфер обмена', { variant: 'success'});
            updateDate();
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    }

    return (<div style={{display: 'flex', alignItems: 'center'}}>
        <MyIcon src={CopyIcon} onClick={() => copyTextToClipboard(password)}/>
        <Link to={`/passwords/${passwordId}`}><MyIcon src={ConfigIcon} /></Link>
    </div>)
}

export const PasswordComponent = (props) => {
    const { passwordId, password, account, domain, color, backgroundColor } = props.password;

    return (<Paper
        style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: '15px',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            color: color ?? '#111',
            backgroundColor: backgroundColor ?? '#FBF8F8'
        }}>
        <Domain domain={domain} />
        <Account account={account} />
        <Password password={password} />
        <Actions password={password} passwordId={passwordId} />
    </Paper>);
}

export const PasswordHistoryComponent = (props) => {
    const {account, domain, color, backgroundColor, accessedAt} = props.password;

    return (<Paper
        style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: '15px',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            color: color ?? '#111',
            backgroundColor: backgroundColor ?? '#FBF8F8'
        }}>
        <Domain domain={domain}/>
        <Account account={account}/>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Text variant='small'>
                {new Date(accessedAt).toLocaleTimeString()} {new Date(accessedAt).toLocaleDateString()}
            </Text>
        </div>
    </Paper>);
};
