export const SITE = {
  name: 'Mirabueno',
  legalName: 'Restaurante Mirabueno',
  siteUrl: 'https://restaurante-mirabueno.es',
  defaultTitle: 'Restaurante Mirabueno | Cocina mediterránea premium en Madrid',
  defaultDescription:
    'Restaurante Mirabueno, cocina mediterránea premium en Madrid. Disfruta de una experiencia elegante, carta selecta y reservas rápidas por WhatsApp.',
  phone: '+34 600 123 456',
  address: {
    streetAddress: 'Calle Mayor 123',
    postalCode: '28013',
    locality: 'Madrid',
    country: 'España',
    countryCode: 'ES'
  },
  whatsappMessage: 'Hola, quiero hacer una reserva',
  menuUrl: 'https://mybakarta.com/Restaurante-mirabueno1',
  mapEmbedUrl:
    'https://www.google.com/maps?q=Calle+Mayor+123,+28013+Madrid,+Espa%C3%B1a&output=embed',
  ogImage:
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
  hours: [
    { label: 'Lunes - Jueves', value: '13:30 - 16:00 · 20:30 - 23:30' },
    { label: 'Viernes - Sábado', value: '13:30 - 16:30 · 20:30 - 00:00' },
    { label: 'Domingo', value: '13:30 - 16:30' }
  ]
};

export const formattedAddress = `${SITE.address.streetAddress}, ${SITE.address.postalCode} ${SITE.address.locality}, ${SITE.address.country}`;
export const phoneUrl = SITE.phone.replace(/\D+/g, '');
export const whatsappUrl = `https://wa.me/${phoneUrl}?text=${encodeURIComponent(SITE.whatsappMessage)}`;

export const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/carta', label: 'Carta' },
  { href: '/reservas', label: 'Reservas' },
  { href: '/contacto', label: 'Contacto' }
];
