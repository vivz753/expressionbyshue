import groq from "groq"

export const artWorkQuery = groq`
*[_type=="artWork"]{
    title,
    "imageUrl": image.asset->url,
    hidden,
    dimensions,
    availability,
    price,
    framed,
    medium,
    support,
    genre,
    style,
    orientation,
    dominantColor,
    date,
    tags,
    "id": _id,
  }`
