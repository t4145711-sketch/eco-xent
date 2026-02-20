
-- Allow authenticated users to insert their own admin role
-- BUT only if no admin exists yet (first-time setup protection)
CREATE OR REPLACE FUNCTION public.no_admin_exists()
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT NOT EXISTS (
    SELECT 1 FROM public.user_roles WHERE role = 'admin'
  )
$$;

-- Allow first-time admin self-assignment only
CREATE POLICY "First admin self-assign"
ON public.user_roles FOR INSERT
WITH CHECK (
  user_id = auth.uid()
  AND role = 'admin'
  AND public.no_admin_exists()
);
