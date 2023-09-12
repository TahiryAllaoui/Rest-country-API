import { useContext } from 'react';
import Theme from '../contexts/Theme';
import '../style/Header.scss';
import { CiDark } from 'react-icons/ci';
function Header() {
    const light = {
        backgroundColor: 'rgb(241, 241, 241)',
        color: 'rgb(39,39,39)'
    }
    const dark = {
        backgroundColor: 'rgb(43, 55, 67)',
        color: '#f1f1f1'
    }

    const themeContext = useContext(Theme);


    const handleTheme = () => {
        themeContext.setDark(!themeContext.dark);
    }


    return (
        <div className="theme-header" style={themeContext.dark ? dark : light}>
            <h2>Where in the world ?</h2>
            <div
                className='theme-button'
                onClick={handleTheme} >
                <CiDark />
                <span>Dark Mode</span></div>
        </div>
    )
}

export default Header