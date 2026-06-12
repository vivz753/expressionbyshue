import groq from "groq"

export const artWorkQuery = groq`
*[_type=="artWork"]{
    title,
    "imageUrl": image.asset->url,
    artist,
    hidden,
    description,
    width,
    height,
    availability,
    featured,
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
