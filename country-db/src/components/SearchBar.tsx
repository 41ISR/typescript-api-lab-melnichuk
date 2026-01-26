import type { ChangeEvent, FormEvent } from "react"

export interface ISearch {
    s_txt: string,
    inputEvent: (e: ChangeEvent<HTMLInputElement>) => void
}

export const SearchBar = ({s_txt, inputEvent}:ISearch) => {
    return(
        <div className="search-bar">
            <label htmlFor="search">Search:</label>
            <input type="text" id="search" name="search"
                    value={s_txt} onChange={inputEvent} />
        </div>
    )
}