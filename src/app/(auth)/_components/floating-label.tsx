"use client"
import { Field, FieldLabel } from '@/components/ui/field'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { InputGroup, InputGroupButton, InputGroupInput} from '@/components/ui/input-group'
import SelectPrefijos from '../_components/select-prefijos'


interface props {
    type: string
    id: string
    label: string
    register?: UseFormRegisterReturn
    focus?: boolean
    onPrefixChange?: (prefix: string) => void
}
export default function FloatingLabel({ type, id, label, register, focus = false, onPrefixChange} : props) {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword && showPassword ? 'text' : type
    const { onChange, ...restRegister } = register || {}

    const handleTelInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(inputType === 'tel'){
            const numero = e.target.value.replace(/[^0-9]/g, '').slice(0,9)
            e.target.value = numero
            onChange?.(e)
            return
        }
        onChange?.(e)
    }
    return (
        <Field className='relative flex flex-row gap-0'>
            {type==='tel' && (
                <SelectPrefijos onPrefixChange={onPrefixChange} />
            )}
            <InputGroup className={`h-auto ${type === 'tel' ? "rounded-l-none ": ''} focus-within:ring-0! focus-within:ring-offset-0! focus-within:border-[#55b849]!`}>
                <InputGroupInput
                    placeholder=' hola'
                    type={inputType}
                    {...restRegister}
                    id={id}
                    maxLength={inputType === 'tel' ? 9 : 255}
                    className='peer placeholder-transparent! h-14! pt-4 transition-all'
                    onChange={e => handleTelInput(e)}
                    autoFocus={focus}
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
