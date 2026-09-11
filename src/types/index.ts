// Одна з 5 фіксованих "вітринних" індустрій, які спеціаліст сам обирає собі в
// профілі (/profile -> Professional profile). Окремо від Category/CategoryItem
// (це конкретні бронювані послуги з довільною назвою, ціною і тривалістю).
export const INDUSTRIES = [
  'HOME_GARDEN',
  'HEALTH_WELLBEING',
  'WEDDINGS_EVENTS',
  'BUSINESS_SERVICES',
  'LESSONS_TRAINING',
] as const;
export type Industry = (typeof INDUSTRIES)[number];

export const INDUSTRY_LABELS: Record<Industry, string> = {
  HOME_GARDEN: 'Home & Garden',
  HEALTH_WELLBEING: 'Health & Wellbeing',
  WEDDINGS_EVENTS: 'Weddings & Events',
  BUSINESS_SERVICES: 'Business Services',
  LESSONS_TRAINING: 'Lessons & Training',
};

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
  // Людський підпис індустрії (див. INDUSTRY_LABELS) — undefined, якщо
  // спеціаліст ще не обрав жодну.
  category?: string;
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
  industry: Industry | null;
}

// GET /api/bookings/* — BookingResponseDto from the backend
export interface Booking {
  id: number;
  clientId: number | null;
  serviceItemId: number | null;
  specialistId: number; // SpecialistProfile id
  specialistName: string;
  serviceName: string | null;
  price: string;
  startTime: string;
  endTime: string;
  rescheduleMessage: string | null;
  status:
    | 'PENDING'
    | 'CONFIRMED'
    | 'CANCELLED'
    | 'COMPLETED'
    | 'BLOCKED'
    | 'RESCHEDULE_REQUESTED';
}

// GET /api/specialists/:id/reviews
export interface SpecialistReview {
  id: number;
  rating: number;
  comment: string | null;
  createdAt: string;
  authorName: string;
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
  onSearch: (filters: SpecialistsSearchFilters) => void;
  pageType: 'services' | 'people';
}

// Єдина форма фільтрів, що реально доходить до бекенду
// (GET /api/specialists/search) — SearchBar, DiscoverSection і
// SpecialistsGrid усі говорять цією мовою, без проміжних "UI-only" форм,
// що раніше губилися дорогою (див. SpecialistsGrid, який їх ігнорував).
export interface SpecialistsSearchFilters {
  serviceName?: string;
  firstName?: string;
  city?: string;
  categories?: string[];
  tags?: string[];
  industry?: Industry;
  minExperience?: number;
  minRating?: number;
}
// Той самий набір полів, але як рядки з формених інпутів — до парсингу/валідації.
export interface SearchFiltersUI {
  serviceName?: string;
  firstName?: string;
  city?: string;
  categories?: string;
  tags?: string;
  minExperience?: string;
  minRating?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export interface SpecialistsGridProps {
  filters?: SpecialistsSearchFilters;
  itemsPerPage?: number;
}

export interface LocationState {
  // Значення для SpecialistsSearchFilters.serviceName, передане навігацією
  // (напр. з картки послуги на /services) — вже реальний, робочий фільтр.
  serviceName?: string;
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
