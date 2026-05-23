"use client"

import * as React from "react"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"

import { restrictToVerticalAxis } from "@dnd-kit/modifiers"

import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"

import { CSS } from "@dnd-kit/utilities"

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"

import { toast } from "sonner"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Checkbox } from "@/components/ui/checkbox"

import {
  PlusIcon,
  SearchIcon,
  PencilIcon,
  Trash2Icon,
  GripVerticalIcon,
  MoreVerticalIcon,
  UsersIcon,
  MailIcon,
  ShieldCheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
} from "lucide-react"

type Usuario = {
  id: number
  nombre: string
  email: string
  rol: string
  estado: string
}

const initialData: Usuario[] = [
  {
    id: 1,
    nombre: "Juan Pérez",
    email: "juan@gmail.com",
    rol: "Administrador",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "María López",
    email: "maria@gmail.com",
    rol: "Empleado",
    estado: "Activo",
  },
  {
    id: 3,
    nombre: "Carlos Torres",
    email: "carlos@gmail.com",
    rol: "Supervisor",
    estado: "Inactivo",
  },
  {
    id: 4,
    nombre: "Ana García",
    email: "ana@gmail.com",
    rol: "Empleado",
    estado: "Activo",
  },
]

function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  })

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7"
    >
      <GripVerticalIcon className="size-4 text-muted-foreground" />
    </Button>
  )
}

