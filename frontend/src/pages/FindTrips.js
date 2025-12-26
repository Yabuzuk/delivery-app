import React, { useState, useEffect } from 'react';
import { Plane, Car, Train, MapPin, Clock, DollarSign } from 'lucide-react';
import YandexMap from '../components/YandexMap';
import BackButton from '../components/BackButton';

const FindTrips = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders.filter(order => order.status === 'active'));
  }, []);

  const takeOrder = (orderId) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: 'taken' } : order
    );
    
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const finalOrders = allOrders.map(order => 
      order.id === orderId ? { ...order, status: 'taken' } : order
    );
    
    localStorage.setItem('orders', JSON.stringify(finalOrders));
    setOrders(updatedOrders.filter(order => order.status === 'active'));
    
    alert('Заказ принят!');
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
    <div>
      <BackButton />
      <div className="card" style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Доступные заказы</h2>
        <p style={{ color: '#666' }}>Выберите заказ по вашему маршруту</p>
      </div>

      <div className="card" style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px', textAlign: 'center' }}>Карта заказов</h3>
        <YandexMap routes={orders} />
      </div>

      <div className="grid-responsive">
        {orders.map(order => (
          <div key={order.id} className="card" style={{
            border: '2px solid #f0f0f0',
            transition: 'all 0.3s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.target.style.borderColor = '#667eea'}
          onMouseLeave={(e) => e.target.style.borderColor = '#f0f0f0'}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={20} style={{ color: '#667eea' }} />
                <span style={{ fontWeight: '600', color: '#667eea' }}>
                  Доставка
                </span>
              </div>
              <span style={{
                background: '#667eea',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '16px',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                {order.price} ₽
              </span>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <MapPin size={16} style={{ color: '#667eea' }} />
                <span style={{ fontWeight: '600' }}>{order.from} → {order.to}</span>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <Clock size={16} style={{ color: '#666' }} />
                <span style={{ color: '#666' }}>{order.deadline}</span>
              </div>
            </div>

            <div style={{
              background: '#f8f9fa',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '16px'
            }}>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                Вес: {order.weight} кг
              </p>
              <p style={{ fontSize: '14px', color: '#666' }}>
                {order.description}
              </p>
            </div>

            <button 
              className="btn" 
              style={{ width: '100%' }}
              onClick={() => takeOrder(order.id)}
            >
              Взять заказ
            </button>
          </div>
        ))}
        
        {orders.length === 0 && (
          <div className="card" style={{ textAlign: 'center', gridColumn: '1 / -1' }}>
            <p style={{ color: '#666', fontSize: '18px' }}>
              Пока нет доступных заказов. Создайте первый заказ!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindTrips;