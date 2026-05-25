import userData from '../_data/usuario.json'
import {useState} from 'react'

export const useLogin = () => {
    const [userFound, setUserFound] = useState(false)
    const checkUserExists = (identificador: string) => {
        const exits = userData.some(
            user => user.email === identificador || user.tel === identificador
        )
        setUserFound(exits)
        return exits
    }
    const reset = () => setUserFound(false)

    return {
        userFound,
        checkUserExists,
        reset
    }
}