import React, { useState, useEffect } from 'react';
import { Map } from 'lucide-react';
import SimpleMap from '../components/SimpleMap';
import BackButton from '../components/BackButton';

const MapPage = () => {
  const [allRoutes, setAllRoutes] = useState([]);

  useEffect(() => {
    // Получаем все заказы и поездки
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const trips = JSON.parse(localStorage.getItem('trips') || '[]');
    
    const combined = [
      ...orders.filter(order => order.status === 'active'),
      ...trips.filter(trip => trip.status === 'available')
    ];
    
    setAllRoutes(combined);
  }, []);

  return (
    <div>
      <BackButton />
      <div className="card" style={{ textAlign: 'center', marginBottom: '32px' }}>
        <Map size={48} style={{ color: '#667eea', marginBottom: '16px' }} />
        <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Карта маршрутов</h2>
        <p style={{ color: '#666' }}>Все доступные заказы и поездки на карте</p>
      </div>

      <div className="card">
        <SimpleMap routes={allRoutes} />
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '16px',
        marginTop: '24px'
      }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h4 style={{ color: '#667eea', marginBottom: '8px' }}>Активные заказы</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {allRoutes.filter(r => r.description).length}
          </p>
        </div>
        
        <div className="card" style={{ textAlign: 'center' }}>
          <h4 style={{ color: '#667eea', marginBottom: '8px' }}>Доступные курьеры</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {allRoutes.filter(r => r.transport).length}
          </p>
        </div>
        
        <div className="card" style={{ textAlign: 'center' }}>
          <h4 style={{ color: '#667eea', marginBottom: '8px' }}>Всего маршрутов</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {allRoutes.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapPage;