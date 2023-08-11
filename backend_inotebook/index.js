const connectToMongo = require('./db')

connectToMongo();
const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello Aniket!')
})

//When you go through /api/auth and /api/notes in url
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})


// How I post user schema 
/**
// How I post user schema 
 * 
 */