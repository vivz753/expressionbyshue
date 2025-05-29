import type { NextPage } from "next"
import Image from "next/image"
import Rainbow from "../src/components/core/Rainbow"

const About: NextPage = () => {
  return (
    <div className="flex items-center h-full justify-center pb-24 min-h-screen pt-[72px] md:px-12 xl:px-20">
      <div className="p-4 sm:p-8 grid w-full grid-flow-row items-center justify-center gap-4 rounded-xl md:grid-cols-5 lg:w-3/4 lg:gap-10">
        <div className="grid gap-10 md:col-span-5 md:grid-cols-5">
          <div className="flex flex-col items-center justify-center md:col-span-2 gap-4 lg:gap-10">
            <div className="flex flex-col items-center justify-center md:col-span-2">
              <Rainbow />
              <span className="text-3xl">Shue Snyder</span>
            </div>
            <SelfPortrait />
          </div>
          <div className="flex items-center md:col-span-3">
            <BioCard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

const SelfPortrait: React.FC = () => {
  return (
    <div className="flex items-center justify-center rounded-xl bg-yellow-700 p-10 lg:p-12 xl:p-14">
      <div className="relative h-72 w-48 overflow-hidden rounded-xl xl:h-96 xl:w-72">
        <Image
          alt={"shue's profile pic"}
          src={"/images/profile/shue-profile.jpeg"}
          style={{ objectFit: "cover" }}
          fill
        />
      </div>
    </div>
  )
}

const BioCard: React.FC = () => {
  return (
    <div className="flex w-full flex-col rounded-xl border border-yellow-700 p-8 text-yellow-900 xl:w-full">
      <span className="mt-8 text-xl">{`About Me`}</span>
      <span className="mt-8">
        {`Art has always been a part of who I am. As a child, I was recognized for my natural talent and received numerous art awards, dreaming of one day becoming an artist. But life took me in a different direction, pausing my artistic journey for nearly 50 years.`}
      </span>
      <span className="mt-8">
        {`I finally returned to the easel after retiring from a fulfilling high-tech career in 2024. Now a grandma with seven grandchildren, I’m exploring oil painting—a new medium I had never studied. When I completed my first still life, I felt the same spark that once defined my youth and realized that my passion and artistry had never truly left me.`}
      </span>
      <span className="mt-2">
        {`As I continue to grow as an artist through my studies at Art Hub Academy, I’ve also been encouraged by commission requests from those who find meaning in my work. These opportunities allow me to create thoughtful, lasting pieces that tell stories through my brush. I strive to capture the warmth, emotion, and profound connections with people, nature, and the world around us.`}
      </span>
      <span className="mt-8">
        <span className="mt-8">
          {`Let’s connect—whether you’re interested in a custom piece or simply wish to follow my creative journey, I’d love to hear from you.`}{" "}
          <span className="mt-2"></span>
        </span>
        {` `}
      </span>
    </div>
  )
}
