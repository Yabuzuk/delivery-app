import React, { useState } from 'react';
import { MapPin, Package } from 'lucide-react';
import BackButton from '../components/BackButton';

const CreateOrder = () => {
  const [order, setOrder] = useState({
    from: '',
    to: '',
    weight: '',
    description: '',
    price: '',
    deadline: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = { ...order, id: Date.now(), status: 'active' };
    
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(existingOrders));
    
    alert('Заказ создан успешно!');
    setOrder({ from: '', to: '', weight: '', description: '', price: '', deadline: '' });
  };

  return (
    <div>
      <BackButton />
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <Package size={48} style={{ color: '#667eea', marginBottom: '16px' }} />
        <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Создать заказ</h2>
        <p style={{ color: '#666' }}>Заполните детали для отправки посылки</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Откуда</label>
          <input
            type="text"
            placeholder="Город отправления"
            value={order.from}
            onChange={(e) => setOrder({...order, from: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Куда</label>
          <input
            type="text"
            placeholder="Город назначения"
            value={order.to}
            onChange={(e) => setOrder({...order, to: e.target.value})}
            required
          />
        </div>

        <div className="grid-2-cols">
          <div className="form-group">
            <label>Вес (кг)</label>
            <input
              type="number"
              placeholder="0.5"
              value={order.weight}
              onChange={(e) => setOrder({...order, weight: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Вознаграждение (₽)</label>
            <input
              type="number"
              placeholder="500"
              value={order.price}
              onChange={(e) => setOrder({...order, price: e.target.value})}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Описание посылки</label>
          <input
            type="text"
            placeholder="Документы, сувениры..."
            value={order.description}
            onChange={(e) => setOrder({...order, description: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Срок доставки</label>
          <input
            type="date"
            value={order.deadline}
            onChange={(e) => setOrder({...order, deadline: e.target.value})}
            required
          />
        </div>

        <button type="submit" className="btn" style={{ width: '100%', fontSize: '18px' }}>
          Создать заказ
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;