export function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 mt-12">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-gray-800 mb-3">Platanitos</h3>
                        <p className="text-sm text-gray-600">Calzado y accesorios de calidad para toda la familia.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-3">Categorías</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/zapatillas" className="text-gray-600 hover:text-green-700">Zapatillas</a></li>
                            <li><a href="/ropa" className="text-gray-600 hover:text-green-700">Ropa</a></li>
                            <li><a href="/sandalias" className="text-gray-600 hover:text-green-700">Sandalias</a></li>
                            <li><a href="/accesorios" className="text-gray-600 hover:text-green-700">Accesorios</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-3">Servicio</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/pedidos" className="text-gray-600 hover:text-green-700">Seguimiento de pedidos</a></li>
                            <li><a href="/carrito" className="text-gray-600 hover:text-green-700">Carrito</a></li>
                            <li><a href="/favorito" className="text-gray-600 hover:text-green-700">Favoritos</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-3">Contacto</h4>
                        <p className="text-sm text-gray-600">soporte@platanitos.com</p>
                        <p className="text-sm text-gray-600">+51 123 456 789</p>
                    </div>
                </div>
                <div className="border-t border-gray-200 mt-6 pt-4 text-center text-xs text-gray-500">
                    © 2024 Platanitos. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    )
}