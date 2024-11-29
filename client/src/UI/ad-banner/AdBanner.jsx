import React from 'react'
import { Link } from 'react-router-dom'

function AdBanner({image}) {
    return (
        <div className='mt-16 w-full h-[266px] rounded-lg overflow-hidden'>
            <Link to='/ad-page'>
                <div className="relative">
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-sm">
                        SELLER OF THE MONTH
                    </div>
                </div>
                <img src={image} alt="ad" className='w-full h-full object-cover' />
            </Link>
        </div>
    )
}

export default AdBanner