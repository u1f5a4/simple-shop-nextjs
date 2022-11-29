export type MatterData = {
  artist: string
  name: string
  year: string
  image: string
}

export type Painting = {
  artist: string
  name: string
  year: string
  id: string
  contentHtml: string
}

export type PaintingImage = {
  image: {
    src: string
    base64: string
    height: number
    width: number
    type?: string
  }
}
