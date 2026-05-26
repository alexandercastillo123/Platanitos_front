"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

import dynamic from 'next/dynamic';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });

export function AddressFlow({ isOpen, onNext, onCancel }: any) {
    const [subStep, setSubStep] = useState(1);

    useEffect(() => {
        import('leaflet').then((L) => {
            delete (L.Icon.Default.prototype as any)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            });
        });
    }, []);

    return (
        <Dialog open={isOpen} onOpenChange={onCancel}>
            <DialogContent className="max-w-lg">
                {subStep === 1 && (
                    <>
                        <DialogHeader><DialogTitle>Datos de quien recibe</DialogTitle></DialogHeader>
                        <div className="grid gap-4 py-4">
                            <RadioGroup defaultValue="yo">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="yo" id="yo" />
                                    <Label htmlFor="yo">Yo recibiré la orden</Label>
                                </div>
                            </RadioGroup>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label>Nombre</Label>
                                    <Input defaultValue="ALEXANDER GABRIEL" />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Apellido</Label>
                                    <Input defaultValue="PERALTA CASTILLO" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label>DNI</Label>
                                    <Input defaultValue="75218119" />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Teléfono</Label>
                                    <Input defaultValue="926074441" />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button className="w-full bg-[#1d5c2d]" onClick={() => setSubStep(2)}>CONTINUAR</Button>
                        </DialogFooter>
                    </>
                )}

                {subStep === 2 && (
                    <>
                        <DialogHeader><DialogTitle>Dirección de envío</DialogTitle></DialogHeader>
                        <div className="grid gap-4 py-4 text-sm">
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2">
                                <option>LIMA</option>
                            </select>
                            <Input placeholder="Provincia" defaultValue="LIMA" />
                            <Input placeholder="Distrito" defaultValue="LIMA" />
                            <Input placeholder="Dirección" defaultValue="Calle Santa Nicerata 612" />
                            <Input placeholder="Referencia" defaultValue="urb. Santa Emma" />
                        </div>
                        <DialogFooter>
                            <Button className="w-full bg-[#1d5c2d]" onClick={() => setSubStep(3)}>CONTINUAR</Button>
                        </DialogFooter>
                    </>
                )}

                {subStep === 3 && (
                    <>
                        <DialogHeader><DialogTitle>Confirmar dirección</DialogTitle></DialogHeader>
                        <div className="py-4">
                            <div className="w-full h-80 rounded-xl overflow-hidden border border-gray-200">
                                <MapContainer center={[-12.0464, -77.0428]} zoom={16} style={{ height: "100%", width: "100%" }}>
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <Marker position={[-12.0464, -77.0428]} />
                                </MapContainer>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button className="w-full bg-[#1d5c2d]" onClick={() => { onNext(); setSubStep(1); }}>
                                CONFIRMAR Y CONTINUAR
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}