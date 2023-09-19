import { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CountryDatas, { CountryType } from '../contexts/CountryDatas';
import IndexContext from '../contexts/IndexContext';
import Theme from '../contexts/Theme';
import '../style/App.scss';
import Country from './Country';
import Header from './Header';
import Summary from './Summary';

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
  const { countries, setCountries } = useContext(CountryDatas)
  const index = useContext(IndexContext).index;

  useEffect(() => {
    fetch("http://localhost:8000/countries").then((res) => res.json()).then((data: any) => {
      const tmp: CountryType[] = [];
      data.forEach((d: any) => {
        const currencies: string[] = [];
        d.currencies?.forEach((c: any) => currencies.push(c.name))

        const languages: string[] = [];
        d.languages?.forEach((c: any) => languages.push(c.name))

        let c: CountryType = {
          name: d.name,
          flag: d.flag,
          borderCountries: d.borders,
          capital: d.capital,
          currencies: currencies,
          languages: languages,
          nativeName: d.nativeName,
          population: d.population,
          region: d.region,
          subRegion: d.subregion,
          topLevelDomain: d.topLevelDomain,
          code3Name: d.alpha3Code,
          bordersNames: []
        }
        tmp.push(c);
      }
      )
      tmp.forEach((country: CountryType) => {
        if (country.borderCountries != undefined) {
          for (let i = 0; i < tmp.length; i++) {
            if (country.borderCountries.includes(tmp[i].code3Name)) {
              country.bordersNames.push(tmp[i].name);
            }
            if (country.borderCountries.length == country.bordersNames.length) break;
          }
        }
      })
      setCountries(tmp);
    }).catch((e) => console.log("FETCH ERROR: " + e))
  }, []);

  return (
    <BrowserRouter>
      <div className='app' style={themeDark ? dark : light}>
        <Header />
        {/* <Country /> */}
        <Routes>
          <Route path='/' element={<Country />} />
          <Route path={"/countries/:id"} element={<Summary />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
