export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  age: number
  gender: 'male' | 'female'
  image: string
  company: Company
  address: Address
}

export interface UsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}

export interface Company {
  name: string
  department: string
}

export interface Address {
  city: string
  country: string
}
