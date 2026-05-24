"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, CheckCircle2, CreditCard, Wallet } from "lucide-react";
import cartData from "./_data/mock-cart.json";

import { Stepper } from "./_components/stepper";
import { CartItem } from "./_components/cart-item";
import { CartSummary } from "./_components/cart-summary";
import { AddressFlow } from "./_components/address-flow";

export default function CarritoPage() {
    const [step, setStep] = useState<string>("cart");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [items, setItems] = useState(cartData.items);
    const [mounted, setMounted] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState("monedero");

    useEffect(() => {
        const savedStep = localStorage.getItem("platanitos-step");
        if (savedStep === "done") {
            setStep("cart");
            localStorage.setItem("platanitos-step", "cart");
        } else if (savedStep) {
            setStep(savedStep);
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem("platanitos-step", step);
        }
    }, [step, mounted]);

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 5.90;
    const total = subtotal + shipping;

    const handleContinue = () => {
        if (step === "cart") setStep("address");
        else if (step === "address") setIsModalOpen(true);
        else if (step === "payment") setStep("done");
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans">
            <header className="w-full bg-white border-b py-3 px-6 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-center items-center">
                    <img src="/img/platanitos.png" alt="Platanitos" className="h-8" />
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                {step !== "cart" && <Stepper currentStep={step} />}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
                    <div className="lg:col-span-8">
                        {step === "cart" && (
                            <div>
                                <h1 className="text-2xl font-bold mb-6">Carrito</h1>
                                {items.map((item) => <CartItem key={item.id} item={item} />)}
                            </div>
                        )}

                        {step === "address" && (
                            <div className="bg-white rounded-xl p-6 border">
                                <h1 className="text-xl font-bold mb-1">Dirección de envío</h1>
                                <p className="text-gray-600 mb-6">Selecciona un punto de envío</p>
                                <div className="space-y-3">
                                    <button onClick={() => setIsModalOpen(true)} className="w-full border-2 border-[#1d5c2d] text-[#1d5c2d] font-bold py-4 rounded-xl hover:bg-green-50">
                                        AGREGAR NUEVA DIRECCIÓN
                                    </button>
                                    <button className="w-full border border-gray-300 py-4 rounded-xl text-gray-400 cursor-not-allowed">RECOGER EN TIENDA</button>
                                    <button className="w-full border border-gray-300 py-4 rounded-xl text-gray-400 cursor-not-allowed">RECOGER EN LOCKER</button>
                                </div>
                            </div>
                        )}

                        {step === "payment" && (
                            <div className="bg-white rounded-xl p-6 border">
                                <h1 className="text-2xl font-bold mb-1">Métodos de pago</h1>
                                <p className="text-gray-600 mb-6">Selecciona tu método de preferencia</p>

                                <div className="space-y-3">
                                    <label className="flex items-center justify-between bg-white border rounded-xl p-4 cursor-pointer hover:border-[#1d5c2d]">
                                        <div className="flex items-center gap-3">
                                            <input type="radio" name="payment" className="w-5 h-5" />
                                            <div>
                                                <div className="font-medium">Monedero (Saldo S/ 0.00)</div>
                                                <div className="text-sm text-gray-500">Recarga S/ 115.80 para pagar con tu monedero</div>
                                            </div>
                                        </div>
                                    </label>

                                    {[
                                        { name: "Tarjeta de crédito o débito - Mercado Pago", img: "/img/mercadopago.png" },
                                        { name: "Yape - Mercado Pago", img: "/img/yape.png" },
                                        { name: "PagoEfectivo - Mercado Pago", img: "/img/pagoefectivo.png" },
                                        { name: "Tarjeta de crédito o débito - Mercado Pago Pro", img: "/img/mercadopago.png" },
                                        { name: "Tarjeta de crédito o débito, Yape, Plin - Izipay", img: "/img/izipay.png" },
                                        { name: "Tienda", img: "/img/tienda.png" },
                                    ].map((method, i) => (
                                        <label key={i} className="flex items-center justify-between bg-white border rounded-xl p-4 cursor-pointer hover:border-[#1d5c2d] transition-all">
                                            <div className="flex items-center gap-3">
                                                <input type="radio" name="payment" className="w-5 h-5" />
                                                <img src={method.img} alt={method.name} className="w-9 h-9 object-contain" />
                                                <span className="font-medium">{method.name}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === "done" && (
                            <div className="bg-white rounded-2xl p-16 text-center">
                                <CheckCircle2 className="mx-auto h-16 w-16 text-[#1d5c2d] mb-6" />
                                <h2 className="text-3xl font-bold">¡Pedido Creado!</h2>
                                <p className="mt-3 text-gray-600">Tu orden <span className="font-bold">#PZ-2026-ALEX</span> ha sido recibida con éxito.</p>
                                <button onClick={() => window.location.reload()} className="mt-8 bg-[#1d5c2d] text-white px-10 py-3.5 rounded-xl font-bold">
                                    Seguir comprando
                                </button>
                            </div>
                        )}
                    </div>

                    {step !== "done" && (
                        <div className="lg:col-span-4">
                            <div className="sticky top-24 space-y-6">
                                <CartSummary
                                    subtotal={subtotal}
                                    shipping={shipping}
                                    step={step}
                                    onContinue={handleContinue}
                                />
                                {step === "payment" && (
                                    <div className="bg-white p-5 rounded-xl border">
                                        <p className="text-sm font-medium mb-3">¿TIENES UN CÓDIGO DE DESCUENTO?</p>
                                        <div className="flex gap-2">
                                            <input type="text" placeholder="Ingresa tu código de descuento" className="flex-1 border rounded-lg px-4 py-2 text-sm" />
                                            <button className="bg-[#1d5c2d] text-white px-6 rounded-lg font-bold text-sm">APLICAR</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <AddressFlow
                isOpen={isModalOpen}
                onNext={() => { setIsModalOpen(false); setStep("payment"); }}
                onCancel={() => setIsModalOpen(false)}
            />
        </div>
    );
}