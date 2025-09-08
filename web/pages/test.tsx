import { NextPage, InferGetStaticPropsType, GetStaticProps } from "next"
import { loadArtWork } from "@sanity/loadArtWork"
import Image from "next/image"

const Portfolio: NextPage<{ artWork: ArtWork[] }> = ({ artWork }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="flex h-full min-h-screen pb-[90px] pt-[90px]">
      <div className="flex w-screen items-center justify-center gap-12 py-12 px-8">
        <ul className="flex-wrap flex gap-12">
          {artWork.map((a) => (
            <li className="border rounded-md flex flex-col" key={a.id}>
              <div className="relative h-100 w-100 border shrink-0 overflow-hidden rounded-md xl:h-96 xl:w-96">
                <Image alt={a.title} src={a.imageUrl} style={{ objectFit: "contain" }} fill />
              </div>
              <span className="text-center font-semibold text-lg">{a.title}</span>
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
