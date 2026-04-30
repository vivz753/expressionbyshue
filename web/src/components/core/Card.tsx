import Image from "next/image"
import { ArtWork } from "@schemas/global"

const convertPrice = (price: number) => `$${String(price / 100)}`

interface CardProps {
  onClick: () => void
  artWork: ArtWork
}

export const Card: React.FC<React.PropsWithChildren<CardProps>> = ({ onClick, artWork }) => {
  const a = artWork
  return (
    <li onClick={onClick} className="flex cursor-pointer flex-col rounded-md bg-yellow-600 p-2 text-white" key={a.id}>
      <span className="max-w-[400px] p-4 text-center text-lg font-semibold wrap-anywhere break-all">{a.title}</span>
      {a.imageUrl && (
        <div className="relative h-100 w-100 shrink-0 overflow-hidden rounded-md bg-black xl:h-96 xl:w-96">
          <Image alt={a.title} src={a.imageUrl} style={{ objectFit: "contain" }} fill />
        </div>
      )}
      <div className="flex flex-col gap-4 px-6 py-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-1">
            {a.medium && a.medium.length && <span className="capitalize">{a.medium.join(", ")}</span>}
          </div>
          <div className="flex flex-col gap-1">
            {a.width && a.height && (
              <span>
                {a.width}x{a.height} in.
              </span>
            )}
            {/* {a.tags && a.tags.length && <span>Tags: {a.tags.join(", ")}</span>} */}
            {a.availability === "forSale" && a.price > 0 && (
              <span>
                {convertPrice(a.price)} {a.framed ? "(framed)" : "(unframed)"}
              </span>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}
