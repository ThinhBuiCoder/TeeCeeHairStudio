/**
 * Tra cứu ảnh đã xử lý bởi `npm run images` (src/assets/images/<tên>-<rộng>.<avif|webp>).
 * Thêm ảnh mới: chạy script ảnh, rồi khai báo kích thước gốc ở IMAGE_DIMENSIONS.
 */
const urls = import.meta.glob<string>('../assets/images/*.{avif,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

/** [rộng, cao] của bản lớn nhất, dùng cho thuộc tính width/height (chống nhảy bố cục). */
const IMAGE_DIMENSIONS = {
  'hero-interior': [1382, 777],
  'about-mirror': [540, 675],
  'gallery-lounge': [460, 560],
  'gallery-chairs': [600, 400],
  'gallery-entrance': [480, 600],
  'gallery-station': [520, 390],
  facade: [1536, 1024],
} as const

export type ImageName = keyof typeof IMAGE_DIMENSIONS

export interface ImageSet {
  avifSrcSet: string
  webpSrcSet: string
  /** Bản webp lớn nhất, dùng làm src dự phòng. */
  src: string
  width: number
  height: number
}

const FILE_PATTERN = /\/([a-z-]+)-(\d+)\.(avif|webp)$/

const index = new Map<string, { avif: [number, string][]; webp: [number, string][] }>()
for (const [path, url] of Object.entries(urls)) {
  const match = FILE_PATTERN.exec(path)
  if (!match) continue
  const [, name = '', width = '0', ext = ''] = match
  const entry = index.get(name) ?? { avif: [], webp: [] }
  entry[ext as 'avif' | 'webp'].push([Number(width), url])
  index.set(name, entry)
}

const toSrcSet = (items: [number, string][]): string =>
  [...items]
    .sort((a, b) => a[0] - b[0])
    .map(([w, url]) => `${url} ${w}w`)
    .join(', ')

export const getImage = (name: ImageName): ImageSet => {
  const entry = index.get(name)
  const [width, height] = IMAGE_DIMENSIONS[name]
  const largest = entry ? [...entry.webp].sort((a, b) => b[0] - a[0])[0] : undefined
  return {
    avifSrcSet: entry ? toSrcSet(entry.avif) : '',
    webpSrcSet: entry ? toSrcSet(entry.webp) : '',
    src: largest?.[1] ?? '',
    width,
    height,
  }
}

export const isImageName = (name: string): name is ImageName => name in IMAGE_DIMENSIONS
