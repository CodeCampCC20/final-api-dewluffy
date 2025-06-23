import { object, ref, string } from "yup";

export const registerSchema = object({
  username: string().min(4,"Username ต้องมากกว่า 4 อักขระ").required("กรุณากรอก Username"),
  password: string().min(6,"Password ต้องมากกว่า 6 อักขระ").required("กรุณากรอก Password"),
  confirmPassword: string().oneOf([ref('password'),null],"Confirm Password ไม่ตรงกัน")
})

export const loginSchema = object({
  username: string().min(4,"Username ต้องมากกว่า 4 อักขระ").required("กรุณากรอก Username"),
  password: string().min(6,"Password ต้องมากกว่า 6 อักขระ").required("กรุณากรอก Password")
})

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, {abortEarly: false})
    next()
  } catch (error) {
    console.log(error)
    const errMsg = error.errors.map((item)=> item)
    const errTxt = errMsg.join(',')
    const mergeErr = new Error(errTxt)
    next(mergeErr)
    
  }
}