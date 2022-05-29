import React, { FC } from 'react'
import CatItem from 'components/catItem/CatItem'
import { useAppSelector } from 'hooks/reduxHooks'

const FavoritesPage: FC = () => {
    const {favorites} = useAppSelector(state => state.cats)
    return (
        <section className="favs cats-content">
            {
                favorites.map(fav => <CatItem catData={fav} key={fav.id} />)
            }
        </section>
    )
}

export default FavoritesPage