const express = require('express')
const cors = require('cors')

const app = express()
const router = express.Router()
const port = 3001 // Порт сервера
const bcrypt = require('bcrypt')

let confirmationCode

app.use(cors())
app.options('*', cors())

const { User } = require('../class/user')

User.create({
  email: 'test@mail.com',
  password: 123456789,
})

const users = []

const signup = (email, password, confirmPassword) => {
  // Перевірка, чи вже існує користувач з таким email
  console.log(users)
  const existingUser =
    users && users.find((user) => user.email === email)

  if (existingUser) {
    return {
      success: false,
      message: 'Користувач з таким email вже існує',
    }
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      message:
        'Пароль та підтвердження паролю не співпадають',
    }
  }

  const confirmationCode = generateConfirmationCode()
  console.log('Confirmation Code:', confirmationCode)

  const hashedPassword = bcrypt.hashSync(password, 10)

  // Створення нового користувача
  const transactions = [
    {
      id: 2,
      type: 'Sending',
      amount: -30,
      recipient: 'John Doe',
      time: '2023-11-17T14:45:00',
    },
    {
      id: 1,
      type: 'Receipt',
      amount: 1250,
      paymentSystem: 'Stripe',
      time: '2023-11-16T10:30:00',
    },
  ]

  // const confirmationCode = generateConfirmationCode()
  // console.log('Confirmation Code:', confirmationCode)

  const newUser = {
    email,
    password: hashedPassword,
    confirm: false,
    transactions,
    balance: 0,
    notifications: [],
    confirmationCode,
  }
  users.push(newUser)

  console.log('New user:', newUser)

  return {
    success: true,
    message: 'Реєстрація пройшла успішно',
  }
}

const signin = (email, password) => {
  const user = users.find(
    (u) => u.email === email && u.password === password,
  )

  if (!user) {
    return {
      success: false,
      message: 'Error email and password',
    }
  }

  if (!user.confirmed) {
    return {
      success: false,
      message: 'Подтвердите регистрацию на вашем email',
    }
  }

  // addNotification('New Login', email)

  return {
    success: true,
    message: 'Вход в систему успешен',
  }
}

const recovery = (email) => {
  const existingUser = users.find(
    (user) => user.email === email,
  )

  if (!existingUser) {
    return {
      success: false,
      message: 'Пользователя с таким email не существует',
    }
  }
}

const changeEmail = (newEmail, oldEmail, password) => {
  const existingUser = users.find(
    (user) => user.email === newEmail,
  )

  if (existingUser) {
    return {
      success: false,
      message: 'Пользователь с таким email уже существует',
    }
  }

  const user = users.find(
    (u) => u.email === oldEmail && u.password === password,
  )

  if (!user) {
    return {
      success: false,
      message: 'Неверный пароль',
    }
  }

  user.email = newEmail

  // addNotification('Email has been changed', newEmail)

  return {
    success: true,
    message: 'Электронная почта изменена успешно',
    user: user,
  }
}

const changePassword = (
  email,
  oldPassword,
  newPassword,
) => {
  const user = users.find(
    (u) => u.email === email && u.password === oldPassword,
  )

  if (!user) {
    return {
      success: false,
      message: 'Неверный пароль',
    }
  }

  user.password = newPassword

  // addNotification('password has been changed', email)

  return {
    success: true,
    message: 'Пароль изменен успешно',
  }
}

const getBalance = (email) => {
  const user = users.find((u) => u.email === email)

  return user ? user.balance : null
}

const confirmRecovery = (
  email,
  password,
  confirmationCode,
) => {
  console.log('Confirm Recovery Data:', {
    email,
    password,
    confirmationCode,
  })
  console.log('Users:', users)

  const user = users.find(
    (u) =>
      u.email === email &&
      bcrypt.compareSync(password, u.password) &&
      u.confirmationCode === confirmationCode,
  )
  console.log('User found for confirmation:', user)

  if (user && !user.confirmed) {
    user.confirmed = true
    return true
  }

  return false
}

const generateConfirmationCode = () => {
  return Math.floor(
    100000 + Math.random() * 900000,
  ).toString()
}

router.get('/api/transaction', (req, res) => {
  const { paymentMethod } = req.query

  try {
    const transactions = getTransactions(paymentMethod)

    if (transactions !== null) {
      return res.status(200).json({ transactions })
    } else {
      return res
        .status(404)
        .json({ message: 'Транзакции не найдены' })
    }
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return res
      .status(500)
      .json({ message: 'Internal Server Error' })
  }
})

