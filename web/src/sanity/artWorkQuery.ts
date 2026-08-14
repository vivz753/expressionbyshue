import groq from "groq"

export const artWorkQuery = groq`
*[_type=="artWork"]{
    title,
    "imageUrl": image.asset->url,
    artist,
    hidden,
    description,
    "width": width_in_inches,
    "height": height_in_inches,
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

export const genreQuery = groq`
*[_type == 'artWork'].genre`
