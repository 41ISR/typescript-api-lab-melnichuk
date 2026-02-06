
import { FilterBar, type IFilter } from "./FilterBar"
import { SearchBar, type ISearch } from "./SearchBar"

interface IBar extends IFilter, ISearch {}

export const Bar = ({clickEvent, s_txt, inputEvent}:IBar) => {
    return (
        <div className="bar">
            {/* fitlsers */}
            <FilterBar clickEvent={clickEvent} />

            {/* search */}
            <SearchBar s_txt={s_txt} inputEvent={inputEvent} />
        </div>
    )
}