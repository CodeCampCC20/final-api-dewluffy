import prisma from "../config/prisma.js";

export const getMe = async (req, res, next) => {
  try {
    const {id} = req.username
    console.log(id)
    const user = await prisma.user.findFirst({
      where: {
        id: Number(id)
      },
      omit:{
        password:true
      }
    })

    res.json({
      result: user,
      message: "This is Doctor"
    })
  } catch (error) {
    next(error)
  }
}

export const updateUsernameSpecialization = async (req, res, next) => {
  try {
    const { id } = req.username
    const { username } = req.body
    const user = await prisma.user.update({
      where:{
        id: Number(id),
      },
      data:{
        username:username,
      },
       omit:{
        password:true
      }
    })
    res.json({message:user})
  } catch (error) {
    next(error)
  }
}