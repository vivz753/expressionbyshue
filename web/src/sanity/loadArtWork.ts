import { client } from "@sanity/client"
import { artWorkQuery, genreQuery } from "@sanity/artWorkQuery"

const loadArtWork = async () => await client.fetch(artWorkQuery)
const loadGenres = async () => await client.fetch(genreQuery)

export { loadArtWork, loadGenres }
