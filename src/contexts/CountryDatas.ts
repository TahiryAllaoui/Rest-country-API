import { createContext } from "react";

export interface CountryType {
    name: string;
    flag: string;
    nativeName: string;
    population: number;
    region: string;
    subRegion: string;
    capital: string;
    topLevelDomain: string;
    currencies: string;
    languages: string[];
    borderCountries: string[];
};

export interface ICountryType {
    countries: CountryType[]
    setCountries: (c: CountryType[]) => void
}

const CountryDatas = createContext<ICountryType>({
    countries: [],
    setCountries: (_c: CountryType[]) => { }
});

export default CountryDatas;