import React, { useState, useEffect } from 'react';
import { Package, Plane, Car, Train, MapPin, Clock, CheckCircle } from 'lucide-react';
import BackButton from '../components/BackButton';

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [myTrips, setMyTrips] = useState([]);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const trips = JSON.parse(localStorage.getItem('trips') || '[]');
    
    setMyOrders(orders);
    setMyTrips(trips);
  }, []);

  const getTransportIcon = (transport) => {
    switch(transport) {
      case 'plane': return <Plane size={20} />;
      case 'train': return <Train size={20} />;
      case 'car': return <Car size={20} />;
      default: return <Package size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return '#667eea';
      case 'taken': return '#10b981';
      case 'booked': return '#10b981';
      case 'available': return '#667eea';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'active': return 'Активный';
      case 'taken': return 'Принят курьером';
      case 'booked': return 'Забронирован';
      case 'available': return 'Доступен';
      default: return status;
    }
  };

  return (
    <div>
      <BackButton />
      
      <div className="card" style={{ textAlign: 'center', marginBottom: '32px' }}>
        <Package size={48} style={{ color: '#667eea', marginBottom: '16px' }} />
        <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Мои заказы и поездки</h2>
        <p style={{ color: '#666' }}>Все ваши заказы на доставку и предложения курьера</p>
      </div>

      {/* Мои заказы на доставку */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '16px', color: '#667eea' }}>📦 Мои заказы на доставку</h3>
        {myOrders.length === 0 ? (
          <p style={{ color: '#666', textAlign: 'center' }}>У вас пока нет заказов</p>
        ) : (
          <div className="grid-responsive">
            {myOrders.map(order => (
              <div key={order.id} className="card" style={{ 
                border: '2px solid #f0f0f0',
                margin: 0
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <Package size={20} style={{ color: '#667eea' }} />
                  <span style={{
                    background: getStatusColor(order.status),
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {getStatusText(order.status)}
                  </span>
                </div>
                
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <MapPin size={14} />
                    <span style={{ fontSize: '14px' }}>{order.from} → {order.to}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={14} />
                    <span style={{ fontSize: '14px' }}>{order.deadline}</span>
                  </div>
                </div>
                
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                  {order.description} • {order.weight} кг • {order.price} ₽
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Мои поездки как курьер */}
      <div className="card">
        <h3 style={{ marginBottom: '16px', color: '#667eea' }}>🚗 Мои поездки как курьер</h3>
        {myTrips.length === 0 ? (
          <p style={{ color: '#666', textAlign: 'center' }}>У вас пока нет поездок</p>
        ) : (
          <div className="grid-responsive">
            {myTrips.map(trip => (
              <div key={trip.id} className="card" style={{ 
                border: '2px solid #f0f0f0',
                margin: 0
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  {getTransportIcon(trip.transport)}
                  <span style={{
                    background: getStatusColor(trip.status),
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {getStatusText(trip.status)}
                  </span>
                </div>
                
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <MapPin size={14} />
                    <span style={{ fontSize: '14px' }}>{trip.from} → {trip.to}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={14} />
                    <span style={{ fontSize: '14px' }}>{trip.date}</span>
                  </div>
                </div>
                
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                  До {trip.maxWeight} кг • {trip.price} ₽/кг
                </p>
                {trip.description && (
                  <p style={{ fontSize: '12px', color: '#999' }}>{trip.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;