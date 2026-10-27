// Chạy một lần khi đổi ảnh gốc: npm run images
// Đọc ảnh trong src/assets/reference, cắt bỏ phần chữ lỗi của ảnh dựng AI,
// rồi xuất AVIF/WebP nhiều kích thước vào src/assets/images và favicon/OG vào public.
// TODO: khi có ảnh chụp thật của tiệm, thay ảnh gốc và chỉnh lại các vùng cắt bên dưới.
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ref = path.join(root, 'src/assets/reference')
const out = path.join(root, 'src/assets/images')
const pub = path.join(root, 'public')

const SRC = {
  logo: path.join(ref, '854844698_122202012758875660_2266670564615262881_n.jpg'),
  interior: path.join(ref, '860112956_122202009434875660_9049718989628036353_n.jpg'),
  facade: path.join(ref, '659902172_122171833808875660_154783017061330228_n.jpg'),
}

const WIDTHS = [640, 1024, 1600]

// Vùng cắt (toạ độ trên ảnh gốc). Ảnh nội thất có chữ Hàn ở x<260, y 160–260 nên mọi khung đều tránh vùng này.
const crops = [
  {
    name: 'hero-interior',
    src: 'interior',
    region: { left: 290, top: 60, width: 1382, height: 777 },
  },
  {
    name: 'about-mirror',
    src: 'interior',
    region: { left: 1130, top: 250, width: 540, height: 675 },
  },
  {
    name: 'gallery-lounge',
    src: 'interior',
    region: { left: 480, top: 380, width: 460, height: 560 },
  },
  {
    name: 'gallery-chairs',
    src: 'interior',
    region: { left: 1000, top: 470, width: 600, height: 400 },
  },
  {
    name: 'gallery-entrance',
    src: 'interior',
    region: { left: 440, top: 240, width: 480, height: 600 },
  },
  {
    name: 'gallery-station',
    src: 'interior',
    region: { left: 100, top: 500, width: 520, height: 390 },
  },
]

// Biển phụ "TER KEE" bị méo trên ảnh mặt tiền (x≈180–300, y≈495–575): phủ bằng dải tường tối lấy ngay bên cạnh.
const FACADE_PATCH = { left: 170, top: 485, width: 150, height: 110 }
const FACADE_DONOR = { left: 20, top: 485, width: 60, height: 110 }

const encode = async (input, name, widths = WIDTHS) => {
  // Hiện thực hoá ảnh đã cắt trước để lấy đúng chiều rộng thật.
  const buf = await input.toBuffer()
  const pipeline = sharp(buf)
  const { width: srcW } = await pipeline.metadata()
  const sizes = widths.filter((w) => w <= srcW)
  if (sizes.length === 0 || sizes[sizes.length - 1] < srcW) sizes.push(srcW)
  for (const w of sizes) {
    const base = pipeline.clone().resize({ width: w, withoutEnlargement: true })
    await base
      .clone()
      .avif({ quality: 55, effort: 6 })
      .toFile(path.join(out, `${name}-${w}.avif`))
    await base
      .clone()
      .webp({ quality: 78 })
      .toFile(path.join(out, `${name}-${w}.webp`))
  }
  return sizes
}

const main = async () => {
  await mkdir(out, { recursive: true })
  await mkdir(pub, { recursive: true })

  for (const c of crops) {
    const sizes = await encode(sharp(SRC[c.src]).extract(c.region), c.name)
    console.log(c.name, sizes.join('/'))
  }

  // Mặt tiền: che biển lỗi rồi xuất.
  const donor = await sharp(SRC.facade)
    .extract(FACADE_DONOR)
    .resize(FACADE_PATCH.width, FACADE_PATCH.height, { fit: 'fill' })
    .blur(6)
    .toBuffer()
  const facade = await sharp(SRC.facade)
    .composite([{ input: donor, left: FACADE_PATCH.left, top: FACADE_PATCH.top }])
    .toBuffer()
  console.log('facade', (await encode(sharp(facade), 'facade')).join('/'))

  // Monogram TC + vương miện, cắt vuông từ logo (nền đen, dùng trên khối tối).
  const mark = sharp(SRC.logo).extract({ left: 110, top: 20, width: 320, height: 320 })
  await mark.clone().webp({ quality: 90 }).toFile(path.join(out, 'monogram.webp'))
  for (const s of [32, 180, 512]) {
    await mark
      .clone()
      .resize(s, s, { kernel: 'lanczos3' })
      .png()
      .toFile(path.join(pub, s === 180 ? 'apple-touch-icon.png' : `favicon-${s}.png`))
  }

  // Ảnh chia sẻ Open Graph 1200x630 (JPG vì nhiều nền tảng chưa đọc được AVIF/WebP).
  await sharp(SRC.interior)
    .extract({ left: 290, top: 120, width: 1382, height: 726 })
    .resize(1200, 630)
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(pub, 'og-image.jpg'))

  console.log('Xong.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
