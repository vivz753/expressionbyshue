import { FC } from "react"
import Thumbnail from "@/src/components/core/Thumbnail"
import { Medium, Art } from "@schemas/global"

const Gallery: FC<{
  setActiveProject: (artWork: Art) => void
  setShowModal: (show: boolean) => void
  projects: Art[]
  filter: Medium | null
}> = ({ setActiveProject, setShowModal, projects, filter }) => {
  return (
    <div className="flex w-full flex-wrap justify-center gap-4 md:gap-10">
      {projects.map((a, i) => (
        <Thumbnail
          highlight={a.medium === filter}
          project={a}
          key={i}
          onClick={() => {
            setActiveProject(a)
            setShowModal(true)
          }}
        />
      ))}
    </div>
  )
}

export default Gallery
