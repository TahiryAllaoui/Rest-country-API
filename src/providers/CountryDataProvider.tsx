import { useState } from "react";
import Country, { CountryType } from "../contexts/CountryDatas";



function CountryDataProvider({ children }: { children: any }) {

    const [countries, setCountries] = useState<CountryType[]>([])

    return (
        <Country.Provider value={{
            countries: countries,
            setCountries: setCountries
        }}>
            {children}
        </Country.Provider>
    )
}

export default CountryDataProvider