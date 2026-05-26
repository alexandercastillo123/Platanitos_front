import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CartSummary({ subtotal, shipping, step, onContinue }: any) {
    const total = subtotal + (step !== "cart" ? shipping : 0);

    return (
        <Card className="p-6 border shadow-sm bg-white rounded-2xl">
            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span>Subtotal (1 producto)</span>
                    <span>S/ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Descuento</span>
                    <span className="text-green-600">S/ 0.00</span>
                </div>
                <div className="flex justify-between">
                    <span>Costo de envío</span>
                    <span className={step === "cart" ? "text-gray-400" : ""}>
                        {step === "cart" ? "Por definir" : `S/ ${shipping.toFixed(2)}`}
                    </span>
                </div>

                <div className="pt-4 border-t flex justify-between text-base font-bold">
                    <span>Total</span>
                    <span>S/ {total.toFixed(2)}</span>
                </div>

                <Button
                    onClick={onContinue}
                    className="w-full bg-[#1d5c2d] hover:bg-[#164923] h-12 text-base font-bold mt-6 rounded-xl"
                >
                    CONTINUAR
                </Button>
            </div>
        </Card>
    );
}