// Componente Navbar
import SubNavbar from './subNavBar';
import { SearchIcon, Heart, Coins, Car, User } from 'lucide-react';
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
    SelectLabel,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from '../ui/select';

export function Navbar() {
    return (
        <header>
            <div>
                <div className='flex flex-row bg-[#616161] px-5 items-center justify-center'>
                    <div className='flex flex-row justify-between text-white w-324'>
                        <div>
                            <ul className='grid grid-cols-4 justify-center text-sm'>
                                <li className='flex items-center justify-center '><a href='' className='p-3 w-full h-full text-center items-center'>Platanitos</a></li>
                                <li className='flex items-center justify-center '><a href='' className='p-3 w-full h-full text-center items-center'>Comida</a></li>
                                <li className='flex items-center justify-center '><a href='' className='p-3 w-full h-full text-center items-center'>Hogar</a></li>
                                <li className='flex items-center justify-center '><a href='' className='p-3 w-full h-full text-center items-center'>Deporte</a></li>
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

                <div className='flex px-5 mx-[292.5px] justify-center'>
                    <div className='flex flex-row items-center w-324 h-24.5'>
                        <picture className='me-4'>
                            <img className='h-14.25 w-38.25' src='platanitosSVG.svg' alt='Logo de platanitos en  formato SVG' />
                        </picture>
                        <InputGroup className='h-12 '>
                            <InputGroupInput className='w-[865.53]' placeholder='Busca lo que necesitas' />
                            <InputGroupAddon align={'inline-end'}>
                                <SearchIcon />
                            </InputGroupAddon>
                        </InputGroup>
                        <div className='flex flex-row items-center justify-center space-x-5 ml-5'>
                            <div className='flex items-center justify-center'>
                                <a href='/favoritos' className='w-full h-full flex flex-col items-center gap-0.5 text-xs space-y-1 hover:text-green-900'>
                                    <Heart />
                                    <p> Favoritos </p>
                                </a>
                            </div>
                            <div>
                                <a href="" className='w-full h-full flex flex-col items-center gap-0.5 text-xs space-y-1 hover:text-green-900'>
                                    <Coins className='' />
                                    <p> Puntos </p>
                                </a>
                            </div>
                            <div>
                                <a href='' className='w-full h-full flex flex-col items-center gap-0.5 text-xs space-y-1 hover:text-green-900'>
                                    <Car />
                                    <p> Carrito </p>
                                </a>
                            </div>
                            <div>
                                <a href="" className='w-full h-full flex flex-col items-center gap-0.5 text-xs space-y-1 hover:text-green-900'>
                                    <User />
                                    <p> Cuenta </p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <nav>
                    <SubNavbar />
                </nav>
            </div>
        </header >
    )
}