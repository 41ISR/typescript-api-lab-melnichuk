import { useState } from "react"
import type { IShortCountry } from "../pages/Index"

interface ICountryCard {
    data: IShortCountry,
    cardClickEvent: (country: string) => void,
}

export const CountryCard = ({data, cardClickEvent}: ICountryCard) => {
    console.log(data.name, data.flag);
    
    const [pl, setPl] = useState(data.flag)
    
    return(
        <div className="country-card" onClick={() => cardClickEvent(data.name)}>
            <h2 className="country-name">{data.name}</h2>
            <div className="country-img">
                <img src={pl} onError={() => setPl('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE3CETL_OertJKScoHfblxs6CBrKGVCmVESw&s')} alt={`Flag of ${data.name}`} className="country-flag" />
            </div>
        </div>
    )
}