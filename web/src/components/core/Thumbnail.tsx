import Image from "next/image"
import { FC } from "react"
import { ArtWork } from "@schemas/global"
import { clsx } from "clsx"

const Thumbnail: FC<{ onClick: () => void; project: ArtWork }> = ({ onClick, project }) => {
  return (
    <div
      id={project.id}
      className={clsx(
        "relative block h-96 w-96 transform overflow-hidden rounded-xs bg-white outline-20 outline-yellow-700",
        // highlight && "outline-solid outline-4 outline-offset-4 outline-white"
      )}
    >
      <Image
        alt={project.title}
        onClick={onClick}
        className={clsx("contrast-125 filter")}
        src={project.imageUrl}
        style={{ objectFit: "cover" }}
        fill
      />
    </div>
  )
}

export default Thumbnail
