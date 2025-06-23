import prisma from "../config/prisma.js";

export const getMe = async (req, res, next) => {
  try {
    const {id} = req.username
    console.log(id)
    const doctor = await prisma.doctor.findFirst({
      where: {
        id: Number(id)
      },
      omit:{
        password:true
      }
    })

    res.json({
      result: doctor,
      message: "This is Doctor"
    })
  } catch (error) {
    next(error)
  }
}

export const updateUsernameSpecialization = async (req, res, next) => {
  try {
    const { id } = req.username
    const { username, specialization } = req.body
    const doctor = await prisma.doctor.update({
      where:{
        id: Number(id),
      },
      data:{
        username:username,
        specialization:specialization,
      },
       omit:{
        password:true
      }
    })
    res.json({message:doctor})
  } catch (error) {
    next(error)
  }
}