import { ReactNode } from "react"

export enum Medium {
  // TRADITIONAL
  OIL = "oil",
  PASTEL = "pastel",
  GOUACHE = "gouache",
  CHARCOAL = "charcoal",
  PENCIL = "pencil",
  MARKER = "marker",
  ACRYLIC = "acrylic",
  // DIGITAL
  TWOD = "2d",
  THREED = "3d",
}

export interface Art {
  url: string
  medium: Medium
  title: string
  content?: ReactNode
}
