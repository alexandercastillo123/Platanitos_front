import React from 'react'
import Image from 'next/image'
import platanitos from '../../../../public/platanitosSVG.svg'
import Link from 'next/link'

export default function Header() {
    return (
        <header className='h-15 w-full bg-[#eee] top-0 z-50 flex justify-center items-center gap-2 sticky'>
            <div>
                <Link
                        href={'/home'}
                >
                    <Image
                        src={platanitos}
                        alt='platanitos'
                        width={154}
                        height={37}
                    />
                </Link>
            </div>
            <div className='bg-[#f8f9fa] w-10 h-8 flex items-center justify-center rounded-sm'>
                <Image
                    src={'https://flagcdn.com/pe.svg'}
                    alt='peru'
                    width={24}
                    height={16}
                />
            </div>
        </header>
    )
}
