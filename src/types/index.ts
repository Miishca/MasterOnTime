export interface Specialist {
  id: string;
  name: string;
  category: string;
  city: string;
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

