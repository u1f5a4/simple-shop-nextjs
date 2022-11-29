import fs from 'fs'
import { readFile } from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { getPlaiceholder } from 'plaiceholder'

import { Painting, PaintingImage, MatterData } from 'lib/paintings.type'

const paintingsDirectory = path.join(process.cwd(), 'paintings')
const paintingsImageDirectory = path.join(process.cwd(), 'public', 'paintings')

export type GetPaintingsData = (Omit<Painting, 'contentHtml'> & PaintingImage)[]
export async function getPaintingsData(): Promise<GetPaintingsData> {
  // Get file names under /posts
  const fileNames = fs.readdirSync(paintingsDirectory)
  return Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '')

      const fullPath = path.join(paintingsDirectory, fileName)

      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      const image = await getImageData(matterResult.data.image)

      return {
        id,
        ...(matterResult.data as MatterData),
        image,
      }
    })
  )
}

export function getAllPaintingPaths() {
  const fileNames = fs.readdirSync(paintingsDirectory)
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export type GetPaintingData = Painting & PaintingImage
export async function getPaintingData(id): Promise<GetPaintingData> {
  const fullPath = path.join(paintingsDirectory, `${id}.md`)

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  const image = await getImageData(matterResult.data.image)

  return {
    id,
    contentHtml,
    ...(matterResult.data as MatterData),
    image,
  }
}

async function getImageData(
  imageMD: MatterData['image']
): Promise<PaintingImage['image']> {
  const imagePath = path.join(paintingsImageDirectory, imageMD)
  const imageFile = await readFile(imagePath)
  const { base64, img } = await getPlaiceholder(imageFile, { size: 10 })
  return { ...img, src: `/paintings/${imageMD}`, base64 }
}
