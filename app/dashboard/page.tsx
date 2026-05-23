"use client"

import dynamic from "next/dynamic"

import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"

import data from "./data.json"

const DataTable = dynamic(
  () =>
    import("@/components/data-table").then(
      (mod) => mod.DataTable
    ),
  {
    ssr: false,
  }
) as React.ComponentType<{
  data: {
    id: number
    header: string
    type: string
    status: string
    target: string
    limit: string
    reviewer: string
  }[]
}>

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 py-6">
      <SectionCards />

      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>

      <div className="px-4 lg:px-6">
        <DataTable data={data} />
      </div>
    </div>
  )
}