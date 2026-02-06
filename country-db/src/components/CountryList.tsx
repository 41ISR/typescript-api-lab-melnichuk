import type { IShortCountry } from "../pages/Index"
import { CountryCard } from "./CountryCard"


interface ICountryList {
    data: IShortCountry[],
    cardClickEvent: (country: string) => void,
}

export const CountryList = ({data, cardClickEvent}: ICountryList) => {

    return(
        <div className="country-list">
            {data.map((el) => (
                <CountryCard key={el.id} data={el} cardClickEvent={cardClickEvent} /> 
            ))}
        </div>
    )
}