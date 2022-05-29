import React, { FC, MouseEvent, useEffect, useRef, useState } from 'react'
import { useAppDispatch } from 'hooks/reduxHooks'
import { ICat } from 'types/ICat'
import { addFavorite, deleteFavorite } from 'store/slices/catsSlice'
import FavIco from 'components/UI/favIco/FavIco'

import './catItem.scss'

interface CatItemProps {
    catData: ICat;
}

const CatItem: FC<CatItemProps> = ({catData}) => {

    const dispatch = useAppDispatch()
    const [hover, setHover] = useState(false)

    const favRef = useRef<HTMLButtonElement>(null)

    const on = () => setHover(true)
    const off = () => setHover(false)

    useEffect(() => {
        if (!favRef.current) return

        const node = favRef.current
        node.addEventListener('mouseenter', on)
        node.addEventListener('mousemove', on)
        node.addEventListener('mouseleave', off)

        return function () {
            node.removeEventListener('mouseenter', on)
            node.removeEventListener('mousemove', on)
            node.removeEventListener('mouseleave', off)
        }
    }, [])

    const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        if (catData.favorite) {
            dispatch(deleteFavorite(catData.id))
        } else {
            dispatch(addFavorite(catData))
        }
    }

    return (
        <article className="cat">
            <img className="cat__img" src={catData.url} alt={`Cat-${catData.id}`} />
            <button className="cat__btn" onClick={clickHandler} ref={favRef}>
                <FavIco
                    color={(catData.favorite || hover) ? '#F24E1E': ''}
                />
            </button>
        </article>
    )
}

export default CatItem