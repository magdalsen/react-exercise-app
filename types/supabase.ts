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
          name: string
          phoneNumber: string
          postCode: string
          street: string
          subRegion: string
          surname: string
          town: string
        }
        Insert: {
          id?: number
          imgSrc?: string
          name?: string
          phoneNumber?: string
          postCode?: string
          street?: string
          subRegion?: string
          surname?: string
          town?: string
        }
        Update: {
          id?: number
          imgSrc?: string
          name?: string
          phoneNumber?: string
          postCode?: string
          street?: string
          subRegion?: string
          surname?: string
          town?: string
        }
      }
      orders: {
        Row: {
          amount: number
          id: number
          orderOwner: string
          ownerId: number
          payed: boolean
          phoneNumber: string
          title: string
        }
        Insert: {
          amount: number
          id?: number
          orderOwner?: string
          ownerId: number
          payed: boolean
          phoneNumber: string
          title?: string
        }
        Update: {
          amount?: number
          id?: number
          orderOwner?: string
          ownerId?: number
          payed?: boolean
          phoneNumber?: string
          title?: string
        }
      }
      users: {
        Row: {
          id: string
          image: string
          name: string
          surname: string
        }
        Insert: {
          id: string
          image?: string
          name?: string
          surname?: string
        }
        Update: {
          id?: string
          image?: string
          name?: string
          surname?: string
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
