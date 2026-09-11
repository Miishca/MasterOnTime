import { INDUSTRY_LABELS, type PublicSpecialist, type Specialist } from '../types';

/**
 * Adapts the backend's PublicSpecialist onto the UI's wider `Specialist` shape.
 * Real values only — no random placeholders. Fields the public API doesn't
 * expose (email, portfolio, reviews) are left empty for the UI to handle, not
 * faked. `category` used to be hard-coded to 'Business Services' for every
 * specialist — now it's the real industry the specialist picked, or undefined
 * if they haven't picked one yet.
 */
export function mapPublicSpecialist(dto: PublicSpecialist): Specialist {
  return {
    id: dto.id.toString(),
    firstName: dto.firstName,
    lastName: dto.lastName,
    email: '',
    profession: dto.profession || 'Specialist',
    city: dto.city || '',
    tags: dto.tags,
    issues: [],
    category: dto.industry ? INDUSTRY_LABELS[dto.industry] : undefined,
    experience: dto.experience,
    rating: dto.rating,
    price: dto.price,
    about: dto.about,
    image: dto.profileImageUrl || undefined,
  };
}
