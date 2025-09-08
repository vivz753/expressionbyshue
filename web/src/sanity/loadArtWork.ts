import { client } from "@sanity/client"
import { artWorkQuery } from "@sanity/artWorkQuery"

const loadArtWork = async () => await client.fetch(artWorkQuery)

export { loadArtWork }