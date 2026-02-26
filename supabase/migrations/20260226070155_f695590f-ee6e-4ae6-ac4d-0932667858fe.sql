-- Create a secure function for customers to look up orders by phone number
-- This avoids needing a permissive SELECT RLS policy on orders
CREATE OR REPLACE FUNCTION public.lookup_orders_by_phone(phone_number text)
RETURNS TABLE (
  id uuid,
  product_name text,
  product_price text,
  quantity integer,
  status text,
  payment_method text,
  created_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT o.id, o.product_name, o.product_price, o.quantity, o.status, o.payment_method, o.created_at
  FROM public.orders o
  WHERE o.customer_phone = phone_number
  ORDER BY o.created_at DESC
  LIMIT 50;
$$;