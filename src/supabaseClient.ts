import { createClient } from '@supabase/supabase-js'

// eslint-disable-next-line no-undef
const supabaseUrl = "https://euadrratrnegzedujfxe.supabase.co"
// eslint-disable-next-line no-undef
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1YWRycmF0cm5lZ3plZHVqZnhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEyOTMxODUsImV4cCI6MTk5Njg2OTE4NX0.ikEenEqQwpoHjohU3zV4WvjTNKlWoz_xxTNp01Q_Pg4"

export const supabase = createClient(supabaseUrl, supabaseKey)