function UserDrawer({ user }: { user: Usuario }) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="sm">
          <EyeIcon className="mr-2 size-4" />
          Ver
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{user.nombre}</DrawerTitle>

          <DrawerDescription>
            Información del usuario
          </DrawerDescription>
        </DrawerHeader>

        <div className="space-y-5 px-4 py-2">
          <div className="flex items-center gap-3 rounded-xl border p-4">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
              <UsersIcon className="size-7 text-primary" />
            </div>

            <div>
              <h3 className="font-semibold">
                {user.nombre}
              </h3>

              <p className="text-sm text-muted-foreground">
                ID: {user.id}
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-xl border p-4">
              <p className="text-sm text-muted-foreground">
                Correo
              </p>

              <div className="mt-2 flex items-center gap-2">
                <MailIcon className="size-4 text-primary" />

                <span>{user.email}</span>
              </div>
            </div>

            <div className="rounded-xl border p-4">
              <p className="text-sm text-muted-foreground">
                Rol
              </p>

              <Badge className="mt-2">
                <ShieldCheckIcon className="mr-1 size-3" />
                {user.rol}
              </Badge>
            </div>

            <div className="rounded-xl border p-4">
              <p className="text-sm text-muted-foreground">
                Estado
              </p>

              <Badge
                className="mt-2"
                variant={
                  user.estado === "Activo"
                    ? "default"
                    : "destructive"
                }
              >
                {user.estado}
              </Badge>
            </div>
          </div>
        </div>

        <DrawerFooter>
          <Button>Guardar Cambios</Button>

          <DrawerClose asChild>
            <Button variant="outline">
              Cerrar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export function DataTable() {
  const [data, setData] =
    React.useState<Usuario[]>(initialData)

  const [sorting, setSorting] =
    React.useState<SortingState>([])

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const [search, setSearch] = React.useState("")

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  )

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data.map(({ id }) => id),
    [data]
  )

  const filteredData = data.filter((user) =>
    user.nombre
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  const handleDelete = (id: number) => {
    setData((prev) =>
      prev.filter((user) => user.id !== id)
    )

    toast.success("Usuario eliminado")
  }

  const columns: ColumnDef<Usuario>[] = [
    {
      id: "drag",
      header: () => null,

      cell: ({ row }) => (
        <DragHandle id={row.original.id} />
      ),
    },

    {
      id: "select",

      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={(value) =>
            table.toggleAllRowsSelected(!!value)
          }
        />
      ),

      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) =>
            row.toggleSelected(!!value)
          }
        />
      ),
    },

    {
      accessorKey: "nombre",
      header: "Usuario",

      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
            <UsersIcon className="size-5 text-primary" />
          </div>

          <div>
            <p className="font-medium">
              {row.original.nombre}
            </p>

            <p className="text-xs text-muted-foreground">
              ID: {row.original.id}
            </p>
          </div>
        </div>
      ),
    },

    {
      accessorKey: "email",
      header: "Correo",

      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <MailIcon className="size-4 text-muted-foreground" />

          {row.original.email}
        </div>
      ),
    },

    {
      accessorKey: "rol",
      header: "Rol",

      cell: ({ row }) => (
        <Badge
          className="gap-1"
          variant="secondary"
        >
          <ShieldCheckIcon className="size-3" />

          {row.original.rol}
        </Badge>
      ),
    },

    {
      accessorKey: "estado",
      header: "Estado",

      cell: ({ row }) => (
        <Badge
          variant={
            row.original.estado === "Activo"
              ? "default"
              : "destructive"
          }
        >
          {row.original.estado}
        </Badge>
      ),
    },

    {
      id: "acciones",
      header: "Acciones",

      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {/* VER */}
          <UserDrawer user={row.original} />

          {/* EDITAR */}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast.info(
                "Vista editar usuario"
              )
            }
          >
            <PencilIcon className="mr-2 size-4" />
            Editar
          </Button>

          {/* ELIMINAR */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
              >
                <MoreVerticalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  toast.info(
                    "Vista detalle usuario"
                  )
                }
              >
                <EyeIcon className="mr-2 size-4" />
                Ver detalle
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-red-500"
                onClick={() =>
                  handleDelete(row.original.id)
                }
              >
                <Trash2Icon className="mr-2 size-4" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data: filteredData,
    columns,

    state: {
      sorting,
      columnVisibility,
    },

    onSortingChange: setSorting,

    onColumnVisibilityChange:
      setColumnVisibility,

    getCoreRowModel: getCoreRowModel(),

    getFilteredRowModel:
      getFilteredRowModel(),

    getSortedRowModel: getSortedRowModel(),

    getPaginationRowModel:
      getPaginationRowModel(),
  })

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id) {
      setData((items) => {
        const oldIndex = dataIds.indexOf(active.id)

        const newIndex = dataIds.indexOf(
          over?.id as number
        )

        return arrayMove(
          items,
          oldIndex,
          newIndex
        )
      })
    }
  }

  return (
    <Card className="border-0 shadow-xl">
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle className="text-2xl font-bold">
            Gestión de Usuarios
          </CardTitle>

          <CardDescription>
            Listado de usuarios del sistema
          </CardDescription>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-3 size-4 text-muted-foreground" />

            <Input
              placeholder="Buscar usuario..."
              className="pl-9"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <Button
            onClick={() =>
              toast.success(
                "Vista agregar usuario"
              )
            }
          >
            <PlusIcon className="mr-2 size-4" />
            Nuevo Usuario
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-hidden rounded-2xl border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            <Table>
              <TableHeader className="bg-muted/50">
                {table
                  .getHeaderGroups()
                  .map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map(
                        (header) => (
                          <TableHead
                            key={header.id}
                          >
                            {flexRender(
                              header.column
                                .columnDef.header,
                              header.getContext()
                            )}
                          </TableHead>
                        )
                      )}
                    </TableRow>
                  ))}
              </TableHeader>

              <TableBody>
                <SortableContext
                  items={dataIds}
                  strategy={
                    verticalListSortingStrategy
                  }
                >
                  {table.getRowModel().rows.length ? (
                    table
                      .getRowModel()
                      .rows.map((row) => {
                        const {
                          transform,
                          transition,
                          setNodeRef,
                        } = useSortable({
                          id: row.original.id,
                        })

                        return (
                          <TableRow
                            key={row.id}
                            ref={setNodeRef}
                            style={{
                              transform:
                                CSS.Transform.toString(
                                  transform
                                ),
                              transition,
                            }}
                          >
                            {row
                              .getVisibleCells()
                              .map((cell) => (
                                <TableCell
                                  key={cell.id}
                                >
                                  {flexRender(
                                    cell.column
                                      .columnDef.cell,
                                    cell.getContext()
                                  )}
                                </TableCell>
                              ))}
                          </TableRow>
                        )
                      })
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No hay usuarios
                      </TableCell>
                    </TableRow>
                  )}
                </SortableContext>
              </TableBody>
            </Table>
          </DndContext>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Total usuarios: {filteredData.length}
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                table.previousPage()
              }
              disabled={
                !table.getCanPreviousPage()
              }
            >
              <ChevronLeftIcon className="size-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}