import type { Specialist, UserProfile } from '../types';

export function mapUserToSpecialist(user: UserProfile): Specialist {
  return {
    id: user.id.toString(),
    firstName: user.firstName || 'Unknown',
    lastName: user.lastName || '',
    email: user.email,
    profession: 'General Specialist',
    city: user.address?.city || 'Kyiv',
    tags: ['service', 'help'],
    issues: ['experience needed'],
    category: 'Business Services',
    experience: Math.floor(Math.random() * 10),
    rating: Math.floor(Math.random() * 5) + 1,
    price: '$50',
    about: 'Specialist profile description placeholder',
    image: user.profileImageUrl || 'specialist-1',
    phone: user.phoneNumber || '+380000000000',
  };
}
