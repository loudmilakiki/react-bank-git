// // Підключаємо роутер до бек-енду
// const express = require('express')
// const router = express.Router()

// // Підключіть файли роутів
// // const test = require('./test')
// // Підключіть інші файли роутів, якщо є

// // Об'єднайте файли роутів за потреби
// // router.use('/', test)
// // Використовуйте інші файли роутів, якщо є

// // router.get('/', (req, res) => {
// //   res.status(200).json('Hello World')
// // })

// // Експортуємо глобальний роутер
// module.exports = router

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const router = express.Router()
const port = 3001 // Порт вашего сервера

// Парсинг JSON-тела запросов
app.use(cors())
app.use(bodyParser.json())
app.options('*', cors())

// Роут для обработки запросов регистрации
router.post('/api/signup', (req, res) => {
  const { email, password } = req.body

  // Ваша логика регистрации пользователя и проведения необходимых проверок

  // Пример простой обработки успешной регистрации
  res
    .status(200)
    .json({ message: 'User registered successfully' })
})

// Подключение роутера к приложению
app.use('/', router)

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

app.on('error', (err) => {
  console.error('Server error:', err.message)
})

router.post('/api/confirm-account', (req, res) => {
  const { confirmationCode } = req.body

  // Ваша логика подтверждения аккаунта

  // Пример успешного подтверждения
  res
    .status(200)
    .json({ message: 'Account confirmed successfully' })
})

router.post('/api/receive', (req, res) => {
  // Логика обработки запроса на получение
  res
    .status(200)
    .json({ message: 'Data received successfully' })
})

// app.use('/', router)

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`)
// })

// app.on('error', (err) => {
//   console.error('Server error:', err.message)
// })

// Підключіть файли роутів
// const test = require('./test')
// Підключіть інші файли роутів, якщо є

// Об'єднайте файли роутів за потреби
// router.use('/', test)
// Використовуйте інші файли роутів, якщо є

router.get('/', (req, res) => {
  res.status(200).json('Hello World')
})

// Експортуємо глобальний роутер
module.exports = router
