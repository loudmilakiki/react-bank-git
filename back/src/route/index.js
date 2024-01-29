// const express = require('express')
// const bodyParser = require('body-parser')
// const cors = require('cors')

// const app = express()
// const router = express.Router()
// const port = 3001 // Порт вашего сервера

// // Парсинг JSON-тела запросов

// app.use(bodyParser.json())
// app.use(cors())
// app.options('*', cors())

// const users = []

// const signup = (email, password) => {
//   console.log(users)

//   const existingUser = users.find(
//     (user) => user.email === email,
//   )

//   if (existingUser) {
//     return {
//       success: false,
//       message: 'Користувач з таким email вже існує',
//     }
//   }

//   const newUser = {
//     email,
//     password,
//     confirmed: false,
//     transaction: [],
//     balance: 0,
//     notifications: [],
//   }
//   users.push(newUser)

//   return {
//     success: true,
//     message: 'Реєстрація пройшла успішно',
//   }
// }

// const signin = (email, password) => {
//   const user = users.find(
//     (u) => u.email === email && u.password === password,
//   )

//   if (!user) {
//     return {
//       success: false,
//       message: 'Error email and password',
//     }
//   }

//   if (!user.confirmed) {
//     return {
//       success: false,
//       message: 'Подтвердите регистрацию на вашем email',
//     }
//   }

//   // addNotification('New Login', email)

//   return {
//     success: true,
//     message: 'Вход в систему успешен',
//     user,
//   }
// }

// const recovery = (email) => {
//   const existingUser = users.find(
//     (user) => user.email === email,
//   )

//   if (!existingUser) {
//     return {
//       success: false,
//       message: 'Пользователя с таким email не существует',
//     }
//   }
// }

// const changeEmail = (newEmail, oldEmail, password) => {
//   const existingUser = users.find(
//     (user) => user.email === newEmail,
//   )

//   if (existingUser) {
//     return {
//       success: false,
//       message: 'Пользователь с таким email уже существует',
//     }
//   }

//   const user = users.find(
//     (u) => u.email === oldEmail && u.password === password,
//   )

//   if (!user) {
//     return {
//       success: false,
//       message: 'Неверный пароль',
//     }
//   }

//   user.email = newEmail

//   // addNotification('Email has been changed', newEmail)

//   return {
//     success: true,
//     message: 'Электронная почта изменена успешно',
//   }
// }

// const changePassword = (
//   email,
//   oldPassword,
//   newPassword,
// ) => {
//   const user = users.find(
//     (u) => u.email === email && u.password === oldPassword,
//   )

//   if (!user) {
//     return {
//       success: false,
//       message: 'Неверный пароль',
//     }
//   }

//   user.password = newPassword

//   // addNotification('password has been changed', email)

//   return {
//     success: true,
//     message: 'Пароль изменен успешно',
//   }
// }

// const getBalance = (email) => {
//   const user = users.find((u) => u.email === email)

//   return user ? user.balance : null
// }

// const confirmRecovery = (email, password) => {
//   const user = users.find(
//     (u) => u.email === email && u.password === password,
//   )

//   if (!user || !user.confirmed) {
//     return false // Пользователь не найден
//   }

//   user.confirmed = true // Установите флаг подтверждения аккаунта в true

//   return true // Подтверждение успешно
// }

// // Генерация кода подтверждения
// const generateConfirmationCode = () => {
//   // Здесь можно использовать какой-то механизм генерации кода
//   return Math.floor(
//     100000 + Math.random() * 900000,
//   ).toString()
// }

// // Роут для обработки запросов регистрации
// // router.post('/api/signup', (req, res) => {
// //   console.log('Request body:', req.body)
// //   const { email, password } = req.body

// //   try {
// //     const existingUser = users.find(
// //       (user) => user.email === email,
// //     )
// //     if (existingUser) {
// //       return res.status(400).json({
// //         message: 'Користувач з таким email вже існує',
// //       })
// //     }
// //     const signupResult = signup(email, password)

// //     if (signupResult.success) {
// //       return res.status(200).json({
// //         message: signupResult.message,
// //       })
// //     } else {
// //       console.log(signupResult.message)
// //       return res.status(400).json({
// //         message: signupResult.message,
// //       })
// //     }
// //   } catch (e) {
// //     return res.status(400).json({
// //       message: e.message,
// //     })
// //   }
// // })

// router.post('/api/signup', (req, res) => {
//   const { email, password } = req.body

//   try {
//     const existingUser = users.find(
//       (user) => user.email === email,
//     )

