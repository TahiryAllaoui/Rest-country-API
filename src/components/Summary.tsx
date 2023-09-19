import { useContext, useEffect, useState } from 'react';
import CountryDatas, { CountryType } from '../contexts/CountryDatas';
import '../style/Summary.scss';
import IndexContext from '../contexts/IndexContext';
import { useParams } from 'react-router-dom';
// import Theme from '../contexts/Theme';


function Summary() {

    const { id } = useParams();

    // const light = {
    //     backgroundColor: 'rgb(245, 245, 245)',
    //     color: 'rgb(39,39,39)',
    //     border: 'none',
    //     boxShadow: '0px 0px 5px 1px rgb(200, 198, 198)'
    // };

    // const dark = {
    //     backgroundColor: 'rgb(43, 55, 67)',
    //     color: '#f5f5f5',
    //     border: 'none',
    //     boxShadow: '0px 0px 5px 1px rgb(43, 44, 47)'

    // }

    // // const themeDark = useContext(Theme).dark;
    const countries = useContext(CountryDatas).countries;
    // const index = useContext(IndexContext).index;

    const [currCountry, setCurrCountry] = useState<CountryType>({
        name: "",
        flag: "",
        nativeName: "",
        population: 0,
        region: "",
        subRegion: "",
        capital: "",
        topLevelDomain: "",
        currencies: [],
        languages: [],
        borderCountries: [],
        code3Name: "",
        bordersNames: []
    })
    useEffect(() => {
        const curr = countries.filter((country) => country.code3Name == id);
        setCurrCountry(curr[0]);
    }, [])

    useEffect(() => {
        console.log(currCountry)
    }, [currCountry])

    return (
        <div className="summary" >
            <div className="flag" style={{ backgroundImage: `url(${currCountry.flag})` }}></div>
            <div className="country">
                <h2>{currCountry.name}</h2>
                <div className='description'>
                    <div className="first">
                        <p>Native Name: <span>{currCountry.nativeName}</span></p>
                        <p>Population: <span>{currCountry.population}</span></p>
                        <p>Region: <span>{currCountry.region}</span></p>
                        <p>Sub Region: <span>{currCountry.subRegion}</span></p>
                        <p>Capital: <span>{currCountry.capital}</span></p>
                    </div>
                    <div className="second">
                        <p>Top Level Domain: <span>{currCountry.topLevelDomain}</span></p>
                        <p>Currencies: 
                            {
                            currCountry.currencies.map((c, i) => <span key={i}>{c}</span>)
                            }
                        </p>
                        <p>Languages:
                            {
                                currCountry.languages.map((c, i) => <span key={i}>{c}</span>)
                            }
                            </p>
                    </div>
                </div>
                <div className="border">
                    <p>Border Countries: </p>
                    {currCountry.bordersNames.map((item) => <div key={item} className='boundaries'>
                        <div>{item}</div>
                    </div>)}
                </div>
            </div>
        </div >
    )


}

export default Summary