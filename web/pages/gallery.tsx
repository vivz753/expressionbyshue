import { loadArtWork } from "@sanity/loadArtWork"
import { ArtWork } from "@schemas/global"
import { priceOptions, dominantColorOptions } from "@src/components/core/Dropdown"
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import { useMemo, useState } from "react"
import Modal from "@/src/components/core/Modal"
import { SearchFilterBar } from "@src/components/core/SearchFilterBar"
import { Card } from "@/src/components/core/Card"

const filterBySearch = (products: ArtWork[], input: string) => {
  if (!input) return products

  const filteredProducts = products.filter((product) => {
    return (
      product.title
        .toLowerCase()
        .trim()
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

// const filterByDimension = (products: ArtWork[], input: { title: string; value: string }) => {
//   if (input.value === "all") return products

//   return products.filter((product) => product.dimensions.toLowerCase() === input.value.toLowerCase())
// }

// const filterByDominantColor = (products: ArtWork[], input: { title: string; value: string }) => {
//   if (input.value === "all") return products
//   return products.filter((product) => product.dominantColor?.toLowerCase() === input.value.toLowerCase())
// }

const SalePage: NextPage<{ artWork: ArtWork[] }> = ({ artWork }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [searchValue, setSearchValue] = useState("")
  // const [dimension, setDimension] = useState(dimensions[0])
  const [dominantColor, setDominantColor] = useState(dominantColorOptions[0])
  const [price, setPrice] = useState(priceOptions[0])

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
      filterBySearch(artWork, searchValue)?.filter((product) => !product.hidden),

    [searchValue, artWork],
  )

  console.log("filteredArtwork", filteredArtwork)

  return (
    <div className="flex h-full min-h-screen flex-col items-center pt-[90px] pb-[90px]">
      <SearchFilterBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="flex w-screen items-center justify-center gap-12 px-8 py-12">
        <ul className="grid-auto-flow grid place-items-center gap-12 sm:grid-cols-2 xl:grid-cols-3 xl:gap-20">
          {filteredArtwork && filteredArtwork.length > 0 ? (
            filteredArtwork.map((a) => (
              <Card
                key={a.id}
                onClick={() => {
                  setActiveWork(a)
                  setShowModal(true)
                }}
                artWork={a}
              />
            ))
          ) : (
            <div>No artworks found.</div>
          )}
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

export default SalePage

export const getStaticProps: GetStaticProps<{ artWork: Array<ArtWork> }> = (async () => {
  const artWork = await loadArtWork()
  console.log("getStaticProps", artWork)

  const displayOnlyArtWork = artWork.filter((product: ArtWork) => product.availability === "displayOnly")
  console.log("filtered by availability displayOnly:", displayOnlyArtWork)
  return {
    props: {
      artWork: displayOnlyArtWork,
    },
  }
}) satisfies GetStaticProps<{
  artWork: ArtWork
}>
