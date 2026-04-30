import { Dropdown, Option, priceOptions, dominantColorOptions } from "@src/components/core/Dropdown"
import { Searchbar } from "@src/components/core/Searchbar"

export interface SearchFilterBarProps {
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
  dominantColor?: Option
  setDominantColor?: React.Dispatch<React.SetStateAction<Option>>
  price?: Option
  setPrice?: React.Dispatch<React.SetStateAction<Option>>
}

export const SearchFilterBar: React.FC<React.PropsWithChildren<SearchFilterBarProps>> = ({
  searchValue,
  setSearchValue,
  dominantColor,
  setDominantColor,
  price,
  setPrice,
}) => {
  return (
    <div className="group sticky top-0 z-20 flex w-full justify-center bg-yellow-600">
      <div className="bg-p2 z-[1] flex w-full flex-col items-center justify-center gap-2 rounded-md p-4 py-5 text-white lg:flex-row lg:gap-10 lg:px-14">
        <div className="flex w-full flex-col items-start gap-1">
          <span>Item Name</span>
          <Searchbar className="flex w-full" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        </div>
        <div className="flex w-full flex-row justify-between lg:w-auto lg:gap-5">
          {/* <div className="flex flex-col items-start gap-1">
							<span className="whitespace-nowrap">Dimensions (in.)</span>
							<Dropdown
								setOption={(dimension) => setDimension(dimension)}
								options={dimensions}
								currentOption={dimension}
							/>
						</div> */}
          {dominantColor && setDominantColor && (
            <div className="flex flex-col items-start gap-1">
              <span className="whitespace-nowrap">Dominant Color</span>
              <Dropdown
                setOption={(dominantColor) => setDominantColor(dominantColor)}
                options={dominantColorOptions}
                currentOption={dominantColor}
              />
            </div>
          )}
          {price && setPrice && (
            <div className="flex flex-col items-start gap-1">
              <span>Price</span>
              <Dropdown setOption={(price) => setPrice(price)} options={priceOptions} currentOption={price} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
