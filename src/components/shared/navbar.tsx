import SubNavbar from './subNavBar';
import Link from 'next/link';
import { SearchIcon, Heart, Car, User } from 'lucide-react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
} from '../ui/input-group';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';

export function Navbar() {
    return (
        <header>
            <div className='flex flex-row bg-[#616161] px-5 items-center justify-center'>
                <div className='flex flex-row justify-between text-white w-full max-w-7xl'>
                    <div>
                        <ul className='grid grid-cols-4 justify-center text-sm'>
                            <li className='flex items-center justify-center'><Link href='/home' className='p-3 w-full h-full text-center items-center'>Platanitos</Link></li>
                            <li className='flex items-center justify-center'><Link href='/home' className='p-3 w-full h-full text-center items-center'>Comida</Link></li>
                            <li className='flex items-center justify-center'><Link href='/home' className='p-3 w-full h-full text-center items-center'>Hogar</Link></li>
                            <li className='flex items-center justify-center'><Link href='/home' className='p-3 w-full h-full text-center items-center'>Deporte</Link></li>
                        </ul>
                    </div>

                    <div className='flex items-center justify-center'>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder='Pais' />
                            </SelectTrigger>
                            <SelectContent className='bg-white'>
                                <SelectGroup>
                                    <SelectItem value='chile'>
                                        <img src="https://phaphut45mexuz.s3.amazonaws.com/flags/cl.webp" alt="" className='h-4'/>
                                        Chile
                                    </SelectItem>
                                    <SelectItem value='peru'>
                                        <img src="https://phaphut45mexuz.s3.amazonaws.com/flags/pe.webp" alt="" className='h-4' />
                                        Perú
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className='flex px-5 justify-center'>
                <div className='flex flex-row items-center w-full max-w-7xl h-16'>
                    <picture className='me-4'>
                        <img className='h-14' src='/img/platanitos.png' alt='Logo Platanitos' />
                    </picture>
                    <InputGroup className='h-12 flex-1 max-w-3xl'>
                        <InputGroupInput placeholder='Busca lo que necesitas' />
                        <InputGroupAddon align={'inline-end'}>
                            <SearchIcon />
                        </InputGroupAddon>
                    </InputGroup>
                    <div className='flex flex-row items-center justify-center space-x-6 ml-6'>
                        <Link href='/favorito' className='flex flex-col items-center gap-0.5 text-xs hover:text-green-900'>
                            <Heart />
                            <p>Favoritos</p>
                        </Link>
                        <Link href='/carrito' className='flex flex-col items-center gap-0.5 text-xs hover:text-green-900'>
                            <Car />
                            <p>Carrito</p>
                        </Link>
                        <Link href='/' className='flex flex-col items-center gap-0.5 text-xs hover:text-green-900'>
                            <User />
                            <p>Cuenta</p>
                        </Link>
                    </div>
                </div>
            </div>

            <nav>
                <SubNavbar />
            </nav>
        </header>
    )
}