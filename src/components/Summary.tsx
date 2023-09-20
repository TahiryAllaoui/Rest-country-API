import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import CountryDatas, { CountryType } from '../contexts/CountryDatas';
import '../style/Summary.scss';
import Theme from '../contexts/Theme';


function Summary() {

    const themeDark = useContext(Theme).dark;


    const light = {
        backgroundColor: 'rgb(245, 245, 245)',
        color: 'rgb(130,130,130)',
        border: 'none',
        boxShadow: '0px 0px 5px 1px rgb(200, 198, 198)'
    };
    const dark = {
        backgroundColor: 'rgb(43, 55, 67)',
        color: 'rgb(174, 174, 174)',
        border: 'none',
        boxShadow: '0px 0px 5px 1px rgb(43, 44, 47)'
    };
    const { id } = useParams();
    const countries = useContext(CountryDatas).countries;
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

    const clicked = () => {
        console.log(id);
    }

    return (
        <div className="summary" >
            <div className="back" >
                <Link to={'/'} className="my-button" style={themeDark ? dark : light}><FiChevronLeft /> Back</Link>
            </div>
            <div className="container">
                <div className="flag" style={{ backgroundImage: `url(${currCountry.flag})` }}></div>
                <div className="summary-item">
                    <h2>{currCountry.name}</h2>
                    <div className='description'>
                        <div className="first">
                            <p>Native Name: <span style={{ color: themeDark ? 'rgb(174, 174, 174)' : 'rgb(130,130,130)' }}>{currCountry.nativeName}</span></p>
                            <p>Population: <span style={{ color: themeDark ? 'rgb(174, 174, 174)' : 'rgb(130,130,130)' }}>{currCountry.population.toLocaleString()}</span></p>
                            <p>Region: <span style={{ color: themeDark ? 'rgb(174, 174, 174)' : 'rgb(130,130,130)' }}>{currCountry.region}</span></p>
                            <p>Sub Region: <span style={{ color: themeDark ? 'rgb(174, 174, 174)' : 'rgb(130,130,130)' }}>{currCountry.subRegion}</span></p>
                            <p>Capital: <span style={{ color: themeDark ? 'rgb(174, 174, 174)' : 'rgb(130,130,130)' }}>{currCountry.capital}</span></p>
                        </div>
                        <div className="second">
                            <p>Top Level Domain: <span style={{ color: themeDark ? 'rgb(174, 174, 174)' : 'rgb(130,130,130)' }}>{currCountry.topLevelDomain}</span></p>
                            <p>Currencies:
                                {
                                    currCountry.currencies.map((c, i) => <span key={i} style={{ color: themeDark ? 'rgb(174, 174, 174)' : 'rgb(130,130,130)', paddingLeft: '0.5rem' }}>{c}</span>)
                                }
                            </p>
                            <p>Languages:
                                {
                                    currCountry.languages.map((c, i) => <span key={i} style={{ color: themeDark ? 'rgb(174, 174, 174)' : 'rgb(130,130,130)', paddingLeft: '0.5rem' }}>{c}</span>)
                                }
                            </p>
                        </div>
                    </div>
                    <div className="border">
                        <p>Border Countries: </p>
                        {currCountry.bordersNames.map((item) => <Link onClick={clicked} to={"/countries/" + currCountry.code3Name} key={item} className='boundaries' style={themeDark ? dark : light}>
                            <div>{item}</div>
                        </Link>)}
                    </div>
                </div>
            </div>
        </div >
    )


}

export default Summary