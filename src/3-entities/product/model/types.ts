
export interface FullProduct {
  id: string
  name: string
  priceRegular: number
  priceDiscount: number
  screen: string
  capacityAvailable: string[]
  capacity: string
  colorsAvailable: string[]
  color: string
  ram: string
  images: string[]
  namespaceId: string
  description: { title: string; text: string[]; }[]
  resolution: string
  camera: string
  zoom: string
  cell: string[]
  processor: string
}

export interface Product {
    id: number
    category: string
    itemId: string
    name: string
    fullPrice: number
    price: number
    screen: string
    capacity: string
    color: string
    ram: string
    year: number
    image: string
}