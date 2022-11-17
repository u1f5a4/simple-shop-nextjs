import fs from 'fs'
import { readFile } from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { getPlaiceholder } from 'plaiceholder'

type MatterData = {
  artist: string
  name: string
  year: string
  image: string
}

const paintingsDirectory = path.join(process.cwd(), 'paintings')

export async function getPaintingsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(paintingsDirectory)
  const allPaintingsData = Promise.all(
    fileNames.map(async (fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '')

      // Read markdown file as string
      const fullPath = path.join(paintingsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents)

      // image
      const imageMD = matterResult.data.image
      const imagePath = path.join(process.cwd(), 'public', 'paintings', imageMD)
      const imageFile = await readFile(imagePath)
      const { base64, img } = await getPlaiceholder(imageFile, { size: 10 })
      const image = { ...img, src: `/paintings/${imageMD}`, base64 }

      // Combine the data with the id
      return {
        id,
        ...(matterResult.data as MatterData),
        image,
      }
    })
  )

  return allPaintingsData
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

export async function getPaintingData(id) {
  const fullPath = path.join(paintingsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // image
  const imageMD = matterResult.data.image
  const imagePath = path.join(process.cwd(), 'public', 'paintings', imageMD)
  const imageFile = await readFile(imagePath)
  const { base64, img } = await getPlaiceholder(imageFile, { size: 10 })
  const image = { ...img, src: `/paintings/${imageMD}`, base64 }

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...(matterResult.data as MatterData),
    image,
  }
}
