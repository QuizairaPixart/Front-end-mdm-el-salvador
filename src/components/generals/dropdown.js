export default function Dropdown(props) {
    return (
        <div class="btn-group dropleft">
            <button
                type="button"
                class="btn btn-dark dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            ></button>
            <div class="dropdown-menu">
                <a class="dropdown-item" href={props.url}>
                    Acciones
                    <font color="black">
                        <i class="fas fa-gear"></i>
                    </font>
                </a>
                <a class="dropdown-item" href="#" onClick={props.delete}>
                    Eliminar
                    <font color="black">
                        <i class="fas fa-trash"></i>
                    </font>
                </a>
            </div>
        </div>
    );
}
