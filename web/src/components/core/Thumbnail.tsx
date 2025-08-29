import Image from "next/image"
import { FC } from "react"
import { Art } from "@schemas/global"
import { clsx } from "clsx"

const Thumbnail: FC<{ onClick: () => void; image: Art; highlight: boolean }> = ({ onClick, image, highlight }) => {
  return (
    <div
      id={image.medium}
      className={clsx(
        "relative block h-36 w-36 transform cursor-pointer overflow-hidden rounded-lg bg-white transition duration-150 ease-in-out hover:scale-110 md:h-48 md:w-48",
        highlight && "outline-solid outline-4 outline-offset-4 outline-white"
      )}
    >
      <Image
        alt={image.title}
        onClick={onClick}
        className={clsx("contrast-125 filter")}
        src={image.url}
        style={{ objectFit: "cover" }}
        fill
      />
    </div>
  )
}

export default Thumbnail
