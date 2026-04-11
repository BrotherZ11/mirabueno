export const SITE = {
  name: 'Venta Mirabueno',
  legalName: 'Restaurante Venta Mirabueno',
  siteUrl: 'https://ventamirabueno.com',
  defaultTitle: 'Restaurante Venta Mirabueno | Cocina mediterránea premium en Setenil de las Bodegas',
  defaultDescription:
    'Restaurante Venta Mirabueno, cocina mediterránea premium en Setenil de las Bodegas. Disfruta de una experiencia elegante, carta selecta y reservas rápidas por WhatsApp.',
  phone: '+34 673 66 17 13',
  address: {
    streetAddress: 'C. Reyes Catolicos, 47, 11692 Setenil de las Bodegas, Cádiz',
    postalCode: '11692',
    locality: 'Setenil de las Bodegas',
    country: 'España',
    countryCode: 'ES'
  },
  whatsappMessage: 'Hola, quiero hacer una reserva',
  menuUrl: 'https://mybakarta.com/Restaurante-mirabueno1',
  mapEmbedUrl:
    'https://www.google.com/maps?q=C.+Reyes+Catolicos,+47,+11692+Setenil+de+las+Bodegas,+Cádiz,+España&output=embed',
  ogImage:
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
hours: [
  { label: 'Lunes', value: '9:00 - 17:00' },
  { label: 'Martes', value: 'Cerrado' },
  { label: 'Miércoles - Jueves', value: '9:00 - 17:00' },
  { label: 'Viernes', value: '9:00 - 17:00 · 20:00 - Cierre' },
  { label: 'Sábado', value: '11:00 - 17:00 · 20:00 - Cierre' },
  { label: 'Domingo', value: '11:00 - 17:00' }
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