//     if (existingUser) {
//       return res.status(400).json({
//         message:
//           'Пользователь с таким email уже существует',
//       })
//     }

//     const signupResult = signup(email, password)

//     if (signupResult.success) {
//       // Успешная регистрация - удаляем пользователя из массива
//       const newUser = {
//         email,
//         password,
//         confirmed: false,
//         transaction: [],
//         balance: 0,
//         notifications: [],
//       }
//       users.push(newUser)

//       return res.status(200).json({
//         message: signupResult.message,
//       })
//     } else {
//       console.log(signupResult.message)
//       return res.status(400).json({
//         message: signupResult.message,
//       })
//     }
//   } catch (e) {
//     return res.status(400).json({
//       message: e.message,
//     })
//   }
// })
// // Пример обработчика запроса для входа
// router.post('/api/signin', (req, res) => {
//   const { email, password } = req.body

//   const signinResult = signin(email, password)

//   if (signinResult.success) {
//     return res.status(200).json({
//       message: signinResult.message,
//       user: signinResult.user,
//     })
//   } else {
//     return res
//       .status(400)
//       .json({ message: signinResult.message })
//   }
// })

// // Пример обработчика запроса для восстановления пароля
// router.post('/api/recovery', (req, res) => {
//   const { email } = req.body

//   const recoveryResult = recovery(email)

//   if (recoveryResult.success) {
//     return res
//       .status(200)
//       .json({ message: recoveryResult.message })
//   } else {
//     return res
//       .status(400)
//       .json({ message: recoveryResult.message })
//   }
// })

// // Пример обработчика запроса для изменения электронной почты
// router.post('/api/change-email', (req, res) => {
//   const { newEmail, oldEmail, password } = req.body

//   const changeEmailResult = changeEmail(
//     newEmail,
//     oldEmail,
//     password,
//   )

//   if (changeEmailResult.success) {
//     return res
//       .status(200)
//       .json({ message: changeEmailResult.message })
//   } else {
//     return res
//       .status(400)
//       .json({ message: changeEmailResult.message })
//   }
// })

// // Пример обработчика запроса для получения баланса
// router.post('/api/get-balance', (req, res) => {
//   const { email } = req.body

//   const balance = getBalance(email)

//   if (balance !== null) {
//     return res.status(200).json({ balance })
//   } else {
//     return res
//       .status(400)
//       .json({ message: 'Пользователь не найден' })
//   }
// })

// // Пример обработчика запроса для изменения пароля
// router.post('/api/change-password', (req, res) => {
//   const { email, oldPassword, newPassword } = req.body

//   const changePasswordResult = changePassword(
//     email,
//     oldPassword,
//     newPassword,
//   )

//   if (changePasswordResult.success) {
//     return res
//       .status(200)
//       .json({ message: changePasswordResult.message })
//   } else {
//     return res
//       .status(400)
//       .json({ message: changePasswordResult.message })
//   }
// })

// // Подключение роутера к приложению
// app.use('/', router)

