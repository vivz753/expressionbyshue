import { ArtWork } from "@schemas/global"

export function scrollToElement(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}

export const filterBySearch = (products: ArtWork[], input: string) => {
  if (!input) return products

  const filteredProducts = products.filter((product) => {
    return (
      product.title
        .toLowerCase()
        .trim()
        .split(" ")
        .findIndex((token) => token.startsWith(input.toLowerCase()) || input.toLowerCase().includes(token)) !== -1 || // second condition for inputs w 1 token + a space
      product.title.toLowerCase().includes(input.toLowerCase()) || // for inputs w/ multiple tokens + spaces
      (product.tags &&
        product.tags?.findIndex(
          (tag) => tag.toLowerCase().startsWith(input.toLowerCase()) || input.toLowerCase().includes(tag),
        ) !== -1)
      // input.toLowerCase().includes(product.artist.toLowerCase()) ||
      // product.artist.toLowerCase().startsWith(input.toLowerCase()) ||
      // input.toLowerCase().includes(product.category?.toLowerCase() || "") ||
      // product.category?.toLowerCase().startsWith(input.toLowerCase())
    )
  })

  console.log("filterByName", filteredProducts)

  return filteredProducts
}

// export const filterByDimension = (products: ArtWork[], input: { title: string; value: string }) => {
//   if (input.value === "all") return products

//   return products.filter((product) => product.dimensions.toLowerCase() === input.value.toLowerCase())
// }

export const filterByDominantColor = (products: ArtWork[], input: { title: string; value: string }) => {
  if (input.value === "all") return products
  return products.filter((product) => product.dominantColor?.toLowerCase() === input.value.toLowerCase())
}

export const filterByArtist = (products: ArtWork[], input: { title: string; value: string }) => {
  if (input.value === "all") return products
  return products.filter((product) => product.artist?.toLowerCase() === input.value.toLowerCase())
}

export const sortByPrice = (products: ArtWork[], input: { title: string; value: string }) => {
  if (input.value === "ascending") {
    return products.sort((a, b) => a.price - b.price)
  } else if (input.value === "descending") {
    return products.sort((a, b) => b.price - a.price)
  }
}
