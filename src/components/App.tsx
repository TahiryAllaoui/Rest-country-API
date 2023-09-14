import { useContext } from 'react';
import Theme from '../contexts/Theme';
import '../style/App.scss'
import Country from './Country'
import Header from './Header'

function App() {
  const light = {
    backgroundColor: '#ececec',
    color: 'rgb(39, 39, 39)'
  };
  const dark = {
    backgroundColor: 'rgb(43, 55, 67)',
    color: '#f5f5f5'
  };

  const themeDark = useContext(Theme).dark;

  return (
    <div className='app' style={themeDark ? dark : light}>
      <Header />
      <Country />
    </div>
  )
}

export default App
