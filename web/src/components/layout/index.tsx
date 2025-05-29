import Link from "next/link"
import { FC } from "react"
import { FaInstagram } from "react-icons/fa"
import { MdOutlineMailOutline } from "react-icons/md"

type NavigationLink = {
  name: string
  url: string
}

const labels: NavigationLink[] = [
  { name: "portfolio", url: "/" },
  { name: "about", url: "/about" },
]

const Header: FC = () => {
  return (
    <header className="absolute top-0 z-[1] flex h-[72px] w-full flex-row items-center gap-5 bg-yellow-600 p-10">
      {labels.map((label, i) => (
        <Link key={i} href={label.url}>
          <span className="mx-4 rounded-xl text-white hover:text-yellow-900">{label.name}</span>
        </Link>
      ))}
    </header>
  )
}

const Footer: FC = () => {
  return (
    <footer className="absolute bottom-0 z-[1] flex h-24 w-full flex-col items-center justify-center gap-4 bg-yellow-600 md:flex-row lg:gap-8 lg:p-10">
      <Link className="group flex flex-row items-center gap-2" href="shuesnyder@gmail.com">
        <MdOutlineMailOutline className="h-6 w-6 text-white group-hover:text-yellow-800 md:h-8 md:w-8" />
        <span className="text-white group-hover:text-yellow-800">shuesnyder@gmail.com</span>
      </Link>
      <Link className="flex group flex-row items-center gap-2" href="https://instagram.com/">
        <FaInstagram className="h-6 w-6 text-white group-hover:text-yellow-800 md:h-8 md:w-8" />
        <span className="text-white group-hover:text-yellow-800"></span>
      </Link>
    </footer>
  )
}

const Layout: FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative flex w-full flex-col overflow-auto">
      <Header />
      <Footer />
      <div className="flex h-full min-h-screen">{children}</div>
    </div>
  )
}

export default Layout
