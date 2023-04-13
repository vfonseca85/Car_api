const express = require('express')
const cors = require('cors')
const cars = require('./cars.json')


const app = express()
app.use(express.json())
app.use(cors())


app.get('/cars', (req, res) => {
  res.send(cars)
})

app.get('./cars/:id', (req, res) => {
  res.send(req.body.id)
})

app.post('./cars', (req, res) => {

    const ids = cars.map(car => car.id);
    let maxId = Math.max(...ids);

    const car_ = cars(car => car.id === req.body.id)
    if(car_ !== undefined){
        res.status(409).send({error: "Car already exists"})
    }else{
        maxId+=1;
        const newCar = req.body
        newCar.id = maxId
        cars.push(newCar)
        res.status(201).send(newCar)
    }
})


app.patch("./cars/:id", (req, res) => {
  const car_ = cars.find(car => car.id === req.params.id);

  if (car_ === undefined) {
    return res.status(404).send({error: "Car does not exist"})
  }

  try {
    const updatedCar = { ...req.body, id: cars.id}

    const idx = car.findIndex(c => c.id === car.id);
    console.log(idx)
    cars[idx] = updatedCar;
    console.log(cars[idx])
    res.send(updatedCar)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.delete("./cars/:id", (req, res) => {

  const id = req.params.id;

  const carIndex = cars.findIndex(car => car.id === id);

  if (carIndex === -1) {
    res.status(404).send({ error: "This car does not exist" })
  } else {
    cars.splice(carIndex, 1);

    res.status(204).send()
  }
})


module.exports = app;
