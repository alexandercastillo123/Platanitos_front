'use client'

import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardAction,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Share } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Page() {
    return (
        <section>
            <article className='flex'>
                <div>
                    <div>
                        <img src="/zapaato.jpg" alt="" />
                    </div>
                    <div></div>
                </div>
                <Card className='w-2xl h-auto p-2'>
                    <CardHeader className=''>   
                        <CardAction className='w-full'>
                            <div className='w-full flex justify-between items-center gap-2'>
                                <div>
                                    <small>SKU: FDM45402RO0C</small>
                                </div>
                                <div className='flex items-center justify-center gap-2'>
                                    <Button variant={'outline'}>
                                        <Share />
                                    </Button>
                                    <Button variant={'outline'}>
                                        <Heart />
                                    </Button>
                                </div>
                            </div>
                        </CardAction>
                        <CardTitle>
                            <h3 className='font-bold text-xl'> Platanitos </h3>
                            <p> Calzado Dama Cchun Hellen </p>
                            <div className='flex flex-col gap-1'>
                                <small className='line-through'> S/ 159.90 </small>
                                <div className='flex items-center gap-2'>
                                    <p className='text-red-500 text-2xl font-extrabold'> S/ 39.90 </p>
                                    <Badge variant={'destructive'}>-75%</Badge>
                                </div>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardFooter>
                        <Button className='w-full'>Agregar Carrito</Button>
                        <div>
                            <a href=""></a>
                            <small></small>
                        </div>
                    </CardFooter>
                </Card>
            </article>
        </section>
    )
}