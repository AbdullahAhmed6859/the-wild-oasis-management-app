import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://grsippozsesugdalgnst.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdyc2lwcG96c2VzdWdkYWxnbnN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk4NDAzMTgsImV4cCI6MjAzNTQxNjMxOH0.oXj--mfrpgTDKlm1W65FzzIm-4GhtW1J37yKGfK-Cac";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
