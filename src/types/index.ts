export interface Specialist {
  id: string;
  profession: string;
  city: string;
  dob?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location?: string;
  serviceType?: string;
  sex?: string;
  address?: string;
  country?: string;
  zip?: string;
  cardType?: string;
  cardHolder?: string;
  expire?: string;
  cardNumber?: string;
  balance?: string;
  tags: string[];
  issues: string[];
  category:
    | 'Home & Garden'
    | 'Health & Wellbeing'
    | 'Weddings & Events'
    | 'Business Services'
    | 'Lessons & Training';
  image?: string;
  experience: number;
  rating: number;
  price: string;
  about: string;
  workHistory?: WorkHistoryItem[];
  services?: ServiceItem[];
  availability?: AvailabilityDay[];
  reviews?: ReviewItem[];
  testimonials?: Testimonial[];
}

// Публічна проєкція спеціаліста з бекенду (GET /api/specialists*).
// Навмисно без email / телефону / точної адреси / дати народження.
export interface PublicSpecialist {
  id: number;
  firstName: string;
  lastName: string;
  city: string | null;
  profession: string;
  about: string;
  rating: number;
  experience: number;
  tags: string[];
  price: string;
  profileImageUrl: string | null;
}

export interface UserProfile {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  address?: {
    country: string;
    city: string;
    street: string;
    zip: string;
  };
  phoneNumber?: string;
  profileImageUrl?: string;
  dateOfBirth?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
}

export interface RegisterRequest {
  email: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  // base64 payload without the "data:<mime>;base64," prefix
  profileImageBase64?: string;
  address: {
    city: string;
    street: string;
    zip: string;
    country: string;
  };
}
// Роль призначає лише адмін (PATCH /api/admin/users/:id/role) — не при реєстрації.

export interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  pageType: 'services' | 'people';
}

export interface SearchFilters {
  category?: string;
  name?: string;
  city?: string;
  serviceType?: string;
  location?: string;
  experience?: string;
  rating?: string;
  tags?: string;
  id?: string;
}
export interface SpecialistsSearchFilters {
  serviceName?: string;
  firstName?: string;
  city?: string;
  categories?: string[];
  minExperience?: number;
  minRating?: number;
}
export interface SearchFiltersUI {
  serviceName?: string;
  firstName?: string;
  city?: string;
  categories?: string;
  minExperience?: string;
  minRating?: string;
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

export interface WorkHistoryItem {
  id: string;
  image: string;
  title: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description?: string;
  price?: string;
}

export interface AvailabilityDay {
  date: string;
  isAvailable: boolean;
}

export interface ReviewItem {
  id: string;
  userName: string;
  userImage?: string;
  comment: string;
  rating: number;
}

export interface Testimonial {
  text: string;
  name: string;
  role: string;
  image: string;
}
