import React, { useEffect } from 'react'
import { useAppDispatch } from 'hooks/reduxHooks'
import { getCatsData } from 'store/slices/catsSlice'
import { Routes, Route } from 'react-router-dom'
import HomePage from 'pages/homePage/HomePage'
import Layout from 'components/layout/Layout'
import FavoritesPage from 'pages/favoritesPage/FavoritesPage'

function App() {
  const dispatch = useAppDispatch()

  
  useEffect(() => {
    dispatch(getCatsData())
  }, [dispatch])

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>} >
            <Route index element={<HomePage/>} />
            <Route path="favs" element={<FavoritesPage/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
