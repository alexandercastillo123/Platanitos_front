import { RestCountryResponseAPI } from "@/app/(auth)/_types/paises";

export const paisesService = {
    getPaises: async (): Promise<RestCountryResponseAPI[]> => {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca2,idd")
        if(!response.ok){
            const error = await response.json().catch(() => ({}))
            throw new Error(error.message) 
        }
        return response.json()
    }
}