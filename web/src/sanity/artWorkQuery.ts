import groq from "groq"

export const artWorkQuery = groq`
*[_type=="artWork"]{
    title,
    price,
    dimensions,
    availability,
    framed,
    medium,
    genre,
    "id": _id,
    "imageUrl": image.asset->url,
    tags
  }`
