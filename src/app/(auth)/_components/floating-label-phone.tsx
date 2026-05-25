"use client"
import { Field, FieldLabel } from '@/components/ui/field'
import { UseFormRegisterReturn } from 'react-hook-form'
import { InputGroup, InputGroupInput } from '@/components/ui/input-group'
import SelectPrefijos from './select-prefijos'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    id: string
    register?: UseFormRegisterReturn
    focus?: boolean
    onPrefixChange?: (prefix: string) => void
    hasError?: boolean
}

export default function FloatingLabelPhone({ label, id, register, focus = false, onPrefixChange, hasError = false, className, ...props }: Props) {
    const { onChange, ...restRegister } = register || {}

    const handleTelInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numero = e.target.value.replace(/[^0-9]/g, '').slice(0, 9)
        e.target.value = numero
        onChange?.(e)
    }

    return (
        <Field className="relative flex flex-row gap-0 w-full">
            <SelectPrefijos onPrefixChange={onPrefixChange} />
            <InputGroup className={`h-auto w-full rounded-l-none focus-within:ring-0! focus-within:ring-offset-0! ${hasError ? 'border-red-500! focus-within:border-red-500!' : 'focus-within:border-[#55b849]!'}`}>
                <InputGroupInput
                    placeholder=" "
                    type="tel"
                    {...restRegister}
                    {...props}
                    id={id}
                    maxLength={9}
                    className={`peer placeholder-transparent! h-14! pt-4 transition-all w-full ${className}`}
                    onChange={handleTelInput}
                    autoFocus={focus}
                />
                <FieldLabel 
                    className="absolute transition-all top-3.5 left-2.5 -translate-y-1/2 text-gray-600 text-xs
                        peer-focus:top-3.5
                        peer-focus:text-xs
                        peer-placeholder-shown:top-1/2
                        peer-placeholder-shown:text-sm
                        cursor-text"
                    htmlFor={id}
                >
                    {label}
                </FieldLabel>
            </InputGroup>
        </Field>
    )
}
