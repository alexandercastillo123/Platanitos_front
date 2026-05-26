import { Trash2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function CartItem({ item }: any) {
    return (
        <div className="bg-white border rounded-xl p-4 flex gap-4 mb-4 shadow-sm hover:shadow transition-all">
            <div className="w-28 h-28 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-2"
                />
            </div>
            <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-gray-400 hover:text-red-500 cursor-pointer transition" />
                        <span className="font-bold text-sm uppercase tracking-tight text-gray-800">
                            {item.brand}
                        </span>
                    </div>
                    <span className="font-bold text-lg text-gray-900">
                        S/ {item.price.toFixed(2)}
                    </span>
                </div>

                <h3 className="text-[15px] font-medium text-gray-700 mt-1 leading-tight">
                    {item.name}
                </h3>
                <div className="flex gap-4 text-sm text-gray-500 mt-1">
                    <span>Color: {item.color}</span>
                    <span>Talla: {item.size}</span>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4">
                    <Select defaultValue={item.quantity.toString()}>
                        <SelectTrigger className="w-20 h-9 text-sm border-gray-300 focus:ring-0">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {[...Array(10)].map((_, i) => (
                                <SelectItem key={i + 1} value={(i + 1).toString()}>
                                    {i + 1}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-red-500 hover:bg-transparent"
                    >
                        <Trash2 className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}