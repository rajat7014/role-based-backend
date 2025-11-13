import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import { generateToken } from '../utils/generateToken.js'

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    const userExists = await User.findOne({ email })
    if (userExists)
      return res.status(400).json({ message: 'Email already exists' })

    const hash = await bcrypt.hash(password, 10)

    const user = await User.create({ name, email, password: hash, role })

    return res.json({
      message: 'Signup successful',
      user,
      token: generateToken(user),
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Incorrect password' })

    return res.json({
      message: 'Login successful',
      user,
      token: generateToken(user),
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const me = async (req, res) => {
  res.json(req.user)
}
