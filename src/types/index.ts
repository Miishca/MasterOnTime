export interface Specialist {
  id: string;
  name: string;
  lastname: string;
  profession: string;
  city: string;
  tags: string[];
  category: 'Home & Garden' | 'Health & Wellbeing' | 'Weddings & Events' | 'Business Services' | 'Lessons & Training';
  image?: string;
  experience: number;
  rating: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export interface SpecialistsGridProps {
  filters?: { 
    category?: string; 
    city?: string; 
    experience?: number; 
    rating?: number;
  };
  itemsPerPage?: number;
}
export interface Landing {
  image: string;
  title: string;
  tags: string[];
}

export interface Service {
  image: string;
  title?: string;
}

