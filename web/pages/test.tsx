import type { NextPage } from "next"
import Rainbow from "../src/components/core/Rainbow"

const About: NextPage = () => {
  return (
    <div className="flex h-full min-h-screen w-screen flex-col items-center gap-20 border border-red-500 pb-24 pt-[72px] md:px-12 xl:px-20">
      <div className="flex flex-col items-center justify-center">
        <Rainbow />
        <span className="text-3xl">Test Display</span>
      </div>
      <div className="flex flex-wrap gap-10">
        <span className="flex h-20 w-20 items-center justify-center rounded-md bg-warm-clay">
          <span className="text-white">hello</span>
        </span>
        <span className="flex h-20 w-20 items-center justify-center rounded-md bg-golden-mist">
          <span className="text-white">hello</span>
        </span>
        <span className="flex h-20 w-20 items-center justify-center rounded-md bg-dusty-rose">
          <span className="text-white">hello</span>
        </span>
        <span className="flex h-20 w-20 items-center justify-center rounded-md bg-sage-green">
          <span className="text-white">hello</span>
        </span>
        <span className="flex h-20 w-20 items-center justify-center rounded-md bg-sky-blue-gray">
          <span className="text-white">hello</span>
        </span>
      </div>
    </div>
  )
}

export default About
