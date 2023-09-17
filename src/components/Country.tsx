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
                        <p>Africa</p>
                        <p>America</p>
                        <p>Asia</p>
                        <p>Europe</p>
                        <p>Oceania</p>
                    </div>
                </div>
            </form>
            <div className="country-item">
                {
                    countries.map((item) => <p>{item.name}</p>)
                }
            </div>
        </div>
    )
}

export default Country