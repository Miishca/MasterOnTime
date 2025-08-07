import type { SearchFilters, Specialist } from '../../../types';

export const getSpecialists = async (filters: SearchFilters) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  let data: Specialist[] = [
    {
      id: '1',
      name: 'Anna',
      lastname: 'Shevchenko',
      profession: 'Makeup Artist',
      city: 'Kyiv',
      tags: ['event photography', 'makeup styling', 'event planning'],
      category: 'Weddings & Events',
      image: 'specialist1',
      experience: 5,
      rating: 5,
    },
    {
      id: '2',
      name: 'Mykhailo',
      lastname: 'Kovalenko',
      profession: 'Fitness Coach',
      city: 'Lviv',
      tags: ['personal training', 'nutrition consulting', 'emotional wellness'],
      category: 'Health & Wellbeing',
      image: 'specialist2',
      experience: 3,
      rating: 4.0,
    },
    {
      id: '3',
      name: 'Sofia',
      lastname: 'Bondarenko',
      profession: 'Graphic Designer',
      city: 'Odesa',
      tags: ['business consulting', 'it support', 'legal assistance'],
      category: 'Business Services',
      image: 'specialist3',
      experience: 7,
      rating: 4.8,
    },
    {
      id: '4',
      name: 'Oleksandr',
      lastname: 'Melnyk',
      profession: 'Massage Therapist',
      city: 'Kharkiv',
      tags: ['massage therapy', 'emotional wellness', 'nutrition consulting'],
      category: 'Health & Wellbeing',
      image: 'specialist4',
      experience: 4,
      rating: 4.2,
    },
    {
      id: '5',
      name: 'Marta',
      lastname: 'Tkachenko',
      profession: 'Math Tutor',
      city: 'Dnipro',
      tags: ['school tutoring', 'language lessons', 'music classes'],
      category: 'Lessons & Training',
      image: 'specialist5',
      experience: 2,
      rating: 3.8,
    },
    {
      id: '6',
      name: 'Ivan',
      lastname: 'Petryk',
      profession: 'Handyman',
      city: 'Zaporizhzhia',
      tags: ['handyman services', 'furniture assembly', 'house cleaning'],
      category: 'Home & Garden',
      image: 'specialist6',
      experience: 6,
      rating: 4.3,
    },
    {
      id: '7',
      name: 'Nazar',
      lastname: 'Symonenko',
      profession: 'Gardener',
      city: 'Kyiv',
      tags: ['gardening', 'house cleaning', 'handyman services'],
      category: 'Home & Garden',
      image: 'specialist7',
      experience: 8,
      rating: 4.7,
    },
    {
      id: '8',
      name: 'Kateryna',
      lastname: 'Lysenko',
      profession: 'Event Planner',
      city: 'Kyiv',
      tags: ['event planning', 'catering services', 'makeup styling'],
      category: 'Weddings & Events',
      image: 'specialist8',
      experience: 3,
      rating: 4.1,
    },
    {
      id: '9',
      name: 'Maksym',
      lastname: 'Kravchuk',
      profession: 'Massage Therapist',
      city: 'Kyiv',
      tags: ['massage therapy', 'emotional wellness', 'personal training'],
      category: 'Health & Wellbeing',
      image: 'specialist9',
      experience: 5,
      rating: 4.6,
    },
    {
      id: '10',
      name: 'Dmytro',
      lastname: 'Zakharchuk',
      profession: 'Hair Stylist',
      city: 'Kyiv',
      tags: ['makeup styling', 'event planning', 'catering services'],
      category: 'Weddings & Events',
      image: 'specialist10',
      experience: 4,
      rating: 4.0,
    },
    {
      id: '11',
      name: 'Alex',
      lastname: 'Koval',
      profession: 'Hair Stylist',
      city: 'Kyiv',
      tags: ['makeup styling', 'event photography', 'event planning'],
      category: 'Weddings & Events',
      image: 'specialist11',
      experience: 2,
      rating: 3.5,
    },
    {
      id: '12',
      name: 'Alex',
      lastname: 'Marchenko',
      profession: 'Hair Stylist',
      city: 'Kyiv',
      tags: ['makeup styling', 'event photography', 'event planning'],
      category: 'Weddings & Events',
      image: 'specialist1',
      experience: 1,
      rating: 2.5,
    },
    {
      id: '13',
      name: 'Dmytro',
      lastname: 'Bondarenko',
      profession: 'Graphic Designer',
      city: 'Odesa',
      tags: ['business consulting', 'accounting help', 'it support'],
      category: 'Business Services',
      image: 'specialist10',
      experience: 5,
      rating: 4.5,
    },
    {
      id: '14',
      name: 'Alex',
      lastname: 'Hryshchenko',
      profession: 'Hair Stylist',
      city: 'Kyiv',
      tags: ['makeup styling', 'event planning', 'event photography'],
      category: 'Weddings & Events',
      image: 'specialist11',
      experience: 4,
      rating: 2.5,
    },
  ];

  if (filters.category) {
    data = data.filter((s) => s.category === filters.category);
  }
  if (filters.name) {
    const nameLower = filters.name.toLowerCase();
    data = data.filter(
      (s) =>
        s.name.toLowerCase().includes(nameLower) ||
        s.lastname.toLowerCase().includes(nameLower)
    );
  }
  if (filters.city) {
    const cityFilter = filters.city.trim().toLowerCase();
    data = data.filter((s) => s.city.trim().toLowerCase().includes(cityFilter));
  }
  if (filters.experience) {
    const exp = parseInt(filters.experience, 10);
    if (!isNaN(exp)) {
      data = data.filter((s) => s.experience >= exp);
    }
  }
  if (filters.rating) {
    const rating = parseFloat(filters.rating);
    if (!isNaN(rating)) {
      data = data.filter((s) => s.rating >= rating);
    }
  }
  if (filters.tags) {
    const tagLower = filters.tags.toLowerCase();
    data = data.filter((s) =>
      s.tags.some((tag) => tag.toLowerCase().includes(tagLower))
    );
  }

  return { data };
};
