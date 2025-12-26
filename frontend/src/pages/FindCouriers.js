import React, { useState, useEffect } from 'react';
import { Plane, Car, Train, MapPin, Clock, Package } from 'lucide-react';
import InteractiveMap from '../components/InteractiveMap';
import BackButton from '../components/BackButton';
import RouteFilter from '../components/RouteFilter';

const FindCouriers = () => {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [filters, setFilters] = useState({
    from: '',
    to: '',
    dateFrom: '',
    dateTo: '',
    maxPrice: ''
  });

  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem('trips') || '[]');
    const availableTrips = savedTrips.filter(trip => trip.status === 'available');
    setTrips(availableTrips);
    setFilteredTrips(availableTrips);
  }, []);

  useEffect(() => {
    let filtered = trips.filter(trip => {
      const matchFrom = !filters.from || trip.from.toLowerCase().includes(filters.from.toLowerCase());
      const matchTo = !filters.to || trip.to.toLowerCase().includes(filters.to.toLowerCase());
      const matchDateFrom = !filters.dateFrom || trip.date >= filters.dateFrom;
      const matchDateTo = !filters.dateTo || trip.date <= filters.dateTo;
      const matchPrice = !filters.maxPrice || parseInt(trip.price) <= parseInt(filters.maxPrice);
      
      return matchFrom && matchTo && matchDateFrom && matchDateTo && matchPrice;
    });
    
    setFilteredTrips(filtered);
  }, [filters, trips]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      from: '',
      to: '',
      dateFrom: '',
      dateTo: '',
      maxPrice: ''
    });
  };

  const bookCourier = (tripId) => {
    const updatedTrips = filteredTrips.map(trip => 
      trip.id === tripId ? { ...trip, status: 'booked' } : trip
    );
    
    const allTrips = JSON.parse(localStorage.getItem('trips') || '[]');
    const finalTrips = allTrips.map(trip => 
      trip.id === tripId ? { ...trip, status: 'booked' } : trip
    );
    
    localStorage.setItem('trips', JSON.stringify(finalTrips));
    const availableTrips = finalTrips.filter(trip => trip.status === 'available');
    setTrips(availableTrips);
    
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

      <RouteFilter 
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
      />

      <div className="card" style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px', textAlign: 'center' }}>Карта маршрутов ({filteredTrips.length})</h3>
        <InteractiveMap routes={filteredTrips} />
      </div>

      <div className="grid-responsive">
        {filteredTrips.map(trip => (
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
        
        {filteredTrips.length === 0 && (
          <div className="card" style={{ textAlign: 'center', gridColumn: '1 / -1' }}>
            <p style={{ color: '#666', fontSize: '18px' }}>
              {trips.length === 0 ? 'Пока нет доступных курьеров.' : 'Ничего не найдено по вашим фильтрам.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindCouriers;