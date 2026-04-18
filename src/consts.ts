import { siteConfig } from '../site.config.mjs';

export const SITE = {
  name: 'Mirabueno',
  legalName: 'Mirabueno Casa de Comidas',
  siteUrl: siteConfig.siteUrl,
  defaultTitle: 'Mirabueno | Casa de Comidas',
  defaultDescription:
    'Mirabueno Casa de Comidas, Sabor, Tiempo y Respeto. Disfruta de una experiencia elegante, carta selecta y reservas rápidas por WhatsApp.',
  phone: '+34 673 66 17 13',
  address: {
    streetAddress: 'C. Reyes Catolicos, 47',
    postalCode: '11692',
    locality: 'Setenil de las Bodegas',
    region: 'Cadiz',
    country: 'España',
    countryCode: 'ES'
  },
  whatsappMessage: 'Hola, quiero hacer una reserva',
  menuUrl: 'https://mybakarta.com/Restaurante-mirabueno1',
  mapEmbedUrl:
    'https://www.google.com/maps?q=C.+Reyes+Catolicos,+47,+11692+Setenil+de+las+Bodegas,+Cádiz,+España&output=embed',
  ogImage:
    'https://www.guiarepsol.com/content/dam/repsol-guia/guia-cf/restaurante/imagenes/media-filer_public-56-9e-569eeefb-65be-4398-a3f4-9d3cef43e9a0-20060-venta-mirabueno-f2f860d1a7524f11b4850bf4d538735c.jpeg',
  legal: {
    ownerName: siteConfig.legal.ownerName,
    taxId: siteConfig.legal.taxId,
    contactEmail: siteConfig.legal.contactEmail,
    rightsEmail: siteConfig.legal.rightsEmail,
    hostingProvider: 'Vercel, Inc.',
    hostingWebsite: 'https://vercel.com',
    lastUpdated: '18 de abril de 2026'
  },
  hours: [
    { label: 'Lunes', value: '9:00 - 17:00' },
    { label: 'Martes', value: 'Cerrado' },
    { label: 'Miércoles - Jueves', value: '9:00 - 17:00' },
    { label: 'Viernes', value: '9:00 - 17:00 · 20:00 - Cierre' },
    { label: 'Sábado', value: '11:00 - 17:00 · 20:00 - Cierre' },
    { label: 'Domingo', value: '11:00 - 17:00' }
  ]
};

export const formattedAddress = `${SITE.address.streetAddress}, ${SITE.address.postalCode} ${SITE.address.locality}, ${SITE.address.region}, ${SITE.address.country}`;
export const phoneUrl = SITE.phone.replace(/\D+/g, '');
export const whatsappUrl = `https://wa.me/${phoneUrl}?text=${encodeURIComponent(SITE.whatsappMessage)}`;

export const socialLinks = [
  {
    href: 'https://www.instagram.com/restaurante_mirabueno/',
    label: 'Instagram',
    ariaLabel: 'Visitar el perfil de Instagram de Mirabueno Casa de Comidas'
  },
  {
    href: 'https://www.facebook.com/p/Restaurante-Venta-Mirabueno-100063625866546/',
    label: 'Facebook',
    ariaLabel: 'Visitar la pagina de Facebook de Mirabueno Casa de Comidas'
  }
];

export const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/carta', label: 'Carta' },
  { href: '/reservas', label: 'Reservas' },
  { href: '/contacto', label: 'Contacto' }
];

export const legalLinks = [
  { href: '/aviso-legal', label: 'Aviso legal' },
  { href: '/politica-de-privacidad', label: 'Privacidad' },
  { href: '/politica-de-cookies', label: 'Cookies' },
  { href: '/accesibilidad', label: 'Accesibilidad' }
];

export const publicSitePaths = [
  '/',
  ...navLinks.map((link) => link.href),
  ...legalLinks.map((link) => link.href)
].filter((path, index, paths) => paths.indexOf(path) === index);
