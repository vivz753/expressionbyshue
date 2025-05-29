import Gallery from "@/src/components/core/Gallery"
import Modal from "@/src/components/core/Modal"
import Rainbow from "@/src/components/core/Rainbow"
import { images } from "@components/ArtWorks"
import { Art, Medium } from "@schemas/global"
import clsx from "clsx"
import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useState } from "react"

const title = `Shue's Portfolio`
const traditionalImages = images.filter((x) => x.medium !== Medium.TWOD && x.medium !== Medium.THREED)
const digitalImages = images.filter((x) => x.medium === Medium.TWOD || x.medium === Medium.THREED)
const traditionalFilters = [Medium.OIL]

function scrollToElement(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}

const Home: NextPage = () => {
  const [filter, setFilter] = useState<Medium | null>(null)
  const [activeImage, setActiveImage] = useState<Art>(traditionalImages[0])
  const [showModal, setShowModal] = useState(false)

  const onNext = (): void => {
    const currIndex = images.findIndex((i) => i === activeImage)
    const nextIndex = currIndex < images.length - 1 ? currIndex + 1 : 0
    setActiveImage(() => images[nextIndex])
  }
  const onPrev = (): void => {
    const currIndex = images.findIndex((i) => i === activeImage)
    const prevIndex = currIndex > 0 ? currIndex - 1 : images.length - 1
    setActiveImage(() => images[prevIndex])
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Oil painter." />
        <link rel="icon" href="/images/rainbows/rainbow-blue-svgrepo-com.svg" />
      </Head>
      <div className="flex h-full min-h-screen w-full flex-row pb-24 pt-[72px]">
        {/* Categories */}
        <div className="hidden flex-col sm:w-[320px] lg:flex">
          <div className="sticky top-0 flex flex-col items-center justify-start gap-8 p-20">
            <Link
              href="/#traditional"
              className="w-64 rounded-md bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-500"
            >
              Traditional
            </Link>
            {traditionalFilters.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f)
                  scrollToElement(f)
                }}
                className={clsx(
                  f === filter && "outline outline-2 outline-offset-2 outline-yellow-300",
                  "ml-8 w-56 rounded-md bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-500"
                )}
              >
                {f}
              </button>
            ))}
            {/*  Chat Dialogue */}
            <div className="m-16 flex items-center justify-center">
              <div
                className="group relative flex h-32 w-32 rounded-full bg-cover bg-right"
                style={{ backgroundImage: `url('/images/profile/shue-close-profile.jpeg')` }}
              >
                <div
                  className={clsx(
                    "absolute -top-12 right-0 translate-x-full rounded-md border border-yellow-900  p-4 text-yellow-900 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                  )}
                >
                  你好
                </div>
              </div>
            </div>
          </div>
          {/* For sticky purposes, needs empty box as sibling */}
          <div className="flex h-full w-full" />
        </div>
        {/* Galleries */}
        <div className="flex h-full w-full items-center justify-center p-4 sm:p-8">
          <div className="flex w-full flex-col items-center gap-4 lg:gap-10">
            <div className="flex flex-col">
              <Rainbow />
              <span className="text-3xl">Portfolio</span>
            </div>
            <div className="flex h-full w-full flex-col justify-center gap-5 rounded-xl bg-yellow-700 p-4 pb-8 sm:p-8 lg:p-16">
              <h1 id="traditional" className="my-8 text-center text-3xl text-white lg:mb-12 lg:text-left">
                Traditional
              </h1>
              <Gallery
                filter={filter}
                setActiveImage={setActiveImage}
                setShowModal={setShowModal}
                images={traditionalImages}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)} image={activeImage} onNext={onNext} onPrev={onPrev} />
    </>
  )
}

export default Home
