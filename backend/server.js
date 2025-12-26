const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Временное хранилище данных
let orders = [];
let trips = [
  {
    id: 1,
    from: 'Москва',
    to: 'Санкт-Петербург',
    transport: 'plane',
    date: '2024-01-15',
    weight: '2 кг',
    price: '800 ₽',
    description: 'Документы'
  },
  {
    id: 2,
    from: 'Екатеринбург',
    to: 'Новосибирск',
    transport: 'train',
    date: '2024-01-18',
    weight: '1.5 кг',
    price: '600 ₽',
    description: 'Сувениры'
  }
];

// API маршруты
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const order = {
    id: Date.now(),
    ...req.body,
    status: 'active',
    createdAt: new Date()
  };
  orders.push(order);
  res.json(order);
});

app.get('/api/trips', (req, res) => {
  res.json(trips);
});

app.post('/api/trips/take/:id', (req, res) => {
  const tripId = parseInt(req.params.id);
  const trip = trips.find(t => t.id === tripId);
  
  if (trip) {
    trip.status = 'taken';
    res.json({ message: 'Заказ принят', trip });
  } else {
    res.status(404).json({ error: 'Заказ не найден' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});