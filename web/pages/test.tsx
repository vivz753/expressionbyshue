import { loadArtWork } from "@sanity/loadArtWork"
import { Dropdown } from "@src/components/core/Dropdown"
import { Searchbar } from "@src/components/core/Searchbar"
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import Image from "next/image"
import { useMemo, useState } from "react"

const dimensions = [
  { title: "All", value: "all" },
  { title: "9x12", value: "9x12" },
  { title: "11x14", value: "11x14" },
]
// const dominantColors = ["all", "redDominant", "yellowDominant", "blueDominant", "monochrome", "warmPalette", "coldPalette"]
const dominantColors = [
  { title: "All", value: "all" },
  { title: "Red Dominant", value: "redDominant" },
  { title: "Yellow Dominant", value: "yellowDominant" },
  { title: "Blue Dominant", value: "blueDominant" },
  { title: "Monochrome", value: "monochrome" },
  { title: "Cold Palette", value: "coldPalette" },
  { title: "Warm Palette", value: "warmPalette" },
]
const prices = [
  { title: "Low to High", value: "ascending" },
  { title: "High to Low", value: "descending" },
]

const filterBySearch = (products: ArtWork[], input: string) => {
  if (!input) return products

  const filteredProducts = products.filter((product) => {
    return (
      product.title
        .toLowerCase()
        .split(" ")
        .findIndex((token) => token.startsWith(input.toLowerCase()) || input.toLowerCase().includes(token)) !== -1 || // second condition for inputs w 1 token + a space
      product.title.toLowerCase().includes(input.toLowerCase()) || // for inputs w/ multiple tokens + spaces
      (product.tags &&
        product.tags?.findIndex(
          (tag) => tag.toLowerCase().startsWith(input.toLowerCase()) || input.toLowerCase().includes(tag),
        ) !== -1)
      // input.toLowerCase().includes(product.artist.toLowerCase()) ||
      // product.artist.toLowerCase().startsWith(input.toLowerCase()) ||
      // input.toLowerCase().includes(product.category?.toLowerCase() || "") ||
      // product.category?.toLowerCase().startsWith(input.toLowerCase())
    )
  })

  console.log("filterByName", filteredProducts)

  return filteredProducts
}

const filterByDimension = (products: ArtWork[], input: { title: string; value: string }) => {
  if (input.value === "all") return products

  return products.filter((product) => product.dimensions.toLowerCase() === input.value.toLowerCase())
}

const filterByDominantColor = (products: ArtWork[], input: { title: string; value: string }) => {
  if (input.value === "all") return products
  return products.filter((product) => product.dominantColor?.toLowerCase() === input.value.toLowerCase())
}

const sortByPrice = (products: ArtWork[], input: { title: string; value: string }) => {
  if (input.value === "ascending") {
    return products.sort((a, b) => a.price - b.price)
  } else if (input.value === "descending") {
    return products.sort((a, b) => b.price - a.price)
  }
}

const Portfolio: NextPage<{ artWork: ArtWork[] }> = ({ artWork }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [searchValue, setSearchValue] = useState("")
  const [dimension, setDimension] = useState(dimensions[0])
  const [dominantColor, setDominantColor] = useState(dominantColors[0])
  const [price, setPrice] = useState(prices[0])

  // TODO: add a debouncer
  // TODO: consider making this async
  const filteredArtwork = useMemo(
    () =>
      // TODO: consider swapping order of filters to improve perf
      // filterByDominantColor(artWork, dominantColor),
      // filterByDimension(artWork, dimension),
      sortByPrice(
        filterByDominantColor(filterByDimension(filterBySearch(artWork, searchValue), dimension), dominantColor),
        price,
      )?.filter((product) => !product.hidden),

    [dimension, dominantColor, price, searchValue, artWork],
  )

  console.log("filteredArtowrk", filteredArtwork)

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
              <span className="whitespace-nowrap">Dimensions (in.)</span>
              <Dropdown
                setOption={(dimension) => setDimension(dimension)}
                options={dimensions}
                currentOption={dimension}
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <span className="whitespace-nowrap">Dominant Color</span>
              <Dropdown
                setOption={(dominantColor) => setDominantColor(dominantColor)}
                options={dominantColors}
                currentOption={dominantColor}
              />
            </div>
            <div className="flex flex-col items-start gap-1">
              <span>Price</span>
              <Dropdown setOption={(price) => setPrice(price)} options={prices} currentOption={price} />
            </div>
          </div>
          {/* TODO: price ascending/descending */}
        </div>
      </div>
      <div className="flex w-screen items-center justify-center gap-12 px-8 py-12">
        <ul className="flex flex-wrap gap-12">
          {filteredArtwork && filteredArtwork.length && filteredArtwork.map((a) => (
            <li className="flex flex-col rounded-md border" key={a.id}>
              <div className="relative h-100 w-100 shrink-0 overflow-hidden rounded-md border xl:h-96 xl:w-96">
                <Image alt={a.title} src={a.imageUrl} style={{ objectFit: "contain" }} fill />
              </div>
              <div className="flex flex-col gap-1 p-8">
                <span className="text-center text-lg font-semibold">{a.title}</span>
                {a.medium.length && <span>Medium: {a.medium.join(", ")}</span>}
                {a.support && <span>{a.support}</span>}
                {/* {a.genre.length && <span>Genre: {a.genre.join(", ")}</span>} */}
                {a.dimensions && <span>{a.dimensions}</span>}
                <span>{a.framed ? "Framed" : "Unframed"}</span>
                {a.tags.length && <span>Tags: {a.tags.join(", ")}</span>}
                {a.availability === "forSale"
                  ? convertPrice(a.price)
                  : a.availability === "sold"
                    ? "Sold"
                    : a.availability === "displayOnly"
                      ? "displayOnly"
                      : "Reserved"}
              </div>
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
  imageUrl: string // originally image but queried as imageUrl
  hidden: boolean
  dimensions: string // TBD format
  availability: "displayOnly" | "forSale" | "sold" | "reserved"
  price: number
  framed: boolean
  medium: string[] // "charcoal" | "oil" | "acrylic" | "watercolor"
  support: "canvas" | "paper" | "board" | "linen" | "panel"
  genre: string[] // "portrait" | "landscape" | "seascape" | "cityscape" | "still life" | "narrative"
  style: string[] // "traditional" | "impressionism" | "expressionism" | "abstract"
  orientation: "portrait" | "landscape" | "square" | "round/oval"
  dominantColor: "warmPalette" | "coldPalette" | "yellowDominant" | "redDominant" | "blueDominant" | "monochrome"
  date: string // YYYY-MM-DD
  tags: string[]
  id: string
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
