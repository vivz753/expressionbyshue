import { DownCaretIcon } from "@src/components/icons/CaretIcons"
import useComponentVisible from "@src/hooks/useComponentVisible"
import clsx from "clsx"
import { FC, KeyboardEvent } from "react"

export interface DropdownProps {
  className?: string
  options: string[]
  setOption?: (option: string) => void | Promise<any>
  currentOption: string
  outline?: boolean
  border?: boolean
  caretStyle?: "withCircle" | "default"
}

export const Dropdown: FC<React.PropsWithChildren<DropdownProps>> = ({
  className,
  options,
  setOption,
  currentOption,
  outline = true,
  border = true,
  caretStyle = "default",
}) => {
  const [ref, showOptions, setShowOptions] = useComponentVisible(false)

  const handleOptionSelection = (option: string): void => {
    if (option !== currentOption && setOption) setOption(option)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>): void => {
    if (e.key === " " || e.key === "Enter") {
      // Prevents accidental collapsing when toggling buttons within the component
      if (e.target === e.currentTarget) {
        e.preventDefault()
        toggleOptions()
      }
    }
  }

  const toggleOptions = (): void => setShowOptions((show) => !show)

  return (
    <button
      ref={ref}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="button"
      onClick={toggleOptions}
      className={clsx(
        "relative flex h-full min-w-fit items-center rounded-md bg-yellow-700 px-3",
        border && "border border-yellow-500",
        outline && "focus:outline focus:outline-white",
      )}
    >
      <div className={clsx(className, "flex flex-row items-center gap-2")}>
        <span className="font-medium text-white select-none">{currentOption}</span>
        {caretStyle === "withCircle" ? (
          <span className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white">
            <DownCaretIcon className={clsx(showOptions && "rotate-180", "h-2 w-2 fill-white")} />
          </span>
        ) : (
          <DownCaretIcon className={clsx(showOptions && "rotate-180", "ml-auto h-4 w-4 fill-white")} />
        )}
      </div>
      {showOptions && (
        <div
          className={clsx(
            "absolute bottom-[-4px] left-0 z-[1] w-full min-w-min translate-y-full flex-col gap-5 rounded-t-md rounded-b-md bg-yellow-700",
          )}
        >
          {options.map((option, i) => (
            <button
              className="group w-full cursor-pointer p-1 text-white select-none"
              key={i}
              onClick={() => handleOptionSelection(option)}
            >
              <span className="flex rounded-sm p-1 hover:bg-yellow-600">{option}</span>
            </button>
          ))}
        </div>
      )}
    </button>
  )
}
