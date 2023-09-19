import { useContext } from 'react';
import CountryDatas from '../contexts/CountryDatas';
import '../style/Summary.scss';
import IndexContext from '../contexts/IndexContext';


function Summary() {

    const countries = useContext(CountryDatas).countries;
    const index = useContext(IndexContext).index;

    return (
        <div className="summary">
            <div className="flag"></div>
            <div className="country">
                <h2>{countries[index].name}</h2>
                <div className='description'>
                    <div className="first">
                        <p>Native Name: <span>{countries[index].nativeName}</span></p>
                        <p>Population: <span>{countries[index].population}</span></p>
                        <p>Region: <span>{countries[index].region}</span></p>
                        <p>Sub Region: <span>{countries[index].subRegion}</span></p>
                        <p>Capital: <span>{countries[index].capital}</span></p>
                    </div>
                    <div className="second">
                        <p>Top Level Domain: <span>{countries[index].topLevelDomain}</span></p>
                        <p>Currencies: <span>{countries[index].currencies}</span></p>
                        <p>Languages: <span>{countries[index].languages}</span></p>
                    </div>
                </div>
                <div className="border">
                    <p>Border Countries: </p>
                    {countries[index].bordersNames.map((item) => <div key={item} className='boundaries'>
                        <div>{item}</div>
                    </div>)}
                </div>
            </div>
        </div>
    )


}

export default Summary