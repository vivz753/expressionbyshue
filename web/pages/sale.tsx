import { loadArtWork, loadGenres } from "@sanity/loadArtWork"
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import React, { useMemo, useState } from "react"
import { priceOptions, artistOptions } from "@src/components/core/Dropdown"
import Modal from "@/src/components/core/Modal"
import { ArtWork } from "@schemas/global"
import { SearchFilterBar } from "@src/components/core/SearchFilterBar"
import { Card } from "@/src/components/core/Card"
import { filterBySearch, filterByGenre, filterByArtist, sortByPrice, capitalizeWords } from "@/src/helpers"

const SalePage: NextPage<{ artWork: ArtWork[]; genres: string[] }> = ({
  artWork,
  genres,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // fetch the genres directly from Sanity.IO and get the unique list to use as options
  const uniqueGenres = useMemo(
    () => [
      ...new Set(
        genres
          .flat()
          .filter((g) => g !== null && g.trim() !== "")
          .map((g) => {
            return g.trim().toLowerCase()
          }),
      ),
      "all",
    ],
    [genres],
  )

  const genreOptions = uniqueGenres.sort().map((g) => {
    return { title: capitalizeWords(g), value: g }
  })

  const [searchValue, setSearchValue] = useState("")
  const [price, setPrice] = useState(priceOptions[0])
  const [artist, setArtist] = useState(artistOptions[0])
  const [genre, setGenre] = useState(genreOptions[0])

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
      // filterByDimension(artWork, dimension),
      sortByPrice(filterByGenre(filterByArtist(filterBySearch(artWork, searchValue), artist), genre), price)?.filter(
        (product) => !product.hidden,
      ),

    [genre, price, artist, searchValue, artWork],
  )

  console.log("filteredArtwork", filteredArtwork)

  return (
    <div className="flex h-full min-h-screen flex-col items-center pt-[90px] pb-[90px]">
      <SearchFilterBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        price={price}
        setPrice={setPrice}
        artist={artist}
        setArtist={setArtist}
        genre={genre}
        setGenre={setGenre}
        genreOptions={genreOptions}
      />
      <div className="flex items-center justify-center gap-12 px-8 py-12">
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

export const getStaticProps: GetStaticProps<{ artWork: Array<ArtWork>; genres: string[] }> = (async () => {
  const artWork = await loadArtWork()
  const genres = await loadGenres()
  console.log("getStaticProps", artWork)

  const availableForSaleArtWork = artWork.filter((product: ArtWork) => product.availability === "forSale")
  console.log("filtered by availability forSale:", availableForSaleArtWork)
  return {
    props: {
      artWork: availableForSaleArtWork,
      genres: genres,
    },
    revalidate: 60, // important to revalidate cached datasets in case updates to Sanity get published
  }
}) satisfies GetStaticProps<{
  artWork: ArtWork
  genres: string[]
}>
