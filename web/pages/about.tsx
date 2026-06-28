import type { NextPage } from "next"
import Image from "next/image"
import Rainbow from "../src/components/core/Rainbow"

const text1 = `When I first stepped into the Art Hub Academy studio, I wasn't sure if I could ever recapture the feelings and creative touch I once enjoyed as a child, freely expressing dreams and imagination with canvas and color. But as I received thoughtful guidance from my instructors, Jose and Sal, my doubts and fears gradually faded. After a few sessions of navigating the learning curve, I completed my very first oil.`

const text2 = `While cleaning a massive pile of photos collected over the years, I stumbled upon an old photo of Vivien Leigh that I purchased with the hope of drawing her after passing my high school entrance exam. Little did I know it would take 60 years to finally fulfill that wish! 
 
Much like Scarlett O'Hara, I believe in starting anew, no matter how long the pause. “After all, tomorrow is another day.” Returning to painting after decades away, I now bring those dreams to life—one brushstroke at a time.
 
To see more of the legendary, elegant, and talented movie stars, please visit the My Canvas of Hollywood online gallery.`

const About: NextPage = () => {
  return (
    <div className="min-h-screen pt-[90px] pb-[90px]">
      <div className="flex w-screen flex-col items-center justify-center gap-12 px-12 py-12">
        <div className="flex flex-col items-center justify-center gap-12 lg:w-[1024px] lg:p-12">
          <div className="flex max-w-full flex-col items-center gap-12 lg:flex-row lg:gap-20">
            <ShuePortrait />
            <p className="whitespace-pre-line">{shueBio}</p>
          </div>
          <span className="h-2 max-w-full rounded-full bg-orange-800 lg:w-[1024px]" />
          <div className="flex max-w-full flex-col items-center gap-12 lg:gap-20">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
              <div className="flex max-w-full flex-col items-center gap-12 lg:flex-row lg:gap-20">
                <p className="whitespace-pre-line">{ginaBio}</p>
                <div className="order-first lg:order-last">
                  <GinaPortrait />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

const ShuePortrait: React.FC = () => {
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
const GinaPortrait: React.FC = () => {
  return (
    <div className="relative h-72 w-48 shrink-0 overflow-hidden rounded-md xl:h-96 xl:w-72">
      <Image alt={"gina's profile pic"} src={"/images/profile/gina.png"} style={{ objectFit: "cover" }} fill />
    </div>
  )
}

const shueBio = `About Shue
 

After retiring from a fulfilling high-tech career in 2024, I rekindled my lifelong passion for art and joined Gina to begin formally studying oil painting at the Hub Academy in Saratoga, California. I soon realized that the creativity and passion I had as a child had never truly left me.
 
Receiving several commission requests, I decided to pursue my dream of becoming a professional artist. Through this journey, I hope not only to share my artwork, but also to inspire fellow retirees to believe that it is never too late to pursue unfulfilled dreams and turn them into reality.

 
Shue Snyder, August 20, 2024`

const ginaBio = `About Gina

Gina is a passionate visionary who has transformed her career multiple times as business owner. 

 Upon retiring, rather than resting on her laurels, Gina chose to pursue her childhood dream of becoming a professional painter. With a vibrant palette and an eye for detail, her artwork quickly gained attention. Gina has showcased her talent in several art shows, earning acclaim and delighting art enthusiasts with her unique perspective and expressive style. Today, Gina continues creating, inspiring others to follow their passions and embrace their creativity at any stage of life.`