// // Запуск сервера
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`)
// })

// app.on('error', (err) => {
//   console.error('Server error:', err.message)
// })

// router.post('/api/signup-confirm', (req, res) => {
//   console.log('Request body:', req.body)
//   const { email, password, confirmationCode } = req.body

//   try {
//     const recoveryConfirmResult = confirmRecovery(
//       email,
//       password,
//       confirmationCode,
//     )

//     if (!recoveryConfirmResult) {
//       console.log(users)
//       return res.status(200).json({})
//     } else {
//       return res.status(400).json({
//         message: 'Користувача з таким емейл не існує',
//       })
//     }
//   } catch (e) {
//     return res.status(400).json({
//       message: e.message,
//     })
//   }

//   // Ваша логика подтверждения аккаунта

//   // Пример успешного подтверждения
// })

// router.post('/api/receive', (req, res) => {
//   // Логика обработки запроса на получение
//   res
//     .status(200)
//     .json({ message: 'Data received successfully' })
// }) /
//   router.post(
//     '/api/transaction/:transactionId',
//     (req, res) => {
//       const { transactionId } = req.params

//       // Здесь должна быть логика для получения данных транзакции
//       // Например, вам нужно обратиться к базе данных, чтобы получить данные
//       // Или использовать какой-то другой источник данных

//       // Ваш код обработки транзакции
//       const transactionData = {
//         amount: 100, // Замените на фактические данные
//         date: '25 May', // Замените на фактические данные
//         address: 'user123@mail.com', // Замените на фактические данные
//         type: 'receive', // Замените на фактические данные
//       }

//       res.status(200).json(transactionData)
//     },
//   )

// router.get('/api/transactions', (req, res) => {
//   // Здесь должна быть логика для получения списка всех транзакций
//   // Например, запрос к базе данных или использование другого источника данных

//   // Пример ответа со списком транзакций (замените на свою логику)
//   const transactionsData = [
//     {
//       id: 1,
//       amount: 50,
//       date: '26 May',
//       address: 'user456@mail.com',
//       type: 'send',
//     },
//     {
//       id: 2,
//       amount: 75,
//       date: '27 May',
//       address: 'user789@mail.com',
//       type: 'receive',
//     },
//     // Добавьте остальные транзакции
//   ]

//   res.status(200).json(transactionsData)
// })

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const router = express.Router()
const port = 3001 // Порт вашего сервера

// Парсинг JSON-тела запросов
app.use(bodyParser.json())
app.use(cors())
app.options('*', cors())

const users = []

const signup = (email, password) => {
  console.log(users)

  const existingUser = users.find(
    (user) => user.email === email,
  )

  if (existingUser) {
    return {
      success: false,
      message: 'Користувач з таким email вже існує',
    }
  }

  const confirmationCode = generateConfirmationCode()

  const newUser = {
    email,
    password,
    confirmed: false,
    confirmationCode,
    transaction: [],
    balance: 0,
    notifications: [],
  }
  users.push(newUser)

  return {
    success: true,
    message: 'Реєстрація пройшла успішно',
    confirmationCode,
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
    user,
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
  const user = users.find(
    (u) =>
      u.email === email &&
      u.password === password &&
      u.confirmationCode === confirmationCode,
  )

  if (user && !user.confirmed) {
    user.confirmed = true
    return true // Подтверждение успешно
  }

  return false // Пользователь не найден, подтверждение неуспешно или уже подтвержден
}

// Генерация кода подтверждения
const generateConfirmationCode = () => {
  // Здесь можно использовать какой-то механизм генерации кода
  return Math.floor(
    100000 + Math.random() * 900000,
  ).toString()
}

router.get('/api/transaction', (req, res) => {
  const { paymentMethod } = req.query

  try {
    // Здесь должен быть ваш код для получения транзакций
    // Используйте параметр paymentMethod, чтобы фильтровать транзакции по методу оплаты
    // Например, запрос в базу данных или другой источник данных
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

// Допустим, у вас есть функция для получения транзакций
const getTransactions = (paymentMethod) => {
  // Здесь может быть ваш код для получения транзакций
  // Используйте параметр paymentMethod, чтобы фильтровать транзакции по методу оплаты
  // Например, запрос в базу данных или другой источник данных
  return transactions
}

// Роут для обработки запросов регистрации
router.post('/api/signup', (req, res) => {
  const { email, password } = req.body

  res
    .status(200)
    .json({ message: 'User registered successfully' })

  try {
    const existingUser = users.find(
      (user) => user.email === email,
    )

    if (existingUser) {
      return res.status(400).json({
        message:
          'Пользователь с таким email уже существует',
      })
    }

    const signupResult = signup(email, password)

    if (signupResult.success) {
      // Успешная регистрация - удаляем пользователя из массива
      const newUser = {
        email,
        password,
        confirmed: false,
        transaction: [],
        balance: 0,
        notifications: [],
      }
      users.push(newUser)

      return res.status(200).json({
        message: signupResult.message,
      })
    } else {
      console.log(signupResult.message)
      return res.status(400).json({
        message: signupResult.message,
      })
    }
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    })
  }
})

// Пример обработчика запроса для входа
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

// Пример обработчика запроса для восстановления пароля
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

// Пример обработчика запроса для изменения электронной почты
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

// Пример обработчика запроса для получения баланса
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

// Пример обработчика запроса для изменения пароля
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

// Роут для подтверждения регистрации
router.post('/api/signup-confirm', (req, res) => {
  console.log('Request body:', req.body)
  const { email, password, confirmationCode } = req.body

  try {
    const recoveryConfirmResult = confirmRecovery(
      email,
      password,
      confirmationCode,
    )

    if (!recoveryConfirmResult) {
      console.log(users)
      return res
        .status(200)
        .json({ message: 'Подтверждение успешно' })
    } else {
      return res.status(400).json({
        message: 'Користувача з таким емейл не існує',
      })
    }
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    })
  }
})

// Подключение роутера к приложению
app.use('/api', router)

// Запуск сервера
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
