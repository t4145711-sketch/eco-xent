
-- Drop all existing restrictive policies on orders
DROP POLICY IF EXISTS "Admins can delete orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Anyone can place an order" ON public.orders;

-- Create proper PERMISSIVE policies on orders
CREATE POLICY "Anyone can place an order"
ON public.orders FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Only admins can view orders"
ON public.orders FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can update orders"
ON public.orders FOR UPDATE
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can delete orders"
ON public.orders FOR DELETE
TO authenticated
USING (public.is_admin());

-- Drop all existing restrictive policies on user_roles
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "First admin self-assign" ON public.user_roles;

-- Create proper PERMISSIVE policies on user_roles
CREATE POLICY "Only admins can view roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can manage roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.is_admin());

CREATE POLICY "First admin self-assign"
ON public.user_roles FOR INSERT
TO authenticated
WITH CHECK (
  user_id = auth.uid()
  AND role = 'admin'::app_role
  AND public.no_admin_exists()
);

-- Create rate limit table for chat endpoint
CREATE TABLE IF NOT EXISTS public.chat_rate_limits (
  ip_address text PRIMARY KEY,
  count integer NOT NULL DEFAULT 1,
  last_reset bigint NOT NULL DEFAULT (extract(epoch from now()) * 1000)::bigint
);

-- Enable RLS but allow edge function (service role) full access
ALTER TABLE public.chat_rate_limits ENABLE ROW LEVEL SECURITY;

-- No public access to rate limit table (only service role can access)
