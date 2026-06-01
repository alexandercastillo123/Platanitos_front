export interface Enlace {
    label: string;
    href: string;
}

export interface Seccion {
    titulo: string;
    enlaces?: Enlace[];
    href: string;
}

export interface PrincipalCategory {
    id: string;
    titulo: string;
    emoji: string;
    secciones: Seccion[];
}

export const CATEGORIAS_MOCK: PrincipalCategory[] = [
    {
        id: 'mujeres',
        titulo: 'Mujeres',
        emoji: '🙍‍♀️',
        secciones: [
            {
                titulo: "Zapatos",
                enlaces: [
                    { label: 'Zapatillas', href: '/zapatillas' },
                    { label: 'Sandalias', href: '/sandalias' },
                    { label: 'Outdoor', href: '' },
                    { label: 'Zapatillas de moda', href: '/zapatillas' }
                ],
                href: "/zapatillas"
            },
            {
                titulo: "Ropa",
                enlaces: [
                    { label: 'Deportivo', href: '/ropa' },
                    { label: 'Camisa', href: '/ropa' },
                    { label: 'Polos y camisetas', href: '/ropa' },
                    { label: 'Medias', href: '/ropa' }
                ],
                href: "/ropa"
            },
            {
                titulo: "Accesorios",
                enlaces: [
                    { label: 'Sombrero y Gorro', href: '/accesorios' },
                    { label: 'Billeteras, tarjeteros y organizadores de dinero', href: '/accesorios' },
                    { label: 'Llavero', href: '/accesorios' },
                    { label: 'Accesorios para lentes y lentes de sol', href: '/accesorios' }
                ],
                href: "/accesorios"
            },
            {
                titulo: "Relojes",
                enlaces: [
                    { label: 'Reloj de pulsera', href: '' },
                    { label: 'Reloj de bolsillo', href: '' },
                    { label: 'Llavero', href: '' },
                    { label: 'Accesorios para lentes', href: '' }
                ],
                href: ""
            },
            
        ]
    },
    {
        id: 'hombres',
        titulo: 'Hombres',
        emoji: '🙍‍♂️',
        secciones: [
            {
                titulo: "Zapatos",
                enlaces: [
                    { label: 'Zapatillas', href: '/zapatillas' },
                    { label: 'Sandalias', href: '/sandalias' },
                    { label: 'Outdoor', href: '' },
                    { label: 'Zapatillas de moda', href: '/zapatillas' }
                ],
                href: "/zapatillas"
            },
            {
                titulo: "Ropa",
                enlaces: [
                    { label: 'Deportivo', href: '/ropa' },
                    { label: 'Camisa', href: '/ropa' },
                    { label: 'Polos y camisetas', href: '/ropa' },
                    { label: 'Medias', href: '/ropa' }
                ],
                href: "/ropa"
            },
            {
                titulo: "Cartera y billeteras",
                enlaces: [
                    { label: 'Carteras con asa', href: '/accesorios' },
                    { label: 'Bolsas de hombro', href: '/accesorios' },
                    { label: 'Bolsos cruzados', href: '/accesorios' },
                    { label: 'Mochilas de moda', href: '/accesorios' }
                ],
                href: "/accesorios"
            },
            {
                titulo: "Accesorios",
                enlaces: [
                    { label: 'Sombrero y Gorro', href: '/accesorios' },
                    { label: 'Billeteras, tarjeteros y organizadores de dinero', href: '/accesorios' },
                    { label: 'Llavero', href: '/accesorios' },
                    { label: 'Accesorios para lentes y lentes de sol', href: '/accesorios' }
                ],
                href: "/accesorios"
            },
            {
                titulo: "Relojes",
                enlaces: [
                    { label: 'Reloj de pulsera', href: '' },
                    { label: 'Reloj de bolsillo', href: '' },
                    { label: 'Llavero', href: '' },
                    { label: 'Accesorios para lentes', href: '' }
                ],
                href: ""
            },
            
        ]
    },
    {
        id: 'niñas',
        titulo: 'Niñas',
        emoji: '👧',
        secciones: [
            {
                titulo: "Zapatos",
                enlaces: [
                    { label: 'Zapatillas', href: '/zapatillas' },
                    { label: 'Sandalias', href: '/sandalias' },
                    { label: 'Outdoor', href: '' },
                    { label: 'Zapatillas de moda', href: '/zapatillas' }
                ],
                href: "/zapatillas"
            },
            {
                titulo: "Ropa",
                enlaces: [
                    { label: 'Deportivo', href: '/ropa' },
                    { label: 'Camisa', href: '/ropa' },
                    { label: 'Polos y camisetas', href: '/ropa' },
                    { label: 'Medias', href: '/ropa' }
                ],
                href: "/ropa"
            },
            {
                titulo: "Joyeria",
                enlaces: [
                    { label: 'Broches y prendedores', href: '/accesorios' },
                    { label: 'Brazaletes', href: '/accesorios' },
                ],
                href: "/accesorios"
            },
            {
                titulo: "Accesorios",
                enlaces: [
                    { label: 'Sombreros y gorros', href: '/accesorios' },
                    { label: 'Lentes de sol', href: '/accesorios' },
                ],
                href: "/accesorios"
            },
            {
                titulo: "Relojes",
                enlaces: [
                    { label: 'Reloj de pulsera', href: '' },
                ],
                href: ""
            },
            
        ]
    },
    {
        id: 'niños',
        titulo: 'Niños',
        emoji: '👦',
        secciones: [
            {
                titulo: "Zapatos",
                enlaces: [
                    { label: 'Zapatillas', href: '/zapatillas' },
                    { label: 'Sandalias', href: '/sandalias' },
                    { label: 'Outdoor', href: '' },
                    { label: 'Zapatillas de moda', href: '/zapatillas' }
                ],
                href: "/zapatillas"
            },
            {
                titulo: "Ropa",
                enlaces: [
                    { label: 'Deportivo', href: '/ropa' },
                    { label: 'Camisa', href: '/ropa' },
                    { label: 'Polos y camisetas', href: '/ropa' },
                    { label: 'Medias', href: '/ropa' }
                ],
                href: "/ropa"
            },
            {
                titulo: "Accesorios",
                enlaces: [
                    { label: 'Lentes de sol', href: '/accesorios' },
                    { label: 'Sombreros y gorros', href: '/accesorios' }
                ],
                href: "/accesorios"
            },
            {
                titulo: "Ofertas Niños",
                href: "/ropa"
            },
            
        ]
    },
    {
        id: 'hogar',
        titulo: 'Hogar',
        emoji: '🏚️',
        secciones: [
            {
                titulo: "Cocina y comedor",
                enlaces: [
                    { label: 'Almacenamiento y organización', href: '' },
                    { label: 'Vasos para viajar y para llevar', href: '' },
                    { label: 'Comedor y entretenimiento', href: '' },
                    { label: 'Utensilios y aparatos de cocina', href: '' }
                ],
                href: ""
            },
            {
                titulo: "Decoración de hogar para niños",
                enlaces: [
                    { label: 'Ropa de cama para habitación infantil', href: '' },
                    { label: 'Muebles para habitación infantil', href: '' },
                    { label: 'Decoración para habitación', href: '' },
                    { label: 'Decoración para habitación infantil', href: '' }
                ],
                href: ""
            },
            {
                titulo: "Almacenamiento y organización",
                enlaces: [
                    { label: 'Almacenamiento y organización de cocina', href: '' },
                    { label: 'Almacenamiento y organización de oficina', href: '' },
                    { label: 'Racks, estantes y cajones', href: '' },
                    { label: 'Almacenaje de ropa', href: '' }
                ],
                href: ""
            },
            {
                titulo: "Suministros de limpieza",
                enlaces: [
                    { label: 'Productos de limpieza', href: '' }
                ],
                href: ""
            },
            {
                titulo: "Muebles",
                enlaces: [
                    { label: 'Sala', href: '' },
                    { label: 'Muebles de recreación y juegos', href: '' },
                    { label: 'Muebles para dormitorio', href: '' },
                    { label: 'Muebles para home office', href: '' }
                ],
                href: ""
            },
            
        ]
    }
]