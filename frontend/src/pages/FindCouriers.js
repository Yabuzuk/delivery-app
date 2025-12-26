import React, { useState, useEffect } from 'react';
import { Plane, Car, Train, MapPin, Clock, Package } from 'lucide-react';
import YandexMap from '../components/YandexMap';
import BackButton from '../components/BackButton';

const FindCouriers = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem('trips') || '[]');
    setTrips(savedTrips.filter(trip => trip.status === 'available'));
  }, []);

  const bookCourier = (tripId) => {
    const updatedTrips = trips.map(trip => 
      trip.id === tripId ? { ...trip, status: 'booked' } : trip
    );
    
    const allTrips = JSON.parse(localStorage.getItem('trips') || '[]');
    const finalTrips = allTrips.map(trip => 
      trip.id === tripId ? { ...trip, status: 'booked' } : trip
    );
    
    localStorage.setItem('trips', JSON.stringify(finalTrips));
    setTrips(updatedTrips.filter(trip => trip.status === 'available'));
    
    alert('Курьер забронирован!');
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
        <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Найти курьера</h2>
        <p style={{ color: '#666' }}>Выберите курьера по вашему маршруту</p>
      </div>

      <div className="card" style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px', textAlign: 'center' }}>Карта маршрутов</h3>
        <YandexMap routes={trips} />
      </div>

      <div className="grid-responsive">
        {trips.map(trip => (
          <div key={trip.id} className="card" style={{
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
                {getTransportIcon(trip.transport)}
                <span style={{ fontWeight: '600', color: '#667eea' }}>
                  {trip.transport === 'plane' ? 'Самолет' : 
                   trip.transport === 'train' ? 'Поезд' : 'Автомобиль'}
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
                {trip.price} ₽/кг
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
                <span style={{ fontWeight: '600' }}>{trip.from} → {trip.to}</span>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <Clock size={16} style={{ color: '#666' }} />
                <span style={{ color: '#666' }}>{trip.date}</span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Package size={16} style={{ color: '#666' }} />
                <span style={{ color: '#666' }}>До {trip.maxWeight} кг</span>
              </div>
            </div>

            {trip.description && (
              <div style={{
                background: '#f8f9fa',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '16px'
              }}>
                <p style={{ fontSize: '14px', color: '#666' }}>
                  {trip.description}
                </p>
              </div>
            )}

            <button 
              className="btn" 
              style={{ width: '100%' }}
              onClick={() => bookCourier(trip.id)}
            >
              Выбрать курьера
            </button>
          </div>
        ))}
        
        {trips.length === 0 && (
          <div className="card" style={{ textAlign: 'center', gridColumn: '1 / -1' }}>
            <p style={{ color: '#666', fontSize: '18px' }}>
              Пока нет доступных курьеров. Попробуйте позже!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindCouriers;