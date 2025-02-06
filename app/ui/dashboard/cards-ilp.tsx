"use client"

import { useEffect, useState } from "react"
import { ChartPieIcon } from "@heroicons/react/24/outline"
import { lusitana } from "@/app/ui/fonts"
// import axios from "axios"
import { api } from "@/app/lib/axios-config"

const iconMap = {
  ilp: ChartPieIcon,
}

// Mapping API keys to readable labels
const imtLabels: Record<string, string> = {
  SK: "Sangat Kurus",
  K: "Kurus",
  N: "Normal",
  G: "Gemuk",
  O: "Obesitas",
}

const ilpLabels: Record<string, string> = {
  rendah: "Rendah",
  normal: "Normal",
  tinggi: "Tinggi",
}

const lpLabels: Record<string, string> = {
    lingkarPerutPG90cm: "Laki-laki > 90 Cm",
    lingkarPerutWG80cm: "Perempuan > 80 Cm",
}

export function CardIMT() {
  const [data, setData] = useState<Record<string, number> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchIMTData = async () => {
      try {
        const response = await api.get("/dashboard/imt")
        setData(response.data)
      } catch (error) {
        console.log(error)
        setError("Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    fetchIMTData()
  }, [])

  const Icon = iconMap["ilp"]

  return (
    <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
      <div className="flex items-center space-x-2 mb-2">
        <Icon className="h-6 w-6 text-gray-600" />
        <h3 className="text-lg font-semibold">IMT</h3>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="text-gray-700">
          {Object.entries(data || {}).map(([key, value]) => (
            <li key={key} className="flex justify-between border-b py-1">
              <span>{imtLabels[key] || key}:</span>
              <span className={`${lusitana.className} font-medium`}>{value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function CardTD() {
  const [data, setData] = useState<Record<string, number> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchTDData = async () => {
      try {
        const response = await api.get("/dashboard/td")
        setData(response.data)
      } catch (error) {
        console.log(error)
        setError("Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    fetchTDData()
  }, [])

  const Icon = iconMap["ilp"]

  return (
    <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
      <div className="flex items-center space-x-2 mb-2">
        <Icon className="h-6 w-6 text-gray-600" />
        <h3 className="text-lg font-semibold">Tekanan Darah</h3>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="text-gray-700">
          {Object.entries(data || {}).map(([key, value]) => (
            <li key={key} className="flex justify-between border-b py-1">
              <span>{ilpLabels[key] || key}:</span>
              <span className={`${lusitana.className} font-medium`}>{value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
  
export function CardGD() {
  const [data, setData] = useState<Record<string, number> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchGDData = async () => {
      try {
        const response = await api.get("/dashboard/gd")
        setData(response.data)
      } catch (error) {
        console.log(error)
        setError("Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    fetchGDData()
  }, [])

  const Icon = iconMap["ilp"]

  return (
    <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
      <div className="flex items-center space-x-2 mb-2">
        <Icon className="h-6 w-6 text-gray-600" />
        <h3 className="text-lg font-semibold">Gula Darah</h3>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="text-gray-700">
          {Object.entries(data || {}).map(([key, value]) => (
            <li key={key} className="flex justify-between border-b py-1">
              <span>{ilpLabels[key] || key}:</span>
              <span className={`${lusitana.className} font-medium`}>{value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function CardLP() {
    const [data, setData] = useState<Record<string, number> | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
  
    useEffect(() => {
      const fetchLPData = async () => {
        try {
          const response = await api.get("/dashboard/lp")
          setData(response.data)
        } catch (error) {
          console.log(error)
          setError("Failed to load data")
        } finally {
          setLoading(false)
        }
      }
  
      fetchLPData()
    }, [])
  
    const Icon = iconMap["ilp"]
  
    return (
      <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
        <div className="flex items-center space-x-2 mb-2">
          <Icon className="h-6 w-6 text-gray-600" />
          <h3 className="text-lg font-semibold">Lingkar Perut</h3>
        </div>
  
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul className="text-gray-700">
            {Object.entries(data || {}).map(([key, value]) => (
              <li key={key} className="flex justify-between border-b py-1">
                <span>{lpLabels[key] || key}:</span>
                <span className={`${lusitana.className} font-medium`}>{value}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
  