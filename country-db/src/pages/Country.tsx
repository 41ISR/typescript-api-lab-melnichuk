import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { ICountry } from "./Index"

export const Country = () => {
    const {country} = useParams()
    const [info, setInfo] = useState<ICountry>()

    const prettyNumbers = (num: number): string => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }

    useEffect(() => {
        const guu = async () => {
            try {
                const data = await fetch(`https://countries-api-abhishek.vercel.app/countries/${country}`)
                const result = await data.json()

                if(result.error) throw new Error(result.message)

                setInfo(result.data)
            } catch (error) {
                console.error(error);
            }
        }
        guu()
        
    }, [])

    return(
        info &&(
            <div className="county-info">
                <div className="main-info">
                    <div className="info-main">
                        <div className="country-name">{info.name}</div>
                        <div className="country-capital">Capital: {info.capital}</div>
                        <div className="country-region">Region: {info.region} ({info.subregion})</div>
                    </div>
                    <div className="country-flag">
                        <img src={info.flag} alt={`${info.name}'s flag`} />
                    </div>
                </div>
                <div className="stats-info">
                    <div className="country-population">Population: {prettyNumbers(info.population)}</div>
                    <div className="country-area">Area: {prettyNumbers(info.area)} km<sup>2</sup></div>
                    <div className="country-coordinates">Coordinates: lat. {info.coordinates.latitude} | long. {info.coordinates.longitude}</div>
                    <div className="country-money">Currency: {info.currency}</div>
                </div>
                <div className="extra-info">
                    <div className="country-timezones">
                        Timezones: 
                        {info.timezones.map((el, index) => ( <span key={index}>{el} </span> ))}
                    </div>
                    <div className="country-languages">
                        Languages: 
                        {info.languages.map((el, index) => ( <span key={index}>{el}</span> ))}
                    </div>
                    <div className="country-borders">
                        Borders: 
                        {info.borders.map((el, index) => ( <span key={index}>{el}</span> ))}
                    </div>
                </div>
            </div>
        )
    )
}