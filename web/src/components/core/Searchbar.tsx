import clsx from "clsx"
import { ChangeEventHandler, FC } from "react"

export const Searchbar: FC<{
  className?: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement> | undefined
}> = ({ className, value, onChange }) => {
  return (
    <input
      onChange={onChange}
      value={value}
      className={clsx(
        className,
        "h-10 rounded-full border border-yellow-500 bg-yellow-700 p-3 text-white placeholder:text-white outline-white focus:outline",
      )}
      placeholder="Search for an Item..."
    />
  )
}