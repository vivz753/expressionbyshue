import { loadArtWork } from "@sanity/loadArtWork"
import { Dropdown } from "@src/components/core/Dropdown"
import { Searchbar } from "@src/components/core/Searchbar"
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import Image from "next/image"
import { useMemo, useState } from "react"
import Modal from "@/src/components/core/Modal"
import { ArtWork, Medium } from "@schemas/global"

const dimensions = [
  { title: "All", value: "all" },
  { title: "16x20", value: "16x20" },
  { title: "16x24", value: "16x24" },
  { title: "24x30", value: "24x30" },
  { title: "24x36", value: "24x36" },
  { title: "30x45", value: "30x45" },
  { title: "32x40", value: "32x40" },
]
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

  const [activeWork, setActiveWork] = useState<ArtWork>(artWork[0])
  const [showModal, setShowModal] = useState(false)

  const onNext = (): void => {
    const currIndex = artWork.findIndex((i) => i === activeWork)
    const nextIndex = currIndex < artWork.length - 1 ? currIndex + 1 : 0
    setActiveWork(() => artWork[nextIndex])
  }
  const onPrev = (): void => {
    const currIndex = artWork.findIndex((i) => i === activeWork)
    const prevIndex = currIndex > 0 ? currIndex - 1 : artWork.length - 1
    setActiveWork(() => artWork[prevIndex])
  }

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
          {filteredArtwork &&
            filteredArtwork.length &&
            filteredArtwork.map((a) => (
              <li
                onClick={() => {
                  setActiveWork(a)
                  setShowModal(true)
                }}
                className="flex cursor-pointer flex-col rounded-md bg-yellow-600 p-2 text-white"
                key={a.id}
              >
                {a.imageUrl && (
                  <div className="relative h-100 w-100 shrink-0 overflow-hidden rounded-md bg-black xl:h-96 xl:w-96">
                    <Image alt={a.title} src={a.imageUrl} style={{ objectFit: "contain" }} fill />
                  </div>
                )}
                <div className="flex flex-col gap-1 p-8">
                  <span className="text-center text-lg font-semibold">{a.title}</span>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col gap-1">
                      {a.medium && a.medium.length && <span>Medium: {a.medium.join(", ")}</span>}
                      {a.support && <span>{a.support}</span>}
                      {a.genre && a.genre.length && <span>Genre: {a.genre.join(", ")}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                      {a.dimensions && <span>{a.dimensions} in.</span>}
                      {/* Only display framed attribute if painting is also for sale */}
                      {a.availability === "forSale" && <span>{a.framed ? "Framed" : "Unframed"}</span>}
                      {a.tags && a.tags.length && <span>Tags: {a.tags.join(", ")}</span>}
                      {/* Displays the availability status */}
                      {a.availability === "forSale"
                        ? convertPrice(a.price)
                        : a.availability === "sold"
                          ? "Sold"
                          : a.availability === "displayOnly"
                            ? "Display Only"
                            : "Reserved"}
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        project={activeWork}
        onNext={onNext}
        onPrev={onPrev}
      />
    </div>
  )
}

export default Portfolio

const convertPrice = (price: number) => `$${String(price / 100)}`

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
