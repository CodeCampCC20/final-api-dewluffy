import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const registerDoctor = async (req, res, next)=>{
  try {
    const {username, password, specialization} = req.body

    const doctor = await prisma.doctor.findFirst({
      where:{
        username,
      }
    })

    if(doctor) {
      createError(400,'Username already exist!!!!')
    }
    const hashPassword = bcrypt.hashSync(password, 10)
    console.log(hashPassword)

    const result = await prisma.doctor.create({
      data:{
        username,
        password:hashPassword,
        specialization
      }
    })
    res.json({message:`Register doctor Successfully`})
  } catch (error) {
    next(error)
  }
}

export const registerUser = async (req, res, next)=>{
  try {
    const {username, password} = req.body

    const user = await prisma.user.findFirst({
      where:{
        username,
      }
    })
    console.log(user)
    if(user) {
      createError(400,'Username already exist!!!!')
    }
    const hashPassword = bcrypt.hashSync(password, 10)
    console.log(hashPassword)

    const result = await prisma.user.create({
      data:{
        username,
        password:hashPassword,
      }
    })
    res.json({message:`Register user Successfully`})
  } catch (error) {
    next(error)
  }
}


export const loginDoctor = async (req, res, next)=>{
  try {
    const {username, password} = req.body

    const doctor = await prisma.doctor.findFirst({
      where:{
        username,
      }
    })
    console.log(doctor)
    if(!doctor) {
      createError(400,'Username or Password is invalid!!!')
    }

    const checkPassword = bcrypt.compareSync(password, doctor.password)
    if(!checkPassword) {
      createError(400,'Username or Password is invalid!!!')
    }

    const payload = {
      id: doctor.id,
      username: doctor.username
    }
    const token = jwt.sign(payload, process.env.SECRET,{expiresIn:'1d'})
    res.json({message:`Welcome back ${doctor.username}`, payload: payload, token: token})


    res.json({message:`Login doctor Successfully`})
  } catch (error) {
    next(error)
  }
}

export const loginUser = async (req, res, next)=>{
  try {
    const {username, password} = req.body

    const user = await prisma.user.findFirst({
      where:{
        username,
      }
    })
    console.log(user)
    if(!user) {
      createError(400,'Username or Password is invalid!!!')
    }

    const checkPassword = bcrypt.compareSync(password, user.password)
    if(!checkPassword) {
      createError(400,'Username or Password is invalid!!!')
    }

    const payload = {
      id: user.id,
      username: user.username
    }
    const token = jwt.sign(payload, process.env.SECRET,{expiresIn:'1d'})
    res.json({message:`Welcome back ${user.username}`, payload: payload, token: token})


    res.json({message:`Login doctor Successfully`})
  } catch (error) {
    next(error)
  }
}