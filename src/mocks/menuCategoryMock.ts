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
                    { label: 'Deportivo', href: '' },
                    { label: 'Sandalia', href: '' },
                    { label: 'Outdoor', href: '' },
                    { label: 'Zapatillas de moda', href: '' }
                ],
                href: ""
            },
            {
                titulo: "Ropa",
                enlaces: [
                    { label: 'Deportivo', href: '' },
                    { label: 'Camisa', href: '' },
                    { label: 'Polos y camisetas', href: '' },
                    { label: 'Medias', href: '' }
                ],
                href: ""
            },
            {
                titulo: "Accesorios",
                enlaces: [
                    { label: 'Sombrero y Gorro', href: '' },
                    { label: 'Billeteras, tarjeteros y organizadores de dinero', href: '' },
                    { label: 'Lllavero', href: '' },
                    { label: 'Accesorios para lentes y lentes de sol', href: '' }
                ],
                href: ""
            },
            {
                titulo: "Relojes",
                enlaces: [
                    { label: 'Sombrero y Gorro', href: '' },
                    { label: 'Billeteras, tarjeteros y organizadores de dinero', href: '' },
                    { label: 'Lllavero', href: '' },
                    { label: 'Accesorios para lentes y lentes de sol', href: '' }
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
                    { label: 'Deportivo', href: '' },
                    { label: 'Sandalia', href: '' },
                    { label: 'Outdoor', href: '' },
                    { label: 'Zapatillas de moda', href: '' }
                ],
                href: ""
            },
            {
                titulo: "Ropa",
                enlaces: [
                    { label: 'Deportivo', href: '' },
                    { label: 'Camisa', href: '' },
                    { label: 'Polos y camisetas', href: '' },
                    { label: 'Medias', href: '' }
                ],
                href: ""
            },
            {
                titulo: "Cartera y billeteras",
                enlaces: [
                    { label: 'Carteras con asa', href: '' },
                    { label: 'Bolsas de hombro', href: '' },
                    { label: 'Bolsos cruzados', href: '' },
                    { label: 'Mochilas de moda', href: '' }
                ],
                href: ""
            },
            {
                titulo: "Accesorios",
                enlaces: [
                    { label: 'Sombrero y Gorro', href: '' },
                    { label: 'Billeteras, tarjeteros y organizadores de dinero', href: '' },
                    { label: 'Lllavero', href: '' },
                    { label: 'Accesorios para lentes y lentes de sol', href: '' }
                ],
                href: ""
            },
            {
                titulo: "Relojes",
                enlaces: [
                    { label: 'Sombrero y Gorro', href: '' },
                    { label: 'Billeteras, tarjeteros y organizadores de dinero', href: '' },
                    { label: 'Lllavero', href: '' },
                    { label: 'Accesorios para lentes y lentes de sol', href: '' }
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
                    { label: 'Deportivo', href: '' },
                    { label: 'Sandalia', href: '' },
                    { label: 'Outdoor', href: '' },
                    { label: 'Zapatillas de moda', href: '' }
                ],
                href: ""
            },
            {
                titulo: "Ropa",
                enlaces: [
                    { label: 'Deportivo', href: '' },
                    { label: 'Camisa', href: '' },
                    { label: 'Polos y camisetas', href: '' },
                    { label: 'Medias', href: '' }
                ],
                href: ""
            },
            {
                titulo: "Joyeria",
                enlaces: [
                    { label: 'Broches y prendedores', href: '' },
                    { label: 'Brazaletes', href: '' },
                ],
                href: ""
            },
            {
                titulo: "Accesorios",
                enlaces: [
                    { label: 'Sombreros y gorros', href: '' },
                    { label: 'Lentes de sol', href: '' },
                ],
                href: ""
            },
            {
                titulo: "Relojes",
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
                    { label: 'Deportivo', href: '' },
                    { label: 'Sandalia', href: '' },
                    { label: 'Zuecos y mulas', href: '' },
                    { label: 'Zapatillas de moda', href: '' }
                ],
                href: ""
            },
            {
                titulo: "Ropa",
                enlaces: [
                    { label: 'Deportivo', href: '' },
                    { label: 'Camisa', href: '' },
                    { label: 'Polos y camisetas', href: '' },
                    { label: 'Medias', href: '' }
                ],
                href: ""
            },
            {
                titulo: "Accesorios",
                enlaces: [
                    { label: 'Lentes de sol', href: '' },
                    { label: 'Sombreros y gorros', href: '' }
                ],
                href: ""
            },
            {
                titulo: "Ofertas Niños",
                href: ""
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