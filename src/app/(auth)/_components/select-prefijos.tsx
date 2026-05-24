'use client'
import {useEffect, useMemo} from 'react'
import { Button } from '@/components/ui/button'
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxTrigger, ComboboxValue } from '@/components/ui/combobox'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { usePaises } from '../_hooks/usePaises'

interface props {
    onPrefixChange?: (prefix: string) => void
}
export default function SelectPrefijos({ onPrefixChange }: props) {
    const {paises, handlePaises, codigo, setCodigo, error, loading} = usePaises()
    useEffect(() => {
        handlePaises()
    }, [handlePaises])

    const paisSeleccionado = useMemo(
        () => paises.find(p => p.value === codigo),
        [paises, codigo]
    )

    useEffect(() => {
        onPrefixChange?.(paisSeleccionado?.label ?? '')
    }, [paisSeleccionado?.label, onPrefixChange])
    
    return (
            <Combobox items={paises} value={codigo} onValueChange={(value) => setCodigo(value)} disabled={!!error || loading}>
            <ComboboxTrigger render={
                <Button variant={'outline'} className="w-32! h-14.5 font-normal rounded-r-none p-4 cursor-pointer">
                    {loading ? (
                        <div>...</div>
                    ):(
                        <>
                            {paisSeleccionado && (
                                <div className="relative w-6 h-4 shrink-0"> 
                                    <Image
                                        src={paisSeleccionado.flag} 
                                        alt={paisSeleccionado.name}
                                        fill
                                        sizes="24px"
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <ComboboxValue/>
                            <ChevronDown/>
                        </>
                    )}
                </Button>
            }/>
            <ComboboxContent side='bottom' sideOffset={0} align='start' className={'min-w-32! shadow-none absolute'}>
                    {error ? (
                        <ComboboxEmpty>{error}</ComboboxEmpty>
                    ) : (
                        <>
                            <ComboboxEmpty>No se encontraron resultados.</ComboboxEmpty>
                            <ComboboxInput showTrigger={false} className={'hidden'}></ComboboxInput>
                            <ComboboxList>
                                {(pais) => (
                                <ComboboxItem key={pais.value} value={pais.value} className={'cursor-pointer flex items-center'}>
                                    <div className="relative w-6 h-4 shrink-0">
                                        <Image 
                                            src={pais.flag} 
                                            alt={pais.name}
                                            fill
                                            sizes="24px"
                                            className="object-cover"
                                        />
                                    </div>
                                    {pais.label}
                                </ComboboxItem>
                                )}
                            </ComboboxList>
                        </>
                    )}
            </ComboboxContent>
        </Combobox>
    )
}
