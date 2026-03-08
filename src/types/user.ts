export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  age: number
  gender: string
  image: string
  company: {
    name: string
    department: string
  }
  address: {
    city: string
    country: string
  }
}

export interface UsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}
