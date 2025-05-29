import { FC } from "react"
import Thumbnail from "@/src/components/core/Thumbnail"
import { Medium, Art } from "@schemas/global"

const Gallery: FC<{
  setActiveImage: (image: Art) => void
  setShowModal: (show: boolean) => void
  images: Art[]
  filter: Medium | null
}> = ({ setActiveImage, setShowModal, images, filter }) => {
  return (
    <div className="flex w-full flex-wrap justify-center gap-4 md:gap-10">
      {images.map((image, i) => (
        <Thumbnail
          highlight={image.medium === filter}
          image={image}
          key={i}
          onClick={() => {
            setActiveImage(image)
            setShowModal(true)
          }}
        />
      ))}
    </div>
  )
}

export default Gallery
