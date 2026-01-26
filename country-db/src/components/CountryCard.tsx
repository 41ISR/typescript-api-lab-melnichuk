import type { IShortCountry } from "../pages/Index"

interface ICountryCard {
    data: IShortCountry,
    cardClickEvent: (country: string) => void,
}

export const CountryCard = ({data, cardClickEvent}: ICountryCard) => {
    
    return(
        <div className="country-card" onClick={() => cardClickEvent(data.name)}>
            <h2 className="country-name">{data.name}</h2>
            <div className="country-img">
                <img src={data.flag} alt={`Flag of ${data.name}`} className="country-flag" />
            </div>
        </div>
    )
}