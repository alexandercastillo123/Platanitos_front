"use client"
import { Field, FieldLabel } from '@/components/ui/field'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { InputGroup, InputGroupButton, InputGroupInput} from '@/components/ui/input-group'
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxTrigger, ComboboxValue } from '@/components/ui/combobox'
import paisesData from '../_data/paises.json'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import peru from '@/assets/banderaperu.jpg'

interface props {
    type: string,
    id: string
    label: string
    register?: UseFormRegisterReturn
}
export default function FloatingLabel({ type, id, label, register } : props) {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword && showPassword ? 'text' : type
    const { onChange, ...restRegister } = register || {}

    const handleTelInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(inputType === 'tel'){
            e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0,9)
        }
        onChange?.(e)
    }
    return (
        <Field className='relative flex flex-row gap-0'>
            {type==='tel' && (
                <Combobox items={paisesData} defaultValue={paisesData[0]}>
                    <ComboboxTrigger render={
                        <Button variant={'outline'} className="w-32! h-14.5 font-normal rounded-r-none p-4 cursor-pointer">
                            <Image
                                src={peru}
                                alt={'peru'}
                                width={16}
                                height={24}
                            />
                            <ComboboxValue/>
                        </Button>
                    }/>
                    <ComboboxContent side='bottom' sideOffset={0} align='start' className={'min-w-32! shadow-none absolute'}>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList>
                            {(item) => (
                            <ComboboxItem key={item.value} value={item} className={'cursor-pointer'}>
                                <Image src={peru} alt={item.label}
                                    width={16}
                                    height={24}
                                />{item.label}
                            </ComboboxItem>
                            )}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>
            )}
            <InputGroup className={`h-auto ${type === 'tel' ? "rounded-l-none ": ''}`}>
                <InputGroupInput
                    placeholder=' hola'
                    type={inputType}
                    {...restRegister}
                    id={id}
                    maxLength={inputType === 'tel' ? 9 : 255}
                    className='peer placeholder-transparent! h-14! pt-4'
                    onChange={e => handleTelInput(e)}
                />
                <FieldLabel 
                    className='absolute transition-all top-3.5 left-2.5 -translate-y-1/2 text-gray-600 text-xs
                        peer-focus:top-3.5
                        peer-focus:text-xs
                        
                        peer-placeholder-shown:top-1/2
                        peer-placeholder-shown:text-sm
                        cursor-text
                        '
                    htmlFor={id}
                    >
                    {label}
                </FieldLabel>
                {isPassword && (
                    <InputGroupButton
                        onClick={() => setShowPassword(!showPassword)}
                        className='cursor-pointer p-3 h-full hover:bg-white'
                    >
                        {showPassword ? <EyeOff /> : <Eye />}
                    </InputGroupButton>
                )}
            </InputGroup>
        </Field>
    )
}
