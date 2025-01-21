export interface UserLogin{
  id:number,
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
  rol: string
  auth: boolean
  authCode: string
  speciality: string
  hSpeciality: string
}

export interface UserTable{
  id:number,
  email: string
  rol: string
  auth: boolean
  speciality: string
  hSpeciality: string
  status:boolean
}

export interface UserTableEdit{
  id:number,
  email: string
  rol: string
  auth: boolean
  speciality: string
  hSpeciality: string
  status:boolean
  statusString?:string
}
