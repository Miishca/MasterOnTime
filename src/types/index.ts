export interface Specialist {
  id: string;
  name: string;
  lastname: string;
  profession: string;
  city: string;
  tags: string[];
  category:
    | 'Home & Garden'
    | 'Health & Wellbeing'
    | 'Weddings & Events'
    | 'Business Services'
    | 'Lessons & Training';
  image?: string;
  experience: number;
  rating: number;
}

export interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  pageType: 'services' | 'people';
}

export interface SearchFilters {
  category?: string;
  name?: string;
  city?: string;
  experience?: string;
  rating?: string;
  tags?: string;
}
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export interface SpecialistsGridProps {
  filters?: SearchFilters;
  itemsPerPage?: number;
}

export interface LocationState {
  filterTag?: string;
  scrollToGrid?: boolean;
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
