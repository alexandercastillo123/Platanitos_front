import { Wallet, Book, List, KeySquareIcon, Handshake, Trees } from 'lucide-react'

export interface OpcionesFooter {
    title: string;
    icon: any
}

export const OPCIONES_FOOTER_MOCK: OpcionesFooter[] = [
    {
        title: 'Factura electronica',
        icon: Wallet
    },
    {
        title: 'Libro de reclamaciones',
        icon: Book
    },
    {
        title: 'Terminos y condiciones',
        icon: List
    },
    {
        title: 'Politica y privacidad',
        icon: KeySquareIcon
    },
    {
        title: 'Socios platanitos',
        icon: Handshake
    },
    {
        title: 'Operador economico autorizado',
        icon: Trees
    },
]