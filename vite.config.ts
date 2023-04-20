import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      "SUPABASE_URL": "https://euadrratrnegzedujfxe.supabase.co",
      "SUPABASE_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1YWRycmF0cm5lZ3plZHVqZnhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEyOTMxODUsImV4cCI6MTk5Njg2OTE4NX0.ikEenEqQwpoHjohU3zV4WvjTNKlWoz_xxTNp01Q_Pg4",
      "SUPABASE_ACCESS_TOKEN": "sbp_67deb0118dc46d0d39a67762804590ba6d3fac60"
    }
  }
})
