import React, { useState } from 'react';
import { Plane, Car, Train } from 'lucide-react';

const CreateTrip = () => {
  const [trip, setTrip] = useState({
    from: '',
    to: '',
    transport: 'car',
    date: '',
    maxWeight: '',
    price: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTrip = { ...trip, id: Date.now(), status: 'available' };
    
    const existingTrips = JSON.parse(localStorage.getItem('trips') || '[]');
    existingTrips.push(newTrip);
    localStorage.setItem('trips', JSON.stringify(existingTrips));
    
    alert('Заявка курьера создана успешно!');
    setTrip({ from: '', to: '', transport: 'car', date: '', maxWeight: '', price: '', description: '' });
  };

  const getTransportIcon = (transport) => {
    switch(transport) {
      case 'plane': return <Plane size={20} />;
      case 'train': return <Train size={20} />;
      case 'car': return <Car size={20} />;
      default: return <Car size={20} />;
    }
  };

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        {getTransportIcon(trip.transport)}
        <h2 style={{ fontSize: '28px', marginBottom: '8px', marginTop: '16px' }}>Создать поездку</h2>
        <p style={{ color: '#666' }}>Предложите свои услуги доставки</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Откуда</label>
          <input
            type="text"
            placeholder="Город отправления"
            value={trip.from}
            onChange={(e) => setTrip({...trip, from: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Куда</label>
          <input
            type="text"
            placeholder="Город назначения"
            value={trip.to}
            onChange={(e) => setTrip({...trip, to: e.target.value})}
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="form-group">
            <label>Транспорт</label>
            <select
              value={trip.transport}
              onChange={(e) => setTrip({...trip, transport: e.target.value})}
              required
            >
              <option value="car">Автомобиль</option>
              <option value="plane">Самолет</option>
              <option value="train">Поезд</option>
            </select>
          </div>

          <div className="form-group">
            <label>Дата поездки</label>
            <input
              type="date"
              value={trip.date}
              onChange={(e) => setTrip({...trip, date: e.target.value})}
              required
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="form-group">
            <label>Макс. вес (кг)</label>
            <input
              type="number"
              placeholder="5"
              value={trip.maxWeight}
              onChange={(e) => setTrip({...trip, maxWeight: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Цена за кг (₽)</label>
            <input
              type="number"
              placeholder="100"
              value={trip.price}
              onChange={(e) => setTrip({...trip, price: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Дополнительная информация</label>
          <input
            type="text"
            placeholder="Особые условия, ограничения..."
            value={trip.description}
            onChange={(e) => setTrip({...trip, description: e.target.value})}
          />
        </div>

        <button type="submit" className="btn" style={{ width: '100%', fontSize: '18px' }}>
          Создать заявку курьера
        </button>
      </form>
    </div>
  );
};

export default CreateTrip;