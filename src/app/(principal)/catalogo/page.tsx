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
import { Badge, badgeVariants } from '@/components/ui/badge';

export default function Page() {
    return (
        <section className='space-y-5'>
            <header>
                <h2 className='font-extrabold'>
                    Recomendadas para ti
                </h2>
            </header>
            <article className='flex items-start'>
                <a href="/producto">
                    <Card className="relative mx-auto w-full max-w-sm pt-0">
                    <div>
                        <img src="/zapaato.jpg" alt="" />
                    </div>
                    <CardHeader>
                        <CardAction>
                            <Badge variant={'destructive'}>-50%</Badge>
                        </CardAction>
                        <CardTitle> Platanitos </CardTitle>
                        <CardDescription>
                            Calzado Dama Cchun Hellen
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className='gap-2 items-center'>
                        <p className='text-red-500 font-extrabold text-lg'>s/ 39.90</p>
                        <small className='line-through'> s/ 159.90 </small>
                    </CardFooter>
                </Card>
                </a>
                
            </article>
        </section>

    )
}