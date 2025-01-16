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
