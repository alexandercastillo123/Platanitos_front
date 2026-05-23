import { Card,CardHeader, CardContent, CardAction, CardTitle } from '@/components/ui/card'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import FloatingLabel from '../_components/floating-label'

export default function page() {
  return (
    <main className='flex min-h-svh w-full items-center justify-center p-6 md:p-10"'>
        <Card className='w-full max-w-sm'>
            <CardHeader>
                <CardTitle className='text-center mb-4 text-xl'>
                    Iniciar Sesión
                </CardTitle>
                <Tabs className='w-full' >
                    <TabsList className='w-full h-14! p-2'>
                        <TabsTrigger value='email' className='data-[state=active]:bg-[#0c550f] data-[state=active]:text-white text-[#0c550f] hover:text-[#0c550f] cursor-pointer'>Correo electrónico</TabsTrigger>
                        <TabsTrigger value='telefono' className='data-[state=active]:bg-[#0c550f] data-[state=active]:text-white text-[#0c550f] hover:text-[#0c550f] cursor-pointer'>Teléfono</TabsTrigger>
                    </TabsList>
                </Tabs>
            </CardHeader>
            <CardContent>
                <form action="POST">
                    <FieldGroup>
                        <FloatingLabel
                            type='email'
                            id='email'
                            label='Correo electrónico'
                        />
                    </FieldGroup>
                    
                </form>
            </CardContent>
        </Card>
    </main>
  )
}
