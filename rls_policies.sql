-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can only see own data" ON public.users;
DROP POLICY IF EXISTS "Users can only insert own data" ON public.users;
DROP POLICY IF EXISTS "Users can only update own data" ON public.users;
DROP POLICY IF EXISTS "Users can only delete own data" ON public.users;

DROP POLICY IF EXISTS "Users can see all blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Users can create blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Users can update own blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Users can delete own blog posts" ON public.blog_posts;

DROP POLICY IF EXISTS "Users can see all products" ON public.affiliate_products;
DROP POLICY IF EXISTS "Users can create products" ON public.affiliate_products;
DROP POLICY IF EXISTS "Users can update own products" ON public.affiliate_products;
DROP POLICY IF EXISTS "Users can delete own products" ON public.affiliate_products;

-- Users table policies
CREATE POLICY "Users can only see own data"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can only insert own data"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can only update own data"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can only delete own data"
  ON public.users FOR DELETE
  USING (auth.uid() = id);

-- Blog posts policies (users see all, but only edit their own)
CREATE POLICY "Users can see all blog posts"
  ON public.blog_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create blog posts"
  ON public.blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own blog posts"
  ON public.blog_posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own blog posts"
  ON public.blog_posts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Affiliate products policies (users see all, but only edit their own)
CREATE POLICY "Users can see all products"
  ON public.affiliate_products FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create products"
  ON public.affiliate_products FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own products"
  ON public.affiliate_products FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own products"
  ON public.affiliate_products FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
