import { business } from '@/config/business'
import { telHref } from '@/lib/contact'

/**
 * JSON-LD loại HairSalon, sinh từ config/business.ts. Trường nào chưa có dữ liệu thì bỏ qua, không bịa.
 * TODO: khi có tên miền, thêm "url" và đổi "image" thành địa chỉ tuyệt đối.
 */
export const buildHairSalonJsonLd = (): Record<string, unknown> => {
  const sameAs = [business.facebook, business.instagram, business.tiktok].filter(
    (link): link is string => Boolean(link),
  )

  return {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    name: business.fullName,
    description: business.description,
    image: '/og-image.jpg',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: business.hours.open,
      closes: business.hours.close,
    },
    ...(business.phone && { telephone: telHref(business.phone).replace('tel:', '') }),
    ...(business.address && {
      address: { '@type': 'PostalAddress', streetAddress: business.address, addressCountry: 'VN' },
    }),
    ...(sameAs.length > 0 && { sameAs }),
  }
}
