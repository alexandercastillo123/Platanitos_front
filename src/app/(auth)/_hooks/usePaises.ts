import {useCallback, useState} from "react"
import {paises, RestCountryResponseAPI} from "@/app/(auth)/_types/paises"
import {paisesService} from "@/services/paisesService"


export const usePaises = () => {
    const [paises, setPaises] = useState<paises[]>([])
    const [codigo, setCodigo] = useState<string>('pe')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handlePaises = useCallback( async () => {
        setLoading(true)
        setError(null)
        try{
            const respuesta = await paisesService.getPaises()
            const paisesFormateados: paises[] = respuesta
                .filter((pais: RestCountryResponseAPI) => pais.idd?.root)
                .map((pais: RestCountryResponseAPI) => {
                    const sufijo = pais.idd.suffixes?.[0] ?? ""; 
                    const codigo = pais.idd.root + sufijo;
                    return {
                        value: pais.cca2.toLowerCase(),
                        label: codigo,
                        flag: pais.flags.svg,
                        name: pais.name.common
                    };
                })
                .sort((a: paises, b: paises) => a.label.localeCompare(b.label, undefined, { numeric: true }));
                
            setPaises(paisesFormateados);
            setCodigo(prev => (
                paisesFormateados.some(pais => pais.value === prev)
                    ? prev
                    : (paisesFormateados[0]?.value ?? '')
            ))
        } catch(err: unknown){
            setError(err instanceof Error ? err.message : "Error desconocido")
        } finally {
            setLoading(false)
        }
    }, [])

    return {
        paises,
        codigo,
        setCodigo,
        handlePaises,
        loading,
        error
    }
}