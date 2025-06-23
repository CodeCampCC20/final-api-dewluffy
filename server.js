import express from 'express'
import authRouter from './routes/auth.js'
import morgan from 'morgan'
import error from './utils/errors.js'
import notFound from './utils/notFound.js'
import doctorRouter from './routes/doctor.js'
import userRouter from './routes/user.js'


const app = express()
const PORT = 8000
app.use(express.json())
app.use(morgan('dev'))

//http://localhost:8000

app.use('/auth', authRouter)
app.use('/doctor', doctorRouter)
app.use('/user', userRouter)


app.use(error)

app.use(notFound)




app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`))
