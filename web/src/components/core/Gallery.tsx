import { FC } from "react"
import Thumbnail from "@/src/components/core/Thumbnail"
import { ArtWork } from "@schemas/global"

const Gallery: FC<{
  setActiveProject: (artWork: ArtWork) => void
  setShowModal: (show: boolean) => void
  projects: ArtWork[]
}> = ({ setActiveProject, setShowModal, projects }) => {
  console.log("projects", projects)
  return (
    <div className="flex w-full flex-wrap justify-center gap-20">
      {projects.map((a, i) => (
        <Thumbnail
          // highlight={a.medium === filter}
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
