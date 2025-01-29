import "./Header.css"
function Header(props){
    return(
        <header>
            <h2>{props.namePage}</h2>
            <nav>
                <ul>
                    <li><a href={props.link1} class="btn btn-success">{props.nome1}</a></li>
                    <li><a href={props.link2} class="btn btn-warning">{props.nome2}</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header