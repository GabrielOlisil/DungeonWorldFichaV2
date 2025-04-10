import { useEffect } from "react";
import { Link } from "react-router-dom";
import { themeChange } from "theme-change";
import keycloak from "~/lib/keycloak";


export default function Navbar() {
    useEffect(() => {
        themeChange(false)
        // 👆 false parameter is required for react project
    }, [])
    return (
        <>
            <nav className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><Link to="/">Homepage</Link></li>
                            <li><Link to="/personagens">Personagens</Link></li>
                            <li><Link to="/personagens/novo">Criar</Link></li>
                            <li><span onClick={() => keycloak.logout({ redirectUri: `${import.meta.env.VITE_REDIRECT_URL}` })}>Sair</span></li>
                        </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <Link to="/" className="btn btn-ghost text-sm sm:text-xl">Dungeon World Ficha</Link>
                </div>
                <div className="navbar-end">
                    <select data-choose-theme className="select select-ghost max-w-fit">
                        <option value="light">Light</option>
                        <option value="nord">Nord</option>
                        <option value="cupcake">Cupcake</option>
                        <option value="pastel">Pastel</option>
                        <option value="caramellatte">Caramellatte</option>
                        <option value="autumn">Autumn</option>
                        <option value="retro">Retro</option>
                        <option value="dark">Dark</option>
                        <option value="dim">Dimm</option>
                        <option value="night">Night</option>
                        <option value="dracula">Dracula</option>
                    </select>
                </div>
            </nav>
        </>
    )
}