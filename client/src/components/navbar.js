import React from 'react'

import { NavLink } from 'react-router-dom'

// Here, we display our Navbar
const Navbar = () => {
    let links = [
        {
            to: '/create_deck',
            label: 'Create Deck',
        },
        {
            to: '/dashboard',
            label: 'My Deck',
        },
        {
            to: '/view_all_cards',
            label: 'All Cards',
        },
    ]

    return (
        <div className="mb-4">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <img
                    style={{ width: 15 + '%' }}
                    src="https://cdn2.steamgriddb.com/file/sgdb-cdn/logo_thumb/fd278a8f5571d3db556bd83198beb09a.png"
                ></img>

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
            </nav>
        </div>
    )
}

export default Navbar
