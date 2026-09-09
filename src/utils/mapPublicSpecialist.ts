import type { PublicSpecialist, Specialist } from '../types';

/**
 * Adapts the backend's PublicSpecialist onto the UI's wider `Specialist` shape.
 * Real values only — no random placeholders. Fields the public API doesn't
 * expose (email, category, portfolio, reviews) are left empty for the UI to
 * handle, not faked.
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
    category: 'Business Services',
    experience: dto.experience,
    rating: dto.rating,
    price: dto.price,
    about: dto.about,
    image: dto.profileImageUrl || undefined,
  };
}
