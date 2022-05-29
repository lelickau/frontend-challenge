import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'

import './header.scss'

const setActive = ({isActive}: {isActive:boolean}) =>
        isActive ? 'header__item header__item--active' : 'header__item'

const Header: FC = () => {
    return (
        <header className="header">
            <div className="container">
                <nav className="header__nav">
                    <ul className="header__list">
                        <NavLink to="/" className={setActive}>
                            <li>Все котики</li>
                        </NavLink>
                        <NavLink to="favs" className={setActive}>
                            <li>Любимые котики</li>
                        </NavLink>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header