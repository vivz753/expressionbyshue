import type { NextPage } from "next"
import Image from "next/image"
import Rainbow from "../src/components/core/Rainbow"

const text1 = `While cleaning a massive pile of photos collected over the years, I stumbled upon an old photo of Vivien Leigh that I purchased with the hope of drawing her after passing my high school entrance exam. Little did I know it would take 60 years to finally fulfill that wish! 
 
Much like Scarlett O’Hara, I believe in starting anew, no matter how long the pause. “After all, tomorrow is another day.” Returning to painting after decades away, I now bring those dreams to life—one brushstroke at a time.
 
To see more of the legendary, elegant, and talented movie stars, please visit the My Canvas of Hollywood online gallery.`

const text2 = `While cleaning a massive pile of photos collected over the years, I stumbled upon an old photo of Vivien Leigh that I purchaWhen I first stepped into the Art Hub Academy studio, I wasn’t sure if I could ever recapture the feelings and creative touch I once enjoyed as a child, freely expressing dreams and imagination with canvas and color. But as I received thoughtful guidance from my instructors, Jose and Sal, my doubts and fears gradually faded. After a few sessions of navigating the learning curve, I completed my very first oil `

const About: NextPage = () => {
  return (
    <div className="flex h-full min-h-screen pb-[90px] pt-[90px]">
      <div className="flex w-screen flex-col items-center justify-center gap-12 py-12 ">
        <div className="flex w-[1024px] flex-row items-center gap-20">
          <SelfPortrait />
          <BioCard />
        </div>
        <span className="h-2 w-[1024px] rounded-full bg-orange-800" />
        <div className="flex w-[1024px] flex-col items-center gap-20">
          <div className="flex flex-row items-center gap-20">
            <div className="flex flex-col gap-8">
              <p className="whitespace-pre-line text-xl">First Step with Still Life in Oil</p>
              <p className="whitespace-pre-line">{text1}</p>
            </div>
            <div className="relative h-72 w-72 shrink-0 overflow-hidden rounded-md xl:h-96 xl:w-96">
              <Image
                alt={"shue's profile pic"}
                src={"/images/art/teapots-oil.jpg"}
                style={{ objectFit: "contain" }}
                fill
              />
            </div>
          </div>
          <div className="flex flex-row items-center gap-20">
            <div className="flex flex-col gap-8">
              <p className="whitespace-pre-line text-xl">
                {`"Tomorrow is Another Day", Vivien Leigh, Pencil Drawing, May 2025.`}
              </p>
              <p className="whitespace-pre-line">{text2}</p>
            </div>
            <div className="relative h-72 w-72 shrink-0 overflow-hidden rounded-md xl:h-96 xl:w-96">
              <Image
                alt={"shue's profile pic"}
                src={"/images/art/portrait-vivianleigh.jpg"}
                style={{ objectFit: "contain" }}
                fill
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

const SelfPortrait: React.FC = () => {
  return (
    <div className="relative h-72 w-48 shrink-0 overflow-hidden rounded-md xl:h-96 xl:w-72">
      <Image
        alt={"shue's profile pic"}
        src={"/images/profile/shue-look-over.png"}
        style={{ objectFit: "cover" }}
        fill
      />
    </div>
  )
}

const bio = `Recognized for my natural talent and received numerous art awards during my childhood, I fueled my dream of becoming a professional artist. However, life took me in a different direction, and my artistic journey was set aside for nearly 60 years.

When retired from a fulfilling high-tech career in 2024, I decided to rekindle my raw talent and started to study oil painting at the  Hub Academy in Saratoga, California. Needless to say, I also soon discovered that the spark of creativity, passion, and artistry that once defined my youth had never truly left me.

This website is created not only to share my progress on this new journey, but also to inspire fellow retirees that it’s never too late to pursue unfulfilled dreams. I would be honored if you find some pieces that resonate with your life experiences or artistic appreciation, as well as to receive commission requests inspired by the expressions in my artwork. 

Shue Snyder August 10, 2025`
const BioCard: React.FC = () => {
  return (
    <div className="flex">
      <p className="whitespace-pre-line">{bio}</p>
    </div>
  )
}
