import "../../css/generals/searchbar.css";

export default function SearchBar(props) {
    return (
        <div class="input-group">
            <div class="form-outline">
                <input
                    type="search"
                    id="form1"
                    class="form-control"
                    onChange={props.search}
                    value={props.value}
                />
                <label
                    class="form-label"
                    for="form1"
                    placeholder="Buscar"
                ></label>
            </div>
            <button type="button" class="btn btn-dark">
                <i class="fas fa-search"></i>
            </button>
        </div>
    );
}
