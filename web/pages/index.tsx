import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"

const title = `Expression by Shue`

const description = `This website reflects an artistic journey that began in childhood, paused for decades, and found a new life in retirement. I hope you enjoy witnessing the evolution of my work and discover pieces that resonate with your passions and heartfelt life experiences. I would be honored to receive your commission requests.
 
– Shue Snyder
`

const Home: NextPage = () => {

  return (
    <div className="flex h-full min-h-screen w-screen ">
      <div className="flex w-full pb-[90px] pt-[90px]">
        <div className="flex w-full flex-col items-center max-w-full overflow-auto justify-center gap-8 lg:gap-12 p-8 lg:p-12">
          <p className="text-xl text-center">Welcome to Expression by Shue, where art, life, and passion emerge!</p>
          <div className="relative min-h-1/2 lg:min-h-[500px] flex max-w-full min-w-full lg:min-w-[1000px]">
          <div className="carousel overflow-x-auto w-full h-full flex snap-x snap-mandatory bg-yellow-100">
            <div className="w-full h-full flex flex-row">
            <div className="shrink-0 h-full snap-center w-full bg-red-100">carousel placeholder</div>
            <div className="shrink-0 h-full snap-center w-full bg-blue-100">carousel placeholder</div>
            <div className="shrink-0 h-full snap-center w-full bg-green-100">carousel placeholder</div>
            </div>
          </div>
          </div>
          {/* <div className="grid grid-cols-[288px_minmax(300px,500px)] gap-20">
            <div className="relative h-72 w-48 overflow-hidden rounded-md xl:h-96 xl:w-72">
              <Image
                alt={"shue's profile pic"}
                src={"/images/profile/shue-profile.jpeg"}
                style={{ objectFit: "cover" }}
                fill
              />
            </div>
            <p className="flex whitespace-pre-line">{description}</p>
          </div> */}
        </div>
      </div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Shue's art portfolio" />
        <link rel="icon" href="/images/rainbows/rainbow-blue-svgrepo-com.svg" />
      </Head>
    </div>
  )
}

export default Home
