import Link from "next/link"
import { FC } from "react"
import { FaInstagram } from "react-icons/fa"
import { MdOutlineMailOutline } from "react-icons/md"
import Image from "next/image"

type NavigationLink = {
  name: string
  url: string
}

const labels: NavigationLink[] = [
  { name: "portfolio", url: "/portfolio" },
  { name: "about", url: "/about" },
  // { name: "contact", url: "/contact" },
]

const Header: FC = () => {
  return (
    <header className="absolute top-0 z-1 flex h-[90px] w-full flex-row items-center justify-evenly lg:justify-start lg:gap-8 bg-yellow-600 lg:px-8">
      <Link href="/">
        <div className="relative h-[50px] w-[125px] lg:h-[100px] lg:w-[250px]">
          <Image
            alt="Expression by Shue"
            fill
            style={{ objectFit: "fill" }}
            src={"/images/expressionbyshue-logo.png"}
          />
        </div>
      </Link>
      {labels.map((label, i) => (
        <Link key={i} href={label.url}>
          <span className="rounded-xl text-white hover:text-yellow-900">{label.name}</span>
        </Link>
      ))}
    </header>
  )
}

const Footer: FC = () => {
  return (
    <footer className="absolute bottom-0 z-1 flex h-[90px] w-full flex-col items-center justify-center gap-4 bg-yellow-600 md:flex-row lg:gap-8">
      <Link className="group flex flex-row items-center gap-2" href="mailto:shuesnyder@gmail.com">
        <MdOutlineMailOutline className="h-6 w-6 text-white group-hover:text-yellow-800 md:h-8 md:w-8" />
        <span className="text-white group-hover:text-yellow-800">shuesnyder@gmail.com</span>
      </Link>
      {/* <Link className="group flex flex-row items-center gap-2" href="https://instagram.com/">
        <FaInstagram className="h-6 w-6 text-white group-hover:text-yellow-800 md:h-8 md:w-8" />
        <span className="text-white group-hover:text-yellow-800"></span>
      </Link> */}
    </footer>
  )
}

const Layout: FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative flex w-full flex-col">
      <Header />
      <div className="flex h-full min-h-screen">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
