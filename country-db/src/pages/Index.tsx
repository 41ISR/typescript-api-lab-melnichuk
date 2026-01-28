import { Header } from "../components/Header"
import { Bar } from "../components/Bar"
import { useEffect, useState, type ChangeEvent} from "react"
import { CountryList } from "../components/CountryList"
import { useNavigate } from "react-router-dom"
import { ApiError, client } from "../api/api"
import { LoadingView } from "../components/Loading"
import { ErrorView } from "../components/ErrorView"

export const REGIONS = ['Asia','Europe','Africa','Americas','Oceania','North America','South America'] as const
export type TRegion = typeof REGIONS[number] | ''


export interface ICountry {
    "name": string,
    "capital": string,
    "region": string,
    "subregion": string,
    "population": number,
    "area": number,
    "coordinates": {
        "latitude": number,
        "longitude": number
    },
    "borders": string[],
    "timezones": string[],
    "currency": string,
    "languages": string[],
    "flag": string
}

export type IShortCountry = Pick<ICountry, 'name' | 'region' | 'flag' >


export const Index = () => {
    const [countries, setCountries] = useState<IShortCountry[]>([])
    const [filtCountries, setFiltCountries] = useState<IShortCountry[]>(countries)
    const [searchTxt, setSearchTxt] = useState('')
    const [filterStr, setFilterStr] = useState<TRegion>('')
    const [error, setError] = useState<null | string>(null)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    // ----------

    const handleFilterClick = (el: TRegion) => {
        setFilterStr(el)
    }

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target
        setSearchTxt(value)
    }

    const handleCardClick = (country: string) => {
        navigate(`/countries/${country.toLowerCase()}`)
    }

    // -----------

    useEffect(() => {
        const getCountries = async () => {
            setIsLoading(true)
            try {
                const response = await client.getCountries()

                if(response.statusCode == 200 && response.data){
                    const shrim: ICountry[] = response.data.filter((el: ICountry) => el.name !== 'Xenocera')
                    const filted = Array.from(new Set(shrim.map(el => JSON.stringify(el)))).map(str => JSON.parse(str))

                    setCountries(filted)
                } else {
                    setError(response.message)
                }
            } catch (error) {
                if(error instanceof ApiError) {
                    setError(error.message)
                } else{
                    setError('Unexpected error')
                }
            } finally {
                setIsLoading(false)
            }
        }

        getCountries()
    }, [])

    useEffect(() => {
        if(filterStr !== '') setFiltCountries(countries.filter((el) => el.region == filterStr).filter((el) => el.name.search(searchTxt) >= 0))
        else setFiltCountries(countries.filter((el) => el.name.toLowerCase().search(searchTxt) >= 0))

    }, [countries, filterStr, searchTxt])

    // ----------

    return(
        <div className="app">
            {/* Header */}
            <Header />
            {/* Bar filters & search*/}
            <Bar clickEvent={handleFilterClick} inputEvent={handleSearchChange} s_txt={searchTxt} />
            {/* Country List */}
            {isLoading 
            ? <LoadingView />
            : error
            ? <ErrorView />
            : <CountryList cardClickEvent={handleCardClick} data={filtCountries}/> }
            
        </div>
    )
}