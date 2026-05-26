import { MapPin, Wallet, Clock, StoreIcon } from "lucide-react";

const steps = [
    { id: "cart", label: "Carrito", icon: StoreIcon },
    { id: "address", label: "Dirección", icon: MapPin },
    { id: "payment", label: "Pago", icon: Wallet },
    { id: "done", label: "Creada", icon: Clock },
];

export function Stepper({ currentStep }: { currentStep: string }) {
    const currentIndex = steps.findIndex((s) => s.id === currentStep);

    return (
        <div className="w-full py-6">
            <div className="flex items-center justify-between max-w-4xl mx-auto relative px-4">
                <div className="absolute top-5 left-0 right-0 h-[3px] bg-gray-200 -z-10" />

                {steps.map((step, index) => {
                    const isCompleted = index < currentIndex;
                    const isCurrent = index === currentIndex;
                    const Icon = step.icon;

                    return (
                        <div key={step.id} className="flex flex-col items-center relative z-10">
                            <div className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all ${isCompleted || isCurrent
                                ? "bg-[#1d5c2d] border-[#1d5c2d] text-white"
                                : "bg-white border-gray-300 text-gray-400"
                                }`}>
                                {isCompleted ? <StoreIcon className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                            </div>
                            <span className={`text-xs mt-2 font-medium ${isCurrent || isCompleted ? "text-gray-900" : "text-gray-400"}`}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}