const getTransactions = (paymentMethod) => {
  х
  return transaction
}

//Роут для обработки запросов регистрации
router.post('/api/signup', (req, res) => {
  const {
    email,
    password,
    confirmPassword,
    confirmationCode,
  } = req.body
  console.log(req.body)

  console.log('Existing Users:', users)

  if (
    !email ||
    !password ||
    !confirmPassword ||
    !confirmationCode
  ) {
    return res.status(400).json({
      message: 'Email, password are required',
    })
  }

  try {
    // User.create({ email, password })

    return res.status(200).json({
      message: 'User registered successfully',
    })
    //   const existingUser = users.find(
    //     (user) => user.email === email,
    //   )

    //   if (existingUser) {
    //     return res.status(400).json({
    //       message:
    //         'Пользователь с таким email уже существует',
    //     })
    //   }

    //   const signupResult = signup(
    //     email,
    //     password,
    //     confirmPassword,
    //     confirmationCode,
    //   )

    //   if (signupResult.success) {
    //     const newUser = {
    //       email,
    //       password,
    //       confirmed: false,
    //       transaction: [],
    //       balance: 0,
    //       notifications: [],
    //     }
    //     users.push(newUser)

    //     return res.json({
    //       message: signupResult.message,
    //       redirect: '/signup-confirm',
    //     })

    //     // return res.status(200).json({
    //     //   message: signupResult.message,
    //     // })
    //   } else {
    //     console.log(signupResult.message)
    //     return res.status(400).json({
    //       message: signupResult.message,
    //     })
    //   }
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})
module.exports = signup

router.post('/api/signin', (req, res) => {
  const { email, password } = req.body

  const signinResult = signin(email, password)

  if (signinResult.success) {
    return res.status(200).json({
      message: signinResult.message,
      user: signinResult.user,
    })
  } else {
    return res
      .status(400)
      .json({ message: signinResult.message })
  }
})

router.post('/api/recovery', (req, res) => {
  const { email } = req.body

  const recoveryResult = recovery(email)

  if (recoveryResult.success) {
    return res
      .status(200)
      .json({ message: recoveryResult.message })
  } else {
    return res
      .status(400)
      .json({ message: recoveryResult.message })
  }
})

router.post('/api/change-email', (req, res) => {
  const { newEmail, oldEmail, password } = req.body

  const changeEmailResult = changeEmail(
    newEmail,
    oldEmail,
    password,
  )

  if (changeEmailResult.success) {
    return res
      .status(200)
      .json({ message: changeEmailResult.message })
  } else {
    return res
      .status(400)
      .json({ message: changeEmailResult.message })
  }
})

router.post('/api/get-balance', (req, res) => {
  const { email } = req.body

  const balance = getBalance(email)

  if (balance !== null) {
    return res.status(200).json({ balance })
  } else {
    return res
      .status(400)
      .json({ message: 'Пользователь не найден' })
  }
})

router.post('/api/change-password', (req, res) => {
  const { email, oldPassword, newPassword } = req.body

  const changePasswordResult = changePassword(
    email,
    oldPassword,
    newPassword,
  )

  if (changePasswordResult.success) {
    return res
      .status(200)
      .json({ message: changePasswordResult.message })
  } else {
    return res
      .status(400)
      .json({ message: changePasswordResult.message })
  }
})

router.post('/api/signup-confirm', (req, res) => {
  console.log('Request body:', req.body) // Отладочная информация

  const { confirmationCode, email } = req.body

  console.log('Received data:', {
    confirmationCode,
  })

  console.log('Confirmation Code:', confirmationCode)

  if (!confirmationCode) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  try {
    const signupConfirm = confirmRecovery(
      email,
      null,
      confirmationCode,
    )

    if (signupConfirm) {
      console.log(users)

      return res
        .status(200)
        .json({ message: 'Подтверждение успешно' })
    } else {
      return res.status(400).json({
        message: 'Користувача з таким емейл не існує',
      })
    }
  } catch (err) {
    console.error('Error during signup confirmation:', err)
    return res.status(400).json({
      message: err.message,
    })
  }
})

app.use('/api', router)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

app.on('error', (err) => {
  console.error('Server error:', err.message)
})

router.get('/', (req, res) => {
  res.status(200).json('Hello World')
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something went wrong!')
})
// Експортуємо глобальний роутер
module.exports = router
