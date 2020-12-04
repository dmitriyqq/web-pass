import {Text} from "./Text";
import {Link} from "react-router-dom";
import AboutIcon from '../icons/info-button.svg';
import { v4 as uuidv4 } from 'uuid';

export const NavigationItem = ({ label, link}) => {
    return <Link to={link} style={{margin: '5px'}}><Text variant='small'>{label}</Text></Link>
}

export const Navigation = (): React.FC => {
    return (<nav style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: '25px'}}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>

            <NavigationItem label={'Мои пароли'} link={'/'}/>
            <NavigationItem label={'История'} link={'/history'}/>
            <NavigationItem label={'Добавить'} link={() => `/passwords/${uuidv4()}`}/>
        </div>
        <Link to='/about' >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <img src={AboutIcon} alt="about" style={{width: '24px', height: '24px'}} />
                <div style={{ margin: '5px' }}><Text variant='small'>О сайте</Text></div>
            </div>
        </Link>
    </nav>);
}