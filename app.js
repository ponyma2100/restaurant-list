const express = require('express')
const restaurantList = require('./restaurant.json')
const port = 3000
const app = express()
const exhbs = require('express-handlebars')

app.engine('handlebars', exhbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  // console.log(req.params.restaurant_id)
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  // console.log('req.query', req.query.keyword)
  const keyword = req.query.keyword
  const retaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: retaurants })
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})