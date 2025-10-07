import { loadArtWork } from "@sanity/loadArtWork"
import { Dropdown } from "@src/components/core/Dropdown"
import { Searchbar } from "@src/components/core/Searchbar"
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import Image from "next/image"
import { useState } from "react"

const dimensions = ["All", "11x14 in"]
const dominantColors = ["All", "Warm"]
const prices = ["Low to High", "High to Low"]

const Portfolio: NextPage<{ artWork: ArtWork[] }> = ({ artWork }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [searchValue, setSearchValue] = useState("")
  const [dimension, setDimension] = useState(dimensions[0])
  const [dominantColor, setDominantColor] = useState(dominantColors[0])
  const [price, setPrice] = useState(prices[0])

  return (
    <div className="flex h-full min-h-screen flex-col items-center pt-[90px] pb-[90px]">
      <div className="group sticky top-0 z-20 flex w-full justify-center bg-yellow-600">
        <div className="bg-p2 z-[1] flex w-full flex-col items-center justify-center gap-2 rounded-md p-4 py-5 text-white lg:flex-row lg:gap-10 lg:px-14">
          <div className="flex w-full flex-col items-start gap-1">
            <span>Item Name</span>
            <Searchbar className="flex w-full" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          </div>
          <div className="flex w-full flex-row justify-between lg:w-auto lg:gap-5">
            <div className="flex flex-col items-start gap-1">
              <span>Dimensions</span>
              <Dropdown
                className="h-10 w-36"
                setOption={(dimension) => setDimension(dimension)}
                options={dimensions}
                currentOption={dimension}
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <span>Dominant Color</span>
              <Dropdown
                className="w-28"
                setOption={(dominantColor) => setDominantColor(dominantColor)}
                options={dominantColors}
                currentOption={dominantColor}
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <span>Price</span>
              <Dropdown
                className="w-28"
                setOption={(price) => setPrice(price)}
                options={prices}
                currentOption={price}
              />
            </div>
          </div>
          {/* TODO: price ascending/descending */}
        </div>
      </div>
      <div className="flex w-screen items-center justify-center gap-12 px-8 py-12">
        <ul className="flex flex-wrap gap-12">
          {artWork.map((a) => (
            <li className="flex flex-col rounded-md border" key={a.id}>
              <div className="relative h-100 w-100 shrink-0 overflow-hidden rounded-md border xl:h-96 xl:w-96">
                <Image alt={a.title} src={a.imageUrl} style={{ objectFit: "contain" }} fill />
              </div>
              <span className="text-center text-lg font-semibold">{a.title}</span>
              {a.medium.length && <span>Medium: {a.medium.join(", ")}</span>}
              {a.genre.length && <span>Genre: {a.genre.join(", ")}</span>}
              {a.dimensions && <span>Dimensions: {a.dimensions}</span>}
              {a.tags.length && <span>Tags: {a.tags.join(", ")}</span>}
              {a.availability === "forSale" ? convertPrice(a.price) : a.availability === "soldOut" ? "soldOut" : ""}
              {a.availability === "forSale" && a.framed && <span>Framed</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Portfolio

const convertPrice = (price: number) => `$${String(price / 100)}`

interface ArtWork {
  title: string
  image: string
  price: number
  dimensions: string
  availability: "displayOnly" | "forSale" | "soldOut"
  framed: boolean
  medium: string[] // "charcoal" | "oil" | "acrylic" | "watercolor"
  genre: string[] // "hollywood" | "impressionist" | "abstract" | "traditional"
  id: string
  imageUrl: string
  tags: string[]
}

export const getStaticProps: GetStaticProps<{ artWork: Array<ArtWork> }> = (async () => {
  const artWork = await loadArtWork()
  console.log("getStaticProps", artWork)
  return {
    props: {
      artWork,
    },
  }
}) satisfies GetStaticProps<{
  artWork: ArtWork
}>
