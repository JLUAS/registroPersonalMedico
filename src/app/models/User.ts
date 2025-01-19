export interface UserLogin{
  email: string
  password: string
}

export interface AuthenticateUser{
  email: string
  authCode: string
}

export interface UserRegister{
  email: string
  password: string
  username: string
  rol: string
  auth: boolean
  authCode: string
  speciality: string
  hSpeciality: string
}

export interface UserTable{
  email: string
  username: string
  rol: string
  auth: boolean
  speciality: string
  hSpeciality: string
}
