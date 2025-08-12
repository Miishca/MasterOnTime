import type { SearchFilters, Specialist } from '../../../types';
import imageMap from '../../../utils/imageLoader';

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
      issues: [
        'Confidence Boost',
        'Event Readiness',
        'Style Clarity',
        'Skin Harmony',
        'Camera Confidence',
      ],
      category: 'Weddings & Events',
      image: 'specialist1',
      experience: 5,
      rating: 4.9,
      price: '$80-$100',
      phone: '+380671234567',
      about: `Anna is a certified makeup artist with a deep understanding of beauty techniques and image psychology. Her goal is to help clients feel confident by highlighting their individuality through carefully crafted looks.`,
      workHistory: [
        {
          id: 'w1',
          image: imageMap['specialist1-work-history1'],
          title: 'Bridal Makeup for Destination Wedding in Tuscany',
          description:
            'Elena worked with an international couple planning their dream wedding in Italy. She created a natural and elegant bridal look that lasted through the ceremony, photo shoot, and evening celebration.',
        },
        {
          id: 'w2',
          image: imageMap['specialist1-work-history2'],
          title: 'Makeup for Fashion Campaign – Modern Streetwear Brand',
          description:
            'Collaborated with a local streetwear brand to create bold and expressive looks for their seasonal campaign. Elena focused on edgy eyes and clean skin tones to match the brand’s aesthetic.',
        },
        {
          id: 'w3',
          image: imageMap['specialist1-work-history3'],
          title: 'Photoshoot Makeup for Personal Branding',
          description:
            'Provided camera-ready makeup for a series of personal branding portraits. The goal was to emphasize professionalism and authenticity without overdoing it.',
        },
      ],
      services: [
        {
          id: 's1',
          title: 'Book a Makeup Session',
          description:
            'Get a professional makeup session for weddings, photoshoots, or events.',
        },
        {
          id: 's2',
          title: 'Request a styled look for your event or shoot',
          description:
            'Discuss your style goals and receive tailored fashion advice.',
        },
        {
          id: 's3',
          title: 'Schedule a personal online consultation',
          description:
            'Complete bridal makeup and styling package for your special day.',
        },
        {
          id: 's4',
          title: 'Enroll in her makeup basics mini-course',
          description:
            'Complete bridal makeup and styling package for your special day.',
        },
      ],
      availability: [
        { date: '2024-07-28', isAvailable: true },
        { date: '2024-07-30', isAvailable: true },
      ],
      reviews: [
        {
          id: 'r1',
          userName: 'Olga',
          comment: 'Fantastic work!',
          rating: 5,
        },
      ],
      testimonials: [
        {
          text: 'Elena is a magician. I didn’t just look beautiful — I felt confident every minute of my wedding. Everything looked natural and classy.',
          name: 'Maria',
          role: 'Bride',
          image: '/src/assets/testimonials1.png',
        },
        {
          text: 'Working with Elena is easy and efficient. She instantly understands the creative vision and always makes clients feel comfortable on set.',
          name: 'Inna',
          role: 'Photographer',
          image: '/src/assets/testimonials2.png',
        },
        {
          text: 'I booked a consultation to improve my skincare and presentation for meetings — and it turned into a complete transformation. I’m truly grateful!',
          name: 'Daria',
          role: 'Marketing Manager',
          image: '/src/assets/testimonials3.png',
        },
      ],
    },
    {
      id: '2',
      name: 'Mykhailo',
      lastname: 'Kovalenko',
      profession: 'Fitness Coach',
      city: 'Lviv',
      tags: ['personal training', 'nutrition consulting', 'emotional wellness'],
      issues: [
        'Weight Loss',
        'Muscle Gain',
        'Posture Improvement',
        'Energy Boost',
      ],
      category: 'Health & Wellbeing',
      image: 'specialist2',
      experience: 3,
      rating: 4.1,
      price: '$50-$70',
      phone: '+380671234568',
      about: `Mykhailo designs personalized workout programs and nutrition plans to help clients reach their fitness goals, while maintaining long-term health and motivation.`,
      workHistory: [
        {
          id: 'w1',
          image: imageMap['specialist1-work-history1'],
          title: 'Bridal Makeup for Destination Wedding in Tuscany',
          description:
            'Elena worked with an international couple planning their dream wedding in Italy. She created a natural and elegant bridal look that lasted through the ceremony, photo shoot, and evening celebration.',
        },
        {
          id: 'w2',
          image: imageMap['specialist1-work-history2'],
          title: 'Makeup for Fashion Campaign – Modern Streetwear Brand',
          description:
            'Collaborated with a local streetwear brand to create bold and expressive looks for their seasonal campaign. Elena focused on edgy eyes and clean skin tones to match the brand’s aesthetic.',
        },
        {
          id: 'w3',
          image: imageMap['specialist1-work-history3'],
          title: 'Photoshoot Makeup for Personal Branding',
          description:
            'Provided camera-ready makeup for a series of personal branding portraits. The goal was to emphasize professionalism and authenticity without overdoing it.',
        },
      ],
      services: [
        {
          id: 's1',
          title: 'Book a Makeup Session',
          description:
            'Get a professional makeup session for weddings, photoshoots, or events.',
        },
        {
          id: 's2',
          title: 'Request a styled look for your event or shoot',
          description:
            'Discuss your style goals and receive tailored fashion advice.',
        },
        {
          id: 's3',
          title: 'Schedule a personal online consultation',
          description:
            'Complete bridal makeup and styling package for your special day.',
        },
        {
          id: 's4',
          title: 'Enroll in her makeup basics mini-course',
          description:
            'Complete bridal makeup and styling package for your special day.',
        },
      ],
      availability: [
        { date: '2024-08-03', isAvailable: true },
        { date: '2024-08-05', isAvailable: false },
        { date: '2024-08-08', isAvailable: true },
      ],
      reviews: [
        {
          id: 'r1',
          userName: 'Ivan',
          comment: 'Great motivator and professional!',
          rating: 5,
        },
      ],
      testimonials: [
        {
          text: 'Elena is a magician. I didn’t just look beautiful — I felt confident every minute of my wedding. Everything looked natural and classy.',
          name: 'Maria',
          role: 'Bride',
          image: '/src/assets/testimonials1.png',
        },
        {
          text: 'Working with Elena is easy and efficient. She instantly understands the creative vision and always makes clients feel comfortable on set.',
          name: 'Inna',
          role: 'Photographer',
          image: '/src/assets/testimonials2.png',
        },
        {
          text: 'I booked a consultation to improve my skincare and presentation for meetings — and it turned into a complete transformation. I’m truly grateful!',
          name: 'Daria',
          role: 'Marketing Manager',
          image: '/src/assets/testimonials3.png',
        },
      ],
    },
    {
      id: '3',
      name: 'Sofia',
      lastname: 'Bondarenko',
      profession: 'Graphic Designer',
      city: 'Odesa',
      tags: ['business consulting', 'it support', 'legal assistance'],
      issues: ['Logo Design', 'Website Layout', 'Marketing Materials'],
      category: 'Business Services',
      image: 'specialist3',
      experience: 7,
      rating: 4.8,
      price: '$150-$300',
      phone: '+380671234569',
      about: `Sofia is a creative graphic designer specializing in brand identity, marketing materials, and digital illustrations, ensuring each project tells a compelling story.`,
      workHistory: [
        {
          id: 'w1',
          image: imageMap['specialist1-work-history1'],
          title: 'Bridal Makeup for Destination Wedding in Tuscany',
          description:
            'Elena worked with an international couple planning their dream wedding in Italy. She created a natural and elegant bridal look that lasted through the ceremony, photo shoot, and evening celebration.',
        },
        {
          id: 'w2',
          image: imageMap['specialist1-work-history2'],
          title: 'Makeup for Fashion Campaign – Modern Streetwear Brand',
          description:
            'Collaborated with a local streetwear brand to create bold and expressive looks for their seasonal campaign. Elena focused on edgy eyes and clean skin tones to match the brand’s aesthetic.',
        },
        {
          id: 'w3',
          image: imageMap['specialist1-work-history3'],
          title: 'Photoshoot Makeup for Personal Branding',
          description:
            'Provided camera-ready makeup for a series of personal branding portraits. The goal was to emphasize professionalism and authenticity without overdoing it.',
        },
      ],
      services: [
        {
          id: 's1',
          title: 'Book a Makeup Session',
          description:
            'Get a professional makeup session for weddings, photoshoots, or events.',
        },
        {
          id: 's2',
          title: 'Request a styled look for your event or shoot',
          description:
            'Discuss your style goals and receive tailored fashion advice.',
        },
        {
          id: 's3',
          title: 'Schedule a personal online consultation',
          description:
            'Complete bridal makeup and styling package for your special day.',
        },
        {
          id: 's4',
          title: 'Enroll in her makeup basics mini-course',
          description:
            'Complete bridal makeup and styling package for your special day.',
        },
      ],
      availability: [
        { date: '2024-08-01', isAvailable: false },
        { date: '2024-08-04', isAvailable: true },
        { date: '2024-08-06', isAvailable: true },
      ],
      reviews: [
        {
          id: 'r1',
          userName: 'Olena',
          comment: 'Amazing creativity and fast delivery!',
          rating: 5,
        },
      ],
      testimonials: [
        {
          text: 'Elena is a magician. I didn’t just look beautiful — I felt confident every minute of my wedding. Everything looked natural and classy.',
          name: 'Maria',
          role: 'Bride',
          image: '/src/assets/testimonials1.png',
        },
        {
          text: 'Working with Elena is easy and efficient. She instantly understands the creative vision and always makes clients feel comfortable on set.',
          name: 'Inna',
          role: 'Photographer',
          image: '/src/assets/testimonials2.png',
        },
        {
          text: 'I booked a consultation to improve my skincare and presentation for meetings — and it turned into a complete transformation. I’m truly grateful!',
          name: 'Daria',
          role: 'Marketing Manager',
          image: '/src/assets/testimonials3.png',
        },
      ],
    },
    {
      id: '4',
      name: 'Oleksandr',
      lastname: 'Melnyk',
      profession: 'Massage Therapist',
      city: 'Kharkiv',
      tags: ['massage therapy', 'emotional wellness', 'nutrition consulting'],
      issues: ['Stress Relief', 'Muscle Recovery', 'Pain Reduction'],
      category: 'Health & Wellbeing',
      image: 'specialist4',
      experience: 4,
      rating: 4.2,
      price: '$40-$60',
      phone: '+380671234570',
      about: `Oleksandr provides therapeutic massages aimed at reducing muscle pain, improving mobility, and promoting overall relaxation.`,
      workHistory: [
        {
          id: 'w1',
          image: imageMap['specialist1-work-history1'],
          title: 'Bridal Makeup for Destination Wedding in Tuscany',
          description:
            'Elena worked with an international couple planning their dream wedding in Italy. She created a natural and elegant bridal look that lasted through the ceremony, photo shoot, and evening celebration.',
        },
        {
          id: 'w2',
          image: imageMap['specialist1-work-history2'],
          title: 'Makeup for Fashion Campaign – Modern Streetwear Brand',
          description:
            'Collaborated with a local streetwear brand to create bold and expressive looks for their seasonal campaign. Elena focused on edgy eyes and clean skin tones to match the brand’s aesthetic.',
        },
        {
          id: 'w3',
          image: imageMap['specialist1-work-history3'],
          title: 'Photoshoot Makeup for Personal Branding',
          description:
            'Provided camera-ready makeup for a series of personal branding portraits. The goal was to emphasize professionalism and authenticity without overdoing it.',
        },
      ],
      services: [
        {
          id: 's1',
          title: 'Book a Makeup Session',
          description:
            'Get a professional makeup session for weddings, photoshoots, or events.',
        },
        {
          id: 's2',
          title: 'Request a styled look for your event or shoot',
          description:
            'Discuss your style goals and receive tailored fashion advice.',
        },
        {
          id: 's3',
          title: 'Schedule a personal online consultation',
          description:
            'Complete bridal makeup and styling package for your special day.',
        },
        {
          id: 's4',
          title: 'Enroll in her makeup basics mini-course',
          description:
            'Complete bridal makeup and styling package for your special day.',
        },
      ],
      availability: [
        { date: '2024-08-01', isAvailable: false },
        { date: '2024-08-04', isAvailable: true },
        { date: '2024-08-06', isAvailable: true },
      ],
      reviews: [
        {
          id: 'r1',
          userName: 'Olena',
          comment: 'Amazing creativity and fast delivery!',
          rating: 5,
        },
      ],
      testimonials: [
        {
          text: 'Elena is a magician. I didn’t just look beautiful — I felt confident every minute of my wedding. Everything looked natural and classy.',
          name: 'Maria',
          role: 'Bride',
          image: '/src/assets/testimonials1.png',
        },
        {
          text: 'Working with Elena is easy and efficient. She instantly understands the creative vision and always makes clients feel comfortable on set.',
          name: 'Inna',
          role: 'Photographer',
          image: '/src/assets/testimonials2.png',
        },
        {
          text: 'I booked a consultation to improve my skincare and presentation for meetings — and it turned into a complete transformation. I’m truly grateful!',
          name: 'Daria',
          role: 'Marketing Manager',
          image: '/src/assets/testimonials3.png',
        },
      ],
    },
    {
      id: '5',
      name: 'Marta',
      lastname: 'Tkachenko',
      profession: 'Math Tutor',
      city: 'Dnipro',
      tags: ['school tutoring', 'language lessons', 'music classes'],
      issues: ['Exam Preparation', 'Homework Help', 'Concept Understanding'],
      category: 'Lessons & Training',
      image: 'specialist5',
      experience: 2,
      rating: 3.8,
      price: '$20-$35',
      phone: '+380671234571',
      about: `Marta helps students of all levels build strong mathematical foundations, preparing them for exams and improving confidence in problem-solving.`,
      workHistory: [
        {
          id: 'w1',
          image: imageMap['specialist1-work-history1'],
          title: 'Bridal Makeup for Destination Wedding in Tuscany',
          description:
            'Elena worked with an international couple planning their dream wedding in Italy. She created a natural and elegant bridal look that lasted through the ceremony, photo shoot, and evening celebration.',
        },
        {
          id: 'w2',
          image: imageMap['specialist1-work-history2'],
          title: 'Makeup for Fashion Campaign – Modern Streetwear Brand',
          description:
            'Collaborated with a local streetwear brand to create bold and expressive looks for their seasonal campaign. Elena focused on edgy eyes and clean skin tones to match the brand’s aesthetic.',
        },
        {
          id: 'w3',
          image: imageMap['specialist1-work-history3'],
          title: 'Photoshoot Makeup for Personal Branding',
          description:
            'Provided camera-ready makeup for a series of personal branding portraits. The goal was to emphasize professionalism and authenticity without overdoing it.',
        },
      ],
      services: [
        {
          id: 's1',
          title: 'Book a Makeup Session',
          description:
            'Get a professional makeup session for weddings, photoshoots, or events.',
        },
        {
          id: 's2',
          title: 'Request a styled look for your event or shoot',
          description:
            'Discuss your style goals and receive tailored fashion advice.',
        },
        {
          id: 's3',
          title: 'Schedule a personal online consultation',
          description:
            'Complete bridal makeup and styling package for your special day.',
        },
        {
          id: 's4',
          title: 'Enroll in her makeup basics mini-course',
          description:
            'Complete bridal makeup and styling package for your special day.',
        },
      ],
      availability: [
        { date: '2024-08-01', isAvailable: false },
        { date: '2024-08-04', isAvailable: true },
        { date: '2024-08-06', isAvailable: true },
      ],
      reviews: [
        {
          id: 'r1',
          userName: 'Olena',
          comment: 'Amazing creativity and fast delivery!',
          rating: 5,
        },
      ],
      testimonials: [
        {
          text: 'Elena is a magician. I didn’t just look beautiful — I felt confident every minute of my wedding. Everything looked natural and classy.',
          name: 'Maria',
          role: 'Bride',
          image: '/src/assets/testimonials1.png',
        },
        {
          text: 'Working with Elena is easy and efficient. She instantly understands the creative vision and always makes clients feel comfortable on set.',
          name: 'Inna',
          role: 'Photographer',
          image: '/src/assets/testimonials2.png',
        },
        {
          text: 'I booked a consultation to improve my skincare and presentation for meetings — and it turned into a complete transformation. I’m truly grateful!',
          name: 'Daria',
          role: 'Marketing Manager',
          image: '/src/assets/testimonials3.png',
        },
      ],
    },
    {
      id: '6',
      name: 'Ivan',
      lastname: 'Petryk',
      profession: 'Handyman',
      city: 'Zaporizhzhia',
      tags: ['handyman services', 'furniture assembly', 'house cleaning'],
      issues: ['Furniture Assembly', 'Small Repairs', 'Home Maintenance'],
      category: 'Home & Garden',
      image: 'specialist6',
      experience: 6,
      rating: 4.3,
      price: '$15-$50',
      phone: '+380671234572',
      about: `Ivan offers reliable handyman services, from quick repairs to furniture assembly, ensuring your home stays in top condition.`,
      workHistory: [
        {
          id: 'w1',
          image: imageMap['specialist1-work-history1'],
          title: 'Bridal Makeup for Destination Wedding in Tuscany',
          description:
            'Elena worked with an international couple planning their dream wedding in Italy. She created a natural and elegant bridal look that lasted through the ceremony, photo shoot, and evening celebration.',
        },
        {
          id: 'w2',
          image: imageMap['specialist1-work-history2'],
          title: 'Makeup for Fashion Campaign – Modern Streetwear Brand',
          description:
            'Collaborated with a local streetwear brand to create bold and expressive looks for their seasonal campaign. Elena focused on edgy eyes and clean skin tones to match the brand’s aesthetic.',
        },
        {
          id: 'w3',
          image: imageMap['specialist1-work-history3'],
          title: 'Photoshoot Makeup for Personal Branding',
          description:
            'Provided camera-ready makeup for a series of personal branding portraits. The goal was to emphasize professionalism and authenticity without overdoing it.',
        },
      ],
      services: [
        {
          id: 's1',
          title: 'Book a Makeup Session',
          description:
            'Get a professional makeup session for weddings, photoshoots, or events.',
        },
        {
          id: 's2',
          title: 'Request a styled look for your event or shoot',
          description:
            'Discuss your style goals and receive tailored fashion advice.',
        },
        {
          id: 's3',
          title: 'Schedule a personal online consultation',
          description:
            'Complete bridal makeup and styling package for your special day.',
        },
        {
          id: 's4',
          title: 'Enroll in her makeup basics mini-course',
          description:
            'Complete bridal makeup and styling package for your special day.',
        },
      ],
      availability: [
        { date: '2024-08-01', isAvailable: false },
        { date: '2024-08-04', isAvailable: true },
        { date: '2024-08-06', isAvailable: true },
      ],
      reviews: [
        {
          id: 'r1',
          userName: 'Olena',
          comment: 'Amazing creativity and fast delivery!',
          rating: 5,
        },
      ],

      testimonials: [
        {
          text: 'Elena is a magician. I didn’t just look beautiful — I felt confident every minute of my wedding. Everything looked natural and classy.',
          name: 'Maria',
          role: 'Bride',
          image: '/src/assets/testimonials1.png',
        },
        {
          text: 'Working with Elena is easy and efficient. She instantly understands the creative vision and always makes clients feel comfortable on set.',
          name: 'Inna',
          role: 'Photographer',
          image: '/src/assets/testimonials2.png',
        },
        {
          text: 'I booked a consultation to improve my skincare and presentation for meetings — and it turned into a complete transformation. I’m truly grateful!',
          name: 'Daria',
          role: 'Marketing Manager',
          image: '/src/assets/testimonials3.png',
        },
      ],
    },
    {
      id: '7',
      name: 'Nazar',
      lastname: 'Symonenko',
      profession: 'Gardener',
      city: 'Kyiv',
      tags: ['gardening', 'house cleaning', 'handyman services'],
      issues: ['Garden Design', 'Plant Care', 'Seasonal Maintenance'],
      category: 'Home & Garden',
      image: 'specialist7',
      experience: 8,
      rating: 4.7,
      price: '$25-$60',
      phone: '+380671234573',
      about: `Nazar specializes in creating and maintaining beautiful gardens, providing expert advice on plant care and seasonal maintenance.`,
      workHistory: [
        {
          id: 'w1',
          image: imageMap['specialist1-work-history1'],
          title: 'Bridal Makeup for Destination Wedding in Tuscany',
          description:
            'Elena worked with an international couple planning their dream wedding in Italy. She created a natural and elegant bridal look that lasted through the ceremony, photo shoot, and evening celebration.',
        },
        {
          id: 'w2',
          image: imageMap['specialist1-work-history2'],
          title: 'Makeup for Fashion Campaign – Modern Streetwear Brand',
          description:
            'Collaborated with a local streetwear brand to create bold and expressive looks for their seasonal campaign. Elena focused on edgy eyes and clean skin tones to match the brand’s aesthetic.',
        },
        {
          id: 'w3',
          image: imageMap['specialist1-work-history3'],
          title: 'Photoshoot Makeup for Personal Branding',
          description:
            'Provided camera-ready makeup for a series of personal branding portraits. The goal was to emphasize professionalism and authenticity without overdoing it.',
        },
      ],
      services: [
        {
          id: 's1',
          title: 'Book a Makeup Session',
          description:
            'Get a professional makeup session for weddings, photoshoots, or events.',
        },
        {
          id: 's2',
          title: 'Request a styled look for your event or shoot',
          description:
            'Discuss your style goals and receive tailored fashion advice.',
        },
        {
          id: 's3',
          title: 'Schedule a personal online consultation',
          description:
            'Complete bridal makeup and styling package for your special day.',
        },
        {
          id: 's4',
          title: 'Enroll in her makeup basics mini-course',
          description:
            'Complete bridal makeup and styling package for your special day.',
        },
      ],
      availability: [
        { date: '2024-08-01', isAvailable: false },
        { date: '2024-08-04', isAvailable: true },
        { date: '2024-08-06', isAvailable: true },
      ],
      reviews: [
        {
          id: 'r1',
          userName: 'Olena',
          comment: 'Amazing creativity and fast delivery!',
          rating: 5,
        },
      ],
      testimonials: [
        {
          text: 'Elena is a magician. I didn’t just look beautiful — I felt confident every minute of my wedding. Everything looked natural and classy.',
          name: 'Maria',
          role: 'Bride',
          image: '/src/assets/testimonials1.png',
        },
        {
          text: 'Working with Elena is easy and efficient. She instantly understands the creative vision and always makes clients feel comfortable on set.',
          name: 'Inna',
          role: 'Photographer',
          image: '/src/assets/testimonials2.png',
        },
        {
          text: 'I booked a consultation to improve my skincare and presentation for meetings — and it turned into a complete transformation. I’m truly grateful!',
          name: 'Daria',
          role: 'Marketing Manager',
          image: '/src/assets/testimonials3.png',
        },
      ],
    },
    {
      id: '8',
      name: 'Kateryna',
      lastname: 'Lysenko',
      profession: 'Event Planner',
      city: 'Kyiv',
      tags: ['event planning', 'catering services', 'makeup styling'],
      issues: ['Full Event Management', 'Venue Coordination', 'Theme Design'],
      category: 'Weddings & Events',
      image: 'specialist8',
      experience: 3,
      rating: 4.1,
      price: '$200-$500',
      phone: '+380671234574',
      about: `Kateryna plans unforgettable events, from intimate gatherings to large-scale celebrations, ensuring every detail is perfect.`,
      workHistory: [
        {
          id: 'w1',
          image: imageMap['specialist1-work-history1'],
          title: 'Bridal Makeup for Destination Wedding in Tuscany',
          description:
            'Elena worked with an international couple planning their dream wedding in Italy. She created a natural and elegant bridal look that lasted through the ceremony, photo shoot, and evening celebration.',
        },
        {
          id: 'w2',
          image: imageMap['specialist1-work-history2'],
          title: 'Makeup for Fashion Campaign – Modern Streetwear Brand',
          description:
            'Collaborated with a local streetwear brand to create bold and expressive looks for their seasonal campaign. Elena focused on edgy eyes and clean skin tones to match the brand’s aesthetic.',
        },
        {
          id: 'w3',
          image: imageMap['specialist1-work-history3'],
          title: 'Photoshoot Makeup for Personal Branding',
          description:
            'Provided camera-ready makeup for a series of personal branding portraits. The goal was to emphasize professionalism and authenticity without overdoing it.',
        },
      ],
      services: [
        {
          id: 's1',
          title: 'Book a Makeup Session',
          description:
            'Get a professional makeup session for weddings, photoshoots, or events.',
        },
        {
          id: 's2',
          title: 'Request a styled look for your event or shoot',
          description:
            'Discuss your style goals and receive tailored fashion advice.',
        },
        {
          id: 's3',
          title: 'Schedule a personal online consultation',
          description:
            'Complete bridal makeup and styling package for your special day.',
        },
        {
          id: 's4',
          title: 'Enroll in her makeup basics mini-course',
          description:
            'Complete bridal makeup and styling package for your special day.',
        },
      ],
      availability: [
        { date: '2024-08-01', isAvailable: false },
        { date: '2024-08-04', isAvailable: true },
        { date: '2024-08-06', isAvailable: true },
      ],
      reviews: [
        {
          id: 'r1',
          userName: 'Olena',
          comment: 'Amazing creativity and fast delivery!',
          rating: 5,
        },
      ],
      testimonials: [
        {
          text: 'Elena is a magician. I didn’t just look beautiful — I felt confident every minute of my wedding. Everything looked natural and classy.',
          name: 'Maria',
          role: 'Bride',
          image: '/src/assets/testimonials1.png',
        },
        {
          text: 'Working with Elena is easy and efficient. She instantly understands the creative vision and always makes clients feel comfortable on set.',
          name: 'Inna',
          role: 'Photographer',
          image: '/src/assets/testimonials2.png',
        },
        {
          text: 'I booked a consultation to improve my skincare and presentation for meetings — and it turned into a complete transformation. I’m truly grateful!',
          name: 'Daria',
          role: 'Marketing Manager',
          image: '/src/assets/testimonials3.png',
        },
      ],
    },
    {
      id: '9',
      name: 'Maksym',
      lastname: 'Kravchuk',
      profession: 'Massage Therapist',
      city: 'Kyiv',
      tags: ['massage therapy', 'emotional wellness', 'personal training'],
      issues: ['Sports Recovery', 'Pain Relief', 'Relaxation'],
      category: 'Health & Wellbeing',
      image: 'specialist9',
      experience: 5,
      rating: 4.6,
      price: '$45-$70',
      phone: '+380671234575',
      about: `Maksym combines traditional and modern massage techniques to help clients recover from injuries, relieve pain, and relax.`,
      workHistory: [
        {
          id: 'w1',
          image: imageMap['specialist1-work-history1'],
          title: 'Bridal Makeup for Destination Wedding in Tuscany',
          description:
            'Elena worked with an international couple planning their dream wedding in Italy. She created a natural and elegant bridal look that lasted through the ceremony, photo shoot, and evening celebration.',
        },
        {
          id: 'w2',
          image: imageMap['specialist1-work-history2'],
          title: 'Makeup for Fashion Campaign – Modern Streetwear Brand',
          description:
            'Collaborated with a local streetwear brand to create bold and expressive looks for their seasonal campaign. Elena focused on edgy eyes and clean skin tones to match the brand’s aesthetic.',
        },
        {
          id: 'w3',
          image: imageMap['specialist1-work-history3'],
          title: 'Photoshoot Makeup for Personal Branding',
          description:
            'Provided camera-ready makeup for a series of personal branding portraits. The goal was to emphasize professionalism and authenticity without overdoing it.',
        },
      ],
      services: [
        {
          id: 's1',
          title: 'Book a Makeup Session',
          description:
            'Get a professional makeup session for weddings, photoshoots, or events.',
        },
        {
          id: 's2',
          title: 'Request a styled look for your event or shoot',
          description:
            'Discuss your style goals and receive tailored fashion advice.',
        },
        {
          id: 's3',
          title: 'Schedule a personal online consultation',
          description:
            'Complete bridal makeup and styling package for your special day.',
        },
        {
          id: 's4',
          title: 'Enroll in her makeup basics mini-course',
          description:
            'Complete bridal makeup and styling package for your special day.',
        },
      ],
      availability: [
        { date: '2024-08-01', isAvailable: false },
        { date: '2024-08-04', isAvailable: true },
        { date: '2024-08-06', isAvailable: true },
      ],
      reviews: [
        {
          id: 'r1',
          userName: 'Olena',
          comment: 'Amazing creativity and fast delivery!',
          rating: 5,
        },
      ],
      testimonials: [
        {
          text: 'Elena is a magician. I didn’t just look beautiful — I felt confident every minute of my wedding. Everything looked natural and classy.',
          name: 'Maria',
          role: 'Bride',
          image: '/src/assets/testimonials1.png',
        },
        {
          text: 'Working with Elena is easy and efficient. She instantly understands the creative vision and always makes clients feel comfortable on set.',
          name: 'Inna',
          role: 'Photographer',
          image: '/src/assets/testimonials2.png',
        },
        {
          text: 'I booked a consultation to improve my skincare and presentation for meetings — and it turned into a complete transformation. I’m truly grateful!',
          name: 'Daria',
          role: 'Marketing Manager',
          image: '/src/assets/testimonials3.png',
        },
      ],
    },
    {
      id: '10',
      name: 'Dmytro',
      lastname: 'Zakharchuk',
      profession: 'Hair Stylist',
      city: 'Kyiv',
      tags: ['makeup styling', 'event planning', 'catering services'],
      issues: ['Wedding Hair', 'Haircuts', 'Hair Coloring'],
      category: 'Weddings & Events',
      image: 'specialist10',
      experience: 4,
      rating: 4.0,
      price: '$30-$70',
      phone: '+380671234576',
      about: `Dmytro creates stylish, personalized haircuts and event hairstyles to match each client's look and occasion.`,
      workHistory: [
        {
          id: 'w1',
          image: imageMap['specialist1-work-history1'],
          title: 'Bridal Makeup for Destination Wedding in Tuscany',
          description:
            'Elena worked with an international couple planning their dream wedding in Italy. She created a natural and elegant bridal look that lasted through the ceremony, photo shoot, and evening celebration.',
        },
        {
          id: 'w2',
          image: imageMap['specialist1-work-history2'],
          title: 'Makeup for Fashion Campaign – Modern Streetwear Brand',
          description:
            'Collaborated with a local streetwear brand to create bold and expressive looks for their seasonal campaign. Elena focused on edgy eyes and clean skin tones to match the brand’s aesthetic.',
        },
        {
          id: 'w3',
          image: imageMap['specialist1-work-history3'],
          title: 'Photoshoot Makeup for Personal Branding',
          description:
            'Provided camera-ready makeup for a series of personal branding portraits. The goal was to emphasize professionalism and authenticity without overdoing it.',
        },
      ],
      services: [
        {
          id: 's1',
          title: 'Book a Makeup Session',
          description:
            'Get a professional makeup session for weddings, photoshoots, or events.',
        },
        {
          id: 's2',
          title: 'Request a styled look for your event or shoot',
          description:
            'Discuss your style goals and receive tailored fashion advice.',
        },
        {
          id: 's3',
          title: 'Schedule a personal online consultation',
          description:
            'Complete bridal makeup and styling package for your special day.',
        },
        {
          id: 's4',
          title: 'Enroll in her makeup basics mini-course',
          description:
            'Complete bridal makeup and styling package for your special day.',
        },
      ],
      availability: [
        { date: '2024-08-01', isAvailable: false },
        { date: '2024-08-04', isAvailable: true },
        { date: '2024-08-06', isAvailable: true },
      ],
      reviews: [
        {
          id: 'r1',
          userName: 'Olena',
          comment: 'Amazing creativity and fast delivery!',
          rating: 5,
        },
      ],
      testimonials: [
        {
          text: 'Elena is a magician. I didn’t just look beautiful — I felt confident every minute of my wedding. Everything looked natural and classy.',
          name: 'Maria',
          role: 'Bride',
          image: '/src/assets/testimonials1.png',
        },
        {
          text: 'Working with Elena is easy and efficient. She instantly understands the creative vision and always makes clients feel comfortable on set.',
          name: 'Inna',
          role: 'Photographer',
          image: '/src/assets/testimonials2.png',
        },
        {
          text: 'I booked a consultation to improve my skincare and presentation for meetings — and it turned into a complete transformation. I’m truly grateful!',
          name: 'Daria',
          role: 'Marketing Manager',
          image: '/src/assets/testimonials3.png',
        },
      ],
    },
    {
      id: '11',
      name: 'Alex',
      lastname: 'Koval',
      profession: 'Hair Stylist',
      city: 'Kyiv',
      tags: ['makeup styling', 'event photography', 'event planning'],
      issues: ['Hair Coloring', 'Event Hairstyles', 'Styling Advice'],
      category: 'Weddings & Events',
      image: 'specialist11',
      experience: 2,
      rating: 3.5,
      price: '$25-$50',
      phone: '+380671234577',
      about: `Alex provides modern and classic hair styling for everyday wear and special events, tailoring each style to the client's preferences.`,
      workHistory: [
        {
          id: 'w1',
          image: imageMap['specialist1-work-history1'],
          title: 'Bridal Makeup for Destination Wedding in Tuscany',
          description:
            'Elena worked with an international couple planning their dream wedding in Italy. She created a natural and elegant bridal look that lasted through the ceremony, photo shoot, and evening celebration.',
        },
        {
          id: 'w2',
          image: imageMap['specialist1-work-history2'],
          title: 'Makeup for Fashion Campaign – Modern Streetwear Brand',
          description:
            'Collaborated with a local streetwear brand to create bold and expressive looks for their seasonal campaign. Elena focused on edgy eyes and clean skin tones to match the brand’s aesthetic.',
        },
        {
          id: 'w3',
          image: imageMap['specialist1-work-history3'],
          title: 'Photoshoot Makeup for Personal Branding',
          description:
            'Provided camera-ready makeup for a series of personal branding portraits. The goal was to emphasize professionalism and authenticity without overdoing it.',
        },
      ],
      services: [
        {
          id: 's1',
          title: 'Book a Makeup Session',
          description:
            'Get a professional makeup session for weddings, photoshoots, or events.',
        },
        {
          id: 's2',
          title: 'Personal Style Consultation',
          description:
            'Discuss your style goals and receive tailored fashion advice.',
        },
        {
          id: 's3',
          title: 'Bridal Package',
          description:
            'Complete bridal makeup and styling package for your special day.',
        },
      ],
      availability: [
        { date: '2024-08-01', isAvailable: false },
        { date: '2024-08-04', isAvailable: true },
        { date: '2024-08-06', isAvailable: true },
      ],
      reviews: [
        {
          id: 'r1',
          userName: 'Olena',
          comment: 'Amazing creativity and fast delivery!',
          rating: 5,
        },
      ],
      testimonials: [
        {
          text: 'Elena is a magician. I didn’t just look beautiful — I felt confident every minute of my wedding. Everything looked natural and classy.',
          name: 'Maria',
          role: 'Bride',
          image: '/src/assets/testimonials1.png',
        },
        {
          text: 'Working with Elena is easy and efficient. She instantly understands the creative vision and always makes clients feel comfortable on set.',
          name: 'Inna',
          role: 'Photographer',
          image: '/src/assets/testimonials2.png',
        },
        {
          text: 'I booked a consultation to improve my skincare and presentation for meetings — and it turned into a complete transformation. I’m truly grateful!',
          name: 'Daria',
          role: 'Marketing Manager',
          image: '/src/assets/testimonials3.png',
        },
      ],
    },
    {
      id: '12',
      name: 'Alex',
      lastname: 'Marchenko',
      profession: 'Hair Stylist',
      city: 'Kyiv',
      tags: ['makeup styling', 'event photography', 'event planning'],
      issues: ['Haircuts', 'Color Matching', 'Event Hair'],
      category: 'Weddings & Events',
      image: 'specialist1',
      experience: 1,
      rating: 2.5,
      price: '$20-$40',
      phone: '+380671234578',
      about: `Alex is an emerging hairstylist who focuses on delivering fresh and trendy hairstyles for special occasions.`,
      workHistory: [
        {
          id: 'w1',
          image: imageMap['specialist1-work-history1'],
          title: 'Bridal Makeup for Destination Wedding in Tuscany',
          description:
            'Elena worked with an international couple planning their dream wedding in Italy. She created a natural and elegant bridal look that lasted through the ceremony, photo shoot, and evening celebration.',
        },
        {
          id: 'w2',
          image: imageMap['specialist1-work-history2'],
          title: 'Makeup for Fashion Campaign – Modern Streetwear Brand',
          description:
            'Collaborated with a local streetwear brand to create bold and expressive looks for their seasonal campaign. Elena focused on edgy eyes and clean skin tones to match the brand’s aesthetic.',
        },
        {
          id: 'w3',
          image: imageMap['specialist1-work-history3'],
          title: 'Photoshoot Makeup for Personal Branding',
          description:
            'Provided camera-ready makeup for a series of personal branding portraits. The goal was to emphasize professionalism and authenticity without overdoing it.',
        },
      ],
      services: [
        {
          id: 's1',
          title: 'Book a Makeup Session',
          description:
            'Get a professional makeup session for weddings, photoshoots, or events.',
        },
        {
          id: 's2',
          title: 'Request a styled look for your event or shoot',
          description:
            'Discuss your style goals and receive tailored fashion advice.',
        },
        {
          id: 's3',
          title: 'Schedule a personal online consultation',
          description:
            'Complete bridal makeup and styling package for your special day.',
        },
        {
          id: 's4',
          title: 'Enroll in her makeup basics mini-course',
          description:
            'Complete bridal makeup and styling package for your special day.',
        },
      ],
      availability: [
        { date: '2024-08-01', isAvailable: false },
        { date: '2024-08-04', isAvailable: true },
        { date: '2024-08-06', isAvailable: true },
      ],
      reviews: [
        {
          id: 'r1',
          userName: 'Olena',
          comment: 'Amazing creativity and fast delivery!',
          rating: 5,
        },
      ],
      testimonials: [
        {
          text: 'Elena is a magician. I didn’t just look beautiful — I felt confident every minute of my wedding. Everything looked natural and classy.',
          name: 'Maria',
          role: 'Bride',
          image: '/src/assets/testimonials1.png',
        },
        {
          text: 'Working with Elena is easy and efficient. She instantly understands the creative vision and always makes clients feel comfortable on set.',
          name: 'Inna',
          role: 'Photographer',
          image: '/src/assets/testimonials2.png',
        },
        {
          text: 'I booked a consultation to improve my skincare and presentation for meetings — and it turned into a complete transformation. I’m truly grateful!',
          name: 'Daria',
          role: 'Marketing Manager',
          image: '/src/assets/testimonials3.png',
        },
      ],
    },
    {
      id: '13',
      name: 'Dmytro',
      lastname: 'Bondarenko',
      profession: 'Graphic Designer',
      city: 'Odesa',
      tags: ['business consulting', 'accounting help', 'it support'],
      issues: ['Logo Design', 'Packaging', 'Social Media Content'],
      category: 'Business Services',
      image: 'specialist10',
      experience: 5,
      rating: 4.5,
      price: '$100-$250',
      phone: '+380671234579',
      about: `Dmytro specializes in creating visual identities that help businesses stand out in competitive markets.`,
      workHistory: [
        {
          id: 'w1',
          image: imageMap['specialist1-work-history1'],
          title: 'Bridal Makeup for Destination Wedding in Tuscany',
          description:
            'Elena worked with an international couple planning their dream wedding in Italy. She created a natural and elegant bridal look that lasted through the ceremony, photo shoot, and evening celebration.',
        },
        {
          id: 'w2',
          image: imageMap['specialist1-work-history2'],
          title: 'Makeup for Fashion Campaign – Modern Streetwear Brand',
          description:
            'Collaborated with a local streetwear brand to create bold and expressive looks for their seasonal campaign. Elena focused on edgy eyes and clean skin tones to match the brand’s aesthetic.',
        },
        {
          id: 'w3',
          image: imageMap['specialist1-work-history3'],
          title: 'Photoshoot Makeup for Personal Branding',
          description:
            'Provided camera-ready makeup for a series of personal branding portraits. The goal was to emphasize professionalism and authenticity without overdoing it.',
        },
      ],
      services: [
        {
          id: 's1',
          title: 'Book a Makeup Session',
          description:
            'Get a professional makeup session for weddings, photoshoots, or events.',
        },
        {
          id: 's2',
          title: 'Request a styled look for your event or shoot',
          description:
            'Discuss your style goals and receive tailored fashion advice.',
        },
        {
          id: 's3',
          title: 'Schedule a personal online consultation',
          description:
            'Complete bridal makeup and styling package for your special day.',
        },
        {
          id: 's4',
          title: 'Enroll in her makeup basics mini-course',
          description:
            'Complete bridal makeup and styling package for your special day.',
        },
      ],
      availability: [
        { date: '2024-08-01', isAvailable: false },
        { date: '2024-08-04', isAvailable: true },
        { date: '2024-08-06', isAvailable: true },
      ],
      reviews: [
        {
          id: 'r1',
          userName: 'Olena',
          comment: 'Amazing creativity and fast delivery!',
          rating: 5,
        },
      ],
      testimonials: [
        {
          text: 'Elena is a magician. I didn’t just look beautiful — I felt confident every minute of my wedding. Everything looked natural and classy.',
          name: 'Maria',
          role: 'Bride',
          image: '/src/assets/testimonials1.png',
        },
        {
          text: 'Working with Elena is easy and efficient. She instantly understands the creative vision and always makes clients feel comfortable on set.',
          name: 'Inna',
          role: 'Photographer',
          image: '/src/assets/testimonials2.png',
        },
        {
          text: 'I booked a consultation to improve my skincare and presentation for meetings — and it turned into a complete transformation. I’m truly grateful!',
          name: 'Daria',
          role: 'Marketing Manager',
          image: '/src/assets/testimonials3.png',
        },
      ],
    },
    {
      id: '14',
      name: 'Alex',
      lastname: 'Hryshchenko',
      profession: 'Hair Stylist',
      city: 'Kyiv',
      tags: ['makeup styling', 'event planning', 'event photography'],
      issues: ['Haircuts', 'Hair Coloring', 'Styling Advice'],
      category: 'Weddings & Events',
      image: 'specialist11',
      experience: 4,
      rating: 2.5,
      price: '$30-$60',
      phone: '+380671234580',
      about: `Alex delivers personalized haircuts and color treatments to suit each client’s style and occasion.`,
      workHistory: [],
      services: [],
      availability: [],
      reviews: [],
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
