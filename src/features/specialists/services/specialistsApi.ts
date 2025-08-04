// import axios from 'axios';
import type { Specialist } from '../../../types';

export const getSpecialists = async (filters: { category?: string; city?: string }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  let data: Specialist[] = [
    {
      id: '1',
      name: 'Anna',
      lastname: 'Shevchenko',
      profession: 'Makeup Artist',
      city: 'Kyiv',
      tags: ['makeup artist', 'hair stylist', 'wedding services'],
      category: 'Weddings & Events',
      image: 'specialist1',
    },
    {
      id: '2',
      name: 'Mykhailo',
      lastname: 'Kovalenko',
      profession: 'Fitness Coach',
      city: 'Lviv',
      tags: ['Fitness Coach', 'Personal Training', 'nutrition'],
      category: 'Health & Wellbeing',
      image: 'specialist2',
    },
    {
      id: '3',
      name: 'Sofia',
      lastname: 'Bondarenko',
      profession: 'Graphic Designer',
      city: 'Odesa',
      tags: ['graphic design', 'ui/ux', 'branding'],
      category: 'Business Services',
      image: 'specialist3',
    },
    {
      id: '4',
      name: 'Oleksandr',
      lastname: 'Melnyk',
      profession: 'Massage Therapist',
      city: 'Kharkiv',
      tags: ['Relaxation', 'Therapeutic', 'Sports Massage'],
      category: 'Health & Wellbeing',
      image: 'specialist4',
    },
    {
      id: '5',
      name: 'Marta',
      lastname: 'Tkachenko',
      profession: 'Event Planner',
      city: 'Dnipro',
      tags: ['tutor', 'math help', 'test prep'],
      category: 'Lessons & Training',
      image: 'specialist5',
    },
    {
      id: '6',
      name: 'Ivan',
      lastname: 'Petryk',
      profession: 'Handyman',
      city: 'Zaporizhzhia',
      tags: ['handyman', 'repairs', 'assembly'],
      category: 'Home & Garden',
      image: 'specialist6',
    },
    {
      id: '7',
      name: 'Nazar',
      lastname: 'Symonenko',
      profession: 'Hair Stylist',
      city: 'Kyiv',
      tags: ['gardening', 'landscaping', 'lawn care'],
      category: 'Home & Garden',
      image: 'specialist7',
    },
    {
      id: '8',
      name: 'Kateryna',
      lastname: 'Lysenko',
      profession: 'Hair Stylist',
      city: 'Kyiv',
      tags: ['event planner', 'decor', 'catering'],
      category: 'Weddings & Events',
      image: 'specialist8',
    },
    {
      id: '9',
      name: 'Maksym',
      lastname: 'Kravchuk',
      profession: 'massage therapist',
      city: 'Kyiv',
      tags: ['massage therapist', 'pain relief', 'relaxation'],
      category: 'Health & Wellbeing',
      image: 'specialist9',
    },
    {
      id: '10',
      name: 'Dmytro',
      lastname: 'Zakharchuk',
      profession: 'Hair Stylist',
      city: 'Kyiv',
      tags: ['makeup artist', 'hair stylist', 'wedding services'],
      category: 'Weddings & Events',
      image: 'specialist10',
    },
    {
      id: '11',
      name: 'Alex',
      lastname: 'Koval',
      profession: 'Hair Stylist',
      city: 'Kyiv',
      tags: ['makeup artist', 'hair stylist', 'wedding services'],
      category: 'Weddings & Events',
      image: 'specialist11',
    },
    {
      id: '12',
      name: 'Alex',
      lastname: 'Marchenko',
      profession: 'Hair Stylist',
      city: 'Kyiv',
      tags: ['makeup artist', 'hair stylist', 'wedding services'],
      category: 'Weddings & Events',
      image: 'specialist1',
    },
    {
      id: '13',
      name: 'Dmytro',
      lastname: 'Bondarenko',
      profession: 'Graphic Designer',
      city: 'Odesa',
      tags: ['graphic design', 'ui/ux', 'branding'],
      category: 'Business Services',
      image: 'specialist10',
    },
    {
      id: '14',
      name: 'Alex',
      lastname: 'Hryshchenko',
      profession: 'Hair Stylist',
      city: 'Kyiv',
      tags: ['Cutting', 'Coloring', 'Styling'],
      category: 'Weddings & Events',
      image: 'specialist11',
    },
  ];

  if (filters.category) {
    data = data.filter((s) => s.category === filters.category);
  }
  if (filters.city) {
    data = data.filter((s) => s.city === filters.city);
  }

  return { data };
};