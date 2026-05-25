export interface AdminData {
  counts: { products: number; posts: number; clicks: number; revenue: number };
  products: Array<{ id: string; name: string; category: string; created_at: string }>;
  posts: Array<{ id: string; title: string; slug: string; status: string; created_at: string }>;
}
