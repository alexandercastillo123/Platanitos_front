"use client"

import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const router = useRouter()

  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center bg-white",
        className
      )}
      {...props}
    >
      <Card className="w-full max-w-md rounded-xl border-0 bg-white shadow-none">
        <CardContent className="p-8">
          <div className="mb-8 flex justify-center">
            <img
              src="/images/logo.png"
              alt="Platanitos"
              className="h-28 w-auto object-contain"
            />
          </div>

          <h1 className="mb-6 text-center text-3xl font-semibold text-black">
            Iniciar sesión
          </h1>

          <div className="mb-5 flex overflow-hidden rounded-md border bg-[#f5f5f5]">
            <button
              className="
                flex-1 rounded-md bg-[#1f5f1f] py-3 text-sm font-medium text-white
              "
            >
              Correo electrónico
            </button>

            <button
              className="
                flex-1 py-3 text-sm font-medium text-[#4d4d4d]
              "
            >
              Teléfono
            </button>
          </div>

          <form className="space-y-4">
            <Input
              type="email"
              placeholder="Correo electrónico"
              className="h-14 border-[#dddddd] text-base placeholder:text-[#9b9b9b]"
            />

            <Button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="
                h-14 w-full bg-[#79a86f] text-base font-semibold uppercase tracking-wide
                hover:bg-[#6d9a63]
              "
            >
              Continuar
            </Button>
          </form>

          <p className="mt-5 text-center text-sm leading-6 text-[#555]">
            Con tu cuenta Platanitos, comienzas a acumular puntos que puedes
            usar como descuentos. 💰
          </p>

          <div className="mt-8 text-center">
            <p className="mb-4 text-sm text-[#555]">
              ¿Aún no tienes una cuenta?
            </p>

            <Button
              variant="outline"
              className="
                h-12 w-full border-[#5c8d57] text-sm font-semibold uppercase
                text-[#5c8d57] hover:bg-[#f5faf5]
              "
            >
              CREA TU CUENTA
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}