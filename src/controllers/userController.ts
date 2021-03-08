import express, { Router, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import db from '../database/connection'
import { authorize, decodeToken, generateToken } from '../utils/authService'
import { existsOrError, equalsOrError } from '../utils/validators'

const route = Router()

function encryptPassword(password: string) {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

route.post('/user/create', async (req: Request, res: Response) => {
  let { nickname, password } = req.body

  try {

    existsOrError(nickname, "Nome obrigatório")
    existsOrError(password, "Senha não informada.")
    const userDb = await db('user').where({ nickname: nickname }).first()
    if (userDb) throw "Usuário já cadastrado."

  } catch (e) {

    return res.status(400).json({ message: e })
  }

  password = encryptPassword(password)

  const userCreate = await db('user').insert({ nickname, password }).returning(['nickname'])
  // userCreate[0].password = undefined

  // console.log(userCreate)
  res.status(201).json(userCreate)
})



route.post('/user/login', async (req: Request, res: Response) => {
  let { nickname, password } = req.body

  try {
    existsOrError(nickname, "Nome obrigatório")
    existsOrError(password, "Senha não informada.")
  } catch (e) {
    return res.status(400).json({ message: e })
  }

  const user = await db('user').where({ nickname: nickname }).first()
  if (!user) return res.status(400).json({ message: "Usuário não cadastrado." })

  const isMatch = bcrypt.compareSync(password, user.password)
  if (!isMatch) return res.status(400).json({ message: "Senha inválida." })

  const token = generateToken(user)
  user.password = undefined

  return res.status(200).json({ user, token })
})



export default route