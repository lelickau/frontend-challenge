import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header/Header'

const Layout: FC = () => {
    return (
        <>
            <Header/>
            <main className="main">
                <div className="container">
                    <Outlet/>
                </div>
            </main>
        </>
    )
}

export default Layout