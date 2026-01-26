import { REGIONS, type TRegion } from "../pages/Index"

export interface IFilter {
    clickEvent: (el: TRegion) => void,
}

export const FilterBar = ({clickEvent}: IFilter) => {

    return(
        <div className="filter-bar">
            <button onClick={() => clickEvent('')} >All</button>
            {REGIONS.map((el: TRegion, index) => (
                <button key={index} onClick={() => clickEvent(el)}>{el}</button>
            ))}
        </div>
    )
}