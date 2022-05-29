import React, { FC } from 'react'

interface FavIcoProps {
    color: string;
}

const FavIco: FC<FavIcoProps> = ({color}) => {
    return (
        <svg width="40" height="37" viewBox="0 0 40 37" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.4464 32.581L18.4435 32.5784C13.2532 27.8719 9.10769 24.1077 6.2356 20.5963C3.38649 17.1129 2 14.123 2 11C2 5.94457 5.94457 2 11 2C13.8744 2 16.6645 3.34787 18.4773 5.47668L20 7.26481L21.5227 5.47668C23.3355 3.34787 26.1256 2 29 2C34.0554 2 38 5.94457 38 11C38 14.1231 36.6135 17.1131 33.764 20.5993C30.8918 24.1132 26.7468 27.8818 21.5571 32.5979C21.5564 32.5985 21.5557 32.5992 21.5549 32.5999L20.0051 34L18.4464 32.581Z" fill={color} stroke="#F24E1E"strokeWidth="4"/>
        </svg>
    )
}

export default FavIco