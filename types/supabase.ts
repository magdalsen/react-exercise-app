export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          id: number
          imgSrc: string
          name: string | null
          phoneNumber: string | null
          postCode: string | null
          street: string | null
          subRegion: string | null
          surname: string | null
          town: string | null
        }
        Insert: {
          id?: number
          imgSrc?: string
          name?: string | null
          phoneNumber?: string | null
          postCode?: string | null
          street?: string | null
          subRegion?: string | null
          surname?: string | null
          town?: string | null
        }
        Update: {
          id?: number
          imgSrc?: string
          name?: string | null
          phoneNumber?: string | null
          postCode?: string | null
          street?: string | null
          subRegion?: string | null
          surname?: string | null
          town?: string | null
        }
      }
      orders: {
        Row: {
          amount: number | null
          id: number
          orderOwner: string | null
          ownerId: number | null
          payed: boolean | null
          phoneNumber: string | null
          title: string | null
        }
        Insert: {
          amount?: number | null
          id?: number
          orderOwner?: string | null
          ownerId?: number | null
          payed?: boolean | null
          phoneNumber?: string | null
          title?: string | null
        }
        Update: {
          amount?: number | null
          id?: number
          orderOwner?: string | null
          ownerId?: number | null
          payed?: boolean | null
          phoneNumber?: string | null
          title?: string | null
        }
      }
      users: {
        Row: {
          confirm: string | null
          email: string | null
          id: number
          image: string | null
          name: string | null
          password: string | null
          surname: string | null
        }
        Insert: {
          confirm?: string | null
          email?: string | null
          id?: number
          image?: string | null
          name?: string | null
          password?: string | null
          surname?: string | null
        }
        Update: {
          confirm?: string | null
          email?: string | null
          id?: number
          image?: string | null
          name?: string | null
          password?: string | null
          surname?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
