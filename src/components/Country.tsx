import { useContext, useEffect, useState } from 'react';
import '../style/Country.scss';
import { CiCircleChevDown, CiCircleChevUp, CiSearch } from 'react-icons/ci'
import Theme from '../contexts/Theme';
import CountryDatas, { CountryType } from '../contexts/CountryDatas';

interface Country {

}

function Country() {

    const { countries, setCountries } = useContext(CountryDatas)

    useEffect(() => {
        fetch("http://localhost:8000/countries").then((res) => res.json()).then((data: any) => {
            const tmp: CountryType[] = [];
            data.forEach((d: any) => {
                let c: CountryType = {
                    name: d.name,
                    borderCountries: d.borders,
                    capital: d.capital,
                    currencies: d.currencies,
                    languages: d.languages,
                    nativeName: d.nativeName,
                    population: d.population,
                    region: d.region,
                    subRegion: d.subregion,
                    topLevelDomain: d.topLevelDomain
                }
                tmp.push(c);
            }
            )

            setCountries(tmp);

        }).catch((e) => console.log("FETCH ERROR: " + e))
    }, []);

    const light = {
        backgroundColor: 'rgb(245, 245, 245)',
        color: 'rgb(39,39,39)',
        border: 'none',
        boxShadow: '0px 0px 5px 1px rgb(200, 198, 198)'
    };
    const dark = {
        backgroundColor: 'rgb(43, 55, 67)',
        color: '#f5f5f5',
        border: 'none',
        boxShadow: '0px 0px 5px 1px rgb(43, 44, 47)'
    };

    const themeDark = useContext(Theme).dark;

    //Filter button
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
        if (!open) {
            let option = document.querySelector('.option') as HTMLElement;
            let icon = document.querySelector('.down-icon') as HTMLElement;
            option.style.display = 'block';
            option.style.zIndex = '1';
            icon.style.transform = 'rotate(180deg)';
        }
        else {
            let option = document.querySelector('.option') as HTMLElement;
            let icon = document.querySelector('.up-icon') as HTMLElement;
            option.style.display = 'none';
            icon.style.transform = 'rotate(180deg)';
        }
    };

    //Filter rendering
    const [filter, setFilter] = useState('All');
    const handleFilter = (e: React.MouseEvent<HTMLParagraphElement>) => {
        setFilter(e.currentTarget.textContent!.toString());
    };



    return (
        <div className='country' >
            <form>
                <div className="text-area" style={themeDark ? dark : light}>
                    <CiSearch className='search-icon' />
                    <input type="text" placeholder='Search for a country...' style={{ color: themeDark ? 'white' : 'black' }} />
                </div>
                <div className="select" onClick={handleOpen}>
                    <div className="label" style={themeDark ? dark : light}>
                        <p>Filter by Region</p>
                        {open ? <CiCircleChevUp className='up-icon' /> : <CiCircleChevDown className='down-icon' />}
                    </div>
                    <div className="option" style={themeDark ? dark : light}>
                        <p onClick={(e) => handleFilter(e)} style={{ color: 'gray', borderBottom: '1px solid gray' }}>All</p>
                        <p onClick={(e) => handleFilter(e)} >Africa</p>
                        <p onClick={(e) => handleFilter(e)} >Americas</p>
                        <p onClick={(e) => handleFilter(e)} >Asia</p>
                        <p onClick={(e) => handleFilter(e)} >Europe</p>
                        <p onClick={(e) => handleFilter(e)} >Oceania</p>
                        <p onClick={(e) => handleFilter(e)} >Polar</p>
                    </div>
                </div>
            </form>
            <div className="country-item" style={themeDark ? {
                backgroundColor: 'transparent', color: '#f5f5f5',
                border: 'none'
            } : {
                backgroundColor: 'transparent', color: 'rgb(39,39,39)',
                border: 'none'
            }}>
                {
                    filter == 'All' ? countries.map((item) => <div key={item.name} className='country-card' style={themeDark ? dark : light}>
                        <div className="flag" style={{ width: '100%', height: '50%', border: '1px solid black' }}></div>
                        <div className="description">
                            <h2>{item.name}</h2>
                            <p>Population:  <span style={{ color: themeDark ? 'rgb(174, 174, 174)' : 'rgb(130,130,130)' }}>{item.population.toLocaleString()}</span> </p>
                            <p>Region:  <span style={{ color: themeDark ? 'rgb(174, 174, 174)' : 'rgb(130,130,130)' }}>{item.region}</span> </p>
                            <p>Capital: <span style={{ color: themeDark ? 'rgb(174, 174, 174)' : 'rgb(130,130,130)' }}>{item.capital}</span> </p>
                        </div>
                    </div>) : countries.filter((country) => country.region == filter).map((item) => <div key={item.name} className='country-card' style={themeDark ? dark : light}>
                        <div className="flag" style={{ width: '100%', height: '50%', border: '1px solid black' }}></div>
                        <div className="description">
                            <h2>{item.name}</h2>
                            <p>Population:  <span style={{ color: themeDark ? 'rgb(174, 174, 174)' : 'rgb(130,130,130)' }}>{item.population.toLocaleString()}</span> </p>
                            <p>Region:  <span style={{ color: themeDark ? 'rgb(174, 174, 174)' : 'rgb(130,130,130)' }}>{item.region}</span> </p>
                            <p>Capital: <span style={{ color: themeDark ? 'rgb(174, 174, 174)' : 'rgb(130,130,130)' }}>{item.capital}</span> </p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Country

// countries.filter((country) => country.region == filter).map((item) => <div key={item.name} className='country-card' style={themeDark ? dark : light}>
// <div className="flag" style={{ width: '100%', height: '50%', border: '1px solid black' }}></div>
// <div className="description">
//     <h2>{item.name}</h2>
//     <p>Population:  <span style={{ color: themeDark ? 'rgb(174, 174, 174)' : 'rgb(130,130,130)' }}>{item.population.toLocaleString()}</span> </p>
//     <p>Region:  <span style={{ color: themeDark ? 'rgb(174, 174, 174)' : 'rgb(130,130,130)' }}>{item.region}</span> </p>
//     <p>Capital: <span style={{ color: themeDark ? 'rgb(174, 174, 174)' : 'rgb(130,130,130)' }}>{item.capital}</span> </p>
// </div>
// </div>)