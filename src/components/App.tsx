import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CountryDatas, { CountryType } from '../contexts/CountryDatas';
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
  const setCountries = useContext(CountryDatas).setCountries

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all").then((res) => res.json()).then((data: any) => {
      const tmp: CountryType[] = [];
      data.forEach((d: any) => {
        const currencies: string[] = [];
        if (d.currencies)
          Object.entries(d.currencies)?.forEach((c: any) => currencies.push(c[1].name))

        const languages: string[] = [];
        if (d.languages)
          Object.entries(d.languages)?.forEach((c: any, i: number) => { if (c[i + 1] != undefined) languages.push(c[i + 1]) });

        let myFlag: string = '';
        if (d.flags) {

          Object.entries(d.flags)?.forEach((c: any) => {
            for (let i = 0; i < c.length; i++) {
              if (c[i].includes("https")) {
                myFlag = c[i];
                break;
              }
            }
          });
        }

        let nativeName: string = '';
        if (d.name.nativeName)
          Object.entries(d.name.nativeName)?.forEach((c: any) => nativeName = c[0].official)

        let topLevelDomain: string = '';
        topLevelDomain = d.tld ? d.tld[0] : '';

        let c: CountryType = {
          name: d.name.common,
          flag: myFlag,
          borderCountries: d.borders,
          capital: d.capital,
          currencies: currencies,
          languages: languages,
          nativeName: nativeName,
          population: d.population,
          region: d.region,
          subRegion: d.subregion,
          topLevelDomain: topLevelDomain,
          code3Name: d.fifa,
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
