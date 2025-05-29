// types/twin.d.ts
import "twin.macro"
import { css as cssImport } from "@emotion/react"
import { CSSInterpolation } from "@emotion/serialize"
import styledImport from "@emotion/styled"

declare module "twin.macro" {
  // The styled and css imports
  const styled: typeof styledImport
  const css: typeof cssImport
}

declare module "react" {
  // The css prop
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSInterpolation
    // tw?: string
  }
  // The inline svg css prop
  interface SVGProps<T> extends SVGProps<SVGSVGElement> {
    css?: CSSInterpolation
    // tw?: string
  }
}

import "twin.macro"
import styledComponent, { CSSProp, css as cssProperty } from "styled-components"

// For the css and styled imports
declare module "twin.macro" {
  const css: typeof cssProperty
  const styled: typeof styledComponent
}

// For the css prop
declare module "react" {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSProp
  }
}

// For styling on svg elements
interface SVGProps<T> extends SVGAttributes<T> {
  css?: CSSProp
}
