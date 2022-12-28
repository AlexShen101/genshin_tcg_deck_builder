import React from 'react'

// We import bootstrap to make our application look better.
// import 'bootstrap/dist/css/bootstrap.css'

// We import NavLink to utilize the react router.
import { NavLink } from 'react-router-dom'

const links = [
    {
        to: '/create_deck',
        label: 'Create Deck',
    },
    {
        to: '/my_decks',
        label: 'My Deck',
    },
    {
        to: '/view_all_cards',
        label: 'All Cards',
    },
]

// Here, we display our Navbar
const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <NavLink className="navbar-brand" to="/">
                    <img
                        style={{ width: 25 + '%' }}
                        src="https://cdn2.steamgriddb.com/file/sgdb-cdn/logo_thumb/fd278a8f5571d3db556bd83198beb09a.png"
                    ></img>
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {links.map((link) => {
                    return (
                        <div
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                            key={`navbar_${link.label}`}
                        >
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to={link.to}>
                                        {link.label}
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    )
                })}
            </nav>
        </div>
    )
}

export default Navbar
