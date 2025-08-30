import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"

const title = `Expression by Shue`

const description = `This website reflects an artistic journey that began in childhood, paused for decades, and found a new life in retirement. I hope you enjoy witnessing the evolution of my work and discover pieces that resonate with your passions and heartfelt life experiences. I would be honored to receive your commission requests.
 
– Shue Snyder
`

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Shue's art portfolio" />
        <link rel="icon" href="/images/rainbows/rainbow-blue-svgrepo-com.svg" />
      </Head>
      <div className="flex h-full min-h-screen w-screen pb-[90px] pt-[90px]">
        <div className="flex w-full flex-col items-center max-w-full justify-center gap-8 lg:gap-12 p-8 lg:p-12">
          <p className="text-xl text-center">Welcome to Expression by Shue, where art, life, and passion emerge!</p>
          <Carousel />
          <div className="grid place-items-center gap-12 grid-cols-1 lg:grid-cols-[288px_minmax(300px,500px)] lg:gap-20">
            <div className="relative h-72 w-48 overflow-hidden rounded-md xl:h-96 xl:w-72">
              <Image
                alt={"shue's profile pic"}
                src={"/images/profile/shue-profile.jpeg"}
                style={{ objectFit: "cover" }}
                fill
              />
            </div>
            <p className="flex whitespace-pre-line">{description}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home

const Carousel = () => (
  <div className="relative h-full min-h-[50vh] lg:min-h-[500px] flex max-w-full min-w-full lg:min-w-[1000px]">
    <div className="carousel top-0 right-0 bottom-0 left-0  scroll-smooth overflow-x-auto w-full h-full flex snap-x snap-mandatory">
      {/* <div className="w-full h-full flex flex-row"> */}
        <div className="slide shrink-0 h-full w-full flex relative">
          <Image alt="canyon sunset" src={"/images/art/canyon-sunset.jpg"} fill style={{ objectFit: "contain" }} />
          <div className="snapper snap-center absolute top-0 left-0  w-full" />
        </div>
        <div className="slide shrink-0 h-full w-full flex relative">
          <Image alt="portrait of andy" src={"/images/art/portrait-andy.jpg"} fill style={{ objectFit: "contain" }} />
          <div className="snapper snap-center absolute top-0 left-0 w-full" />
        </div>
        <div className="slide shrink-0 h-full w-full flex relative">
          <Image
            alt="farm cherry blossoms"
            src={"/images/art/farm-cherry-blossoms-oil.jpg"}
            fill
            style={{ objectFit: "contain" }}
          />
          <div className="snapper snap-center absolute top-0 left-0 w-full" />
        </div>
      </div>
    {/* </div> */}
  </div>
)
