import userData from '../_data/usuario.json'
import {useState} from 'react'

export const useLogin = () => {
    const [pass, setPass] = useState(false)
    const handlePass = (data: string) => {
        const verify = data
        const isExits = userData.find(user => user.email === verify || user.tel === verify)
        if(isExits){
            setPass(true)
        }
        else setPass(false)
        console.log(verify)
    }
    const resetPass = () => setPass(false)

    return {
        pass,
        handlePass,
        resetPass
    }
}