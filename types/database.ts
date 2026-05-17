export interface Photo {
  id: string
  title: string
  description: string | null
  category: string
  image_url: string
  storage_path: string | null
  is_featured: boolean
  avg_rating: number
  rating_count: number
  created_at: string
}

export interface Appointment {
  id: string
  client_name: string
  email: string
  phone: string
  service_type: string
  preferred_date: string
  preferred_time: string
  location: string | null
  notes: string | null
  status: 'pending' | 'confirmed' | 'rejected'
  created_at: string
}

export interface Rating {
  id: string
  photo_id: string
  stars: number
  comment: string | null
  created_at: string
}

export interface NewsletterSubscriber {
  id: string
  email: string
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  cover_image_url: string | null
  category: string | null
  published: boolean
  created_at: string
}