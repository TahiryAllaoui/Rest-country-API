import { useContext } from 'react';
import Theme from '../contexts/Theme';
import '../style/Header.scss';
import { CiDark, CiSun } from 'react-icons/ci';
function Header() {
    const light = {
        backgroundColor: 'rgb(245, 245, 245)',
        color: 'rgb(39,39,39)',
        boxShadow: '0px 0px 5px 1px rgb(200, 198, 198)'

    }
    const dark = {
        backgroundColor: 'rgb(43, 55, 67)',
        color: '#f5f5f5',
        boxShadow: '0px 0px 5px 1px rgb(43, 44, 47)'

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
                {!themeContext.dark ? <CiDark /> : <CiSun />}
                {!themeContext.dark ? <span>Dark Mode</span> : <span>Light Mode</span>}
            </div>
        </div>
    )
}

export default Header