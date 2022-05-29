import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks'
import { getCatsData, setFetching } from 'store/slices/catsSlice'
import CatItem from 'components/catItem/CatItem'

import './homePage.scss'

const HomePage:FC = () => {
    const dispatch = useAppDispatch()
    const {cats, paginationCount, fetching} = useAppSelector(state => state.cats)

    useEffect(() => {
        if (fetching) {
            dispatch(getCatsData())
        }
    }, [fetching])

    useEffect(() => {
        const scrollHandler: EventListener = (e: Event) => {
            const target = e.target as Document
            const totalScrollHeight = target.documentElement.scrollHeight
            const scrollingPosition = target.documentElement.scrollTop
            const windowHeight = window.innerHeight

            if ((totalScrollHeight - (scrollingPosition + windowHeight) < 100) && (cats.length < paginationCount)) {
                dispatch(setFetching(true))
            }
        }

        document.addEventListener('scroll', scrollHandler)

        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [cats, paginationCount])

    return (
        <section className="home">
            <div className="home__content cats-content">
            {
                cats.map(cat => <CatItem key={cat.id} catData={cat}/>)
            }
            </div>
            {fetching ? <div className="home__fetching">... загружаем еще котиков ...</div> : ''}
        </section>
    )
}

export default HomePage