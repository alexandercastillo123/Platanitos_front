import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

interface props {
    type: string,
    id: string
    label: string
}
export default function FloatingLabel({ type, id, label } : props) {
    return (
        <Field className='relative'>
            <Input
                placeholder=' hola'
                type={type}
                name='email'
                id={id}
                className='peer placeholder-transparent! h-14 pt-4'
            >
            </Input>
            <FieldLabel 
                className='absolute transition-all top-4 left-3 -translate-y-1/2 text-gray-600 text-xs
                    peer-focus:top-4
                    peer-focus:text-xs
                    
                    peer-placeholder-shown:top-1/2
                    peer-placeholder-shown:text-sm
                    cursor-text
                    '
                htmlFor={id}>
                {label}
            </FieldLabel>
        </Field>
    )
}
