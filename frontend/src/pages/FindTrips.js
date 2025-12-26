import React, { useState, useEffect } from 'react';
import { Plane, Car, Train, MapPin, Clock, DollarSign } from 'lucide-react';
import InteractiveMap from '../components/InteractiveMap';
import BackButton from '../components/BackButton';
import RouteFilter from '../components/RouteFilter';

const FindTrips = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filters, setFilters] = useState({
    from: '',
    to: '',
    dateFrom: '',
    dateTo: '',
    maxPrice: ''
  });

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const activeOrders = savedOrders.filter(order => order.status === 'active');
    setOrders(activeOrders);
    setFilteredOrders(activeOrders);
  }, []);

  useEffect(() => {
    let filtered = orders.filter(order => {
      const matchFrom = !filters.from || order.from.toLowerCase().includes(filters.from.toLowerCase());
      const matchTo = !filters.to || order.to.toLowerCase().includes(filters.to.toLowerCase());
      const matchDateFrom = !filters.dateFrom || order.deadline >= filters.dateFrom;
      const matchDateTo = !filters.dateTo || order.deadline <= filters.dateTo;
      const matchPrice = !filters.maxPrice || parseInt(order.price) <= parseInt(filters.maxPrice);
      
      return matchFrom && matchTo && matchDateFrom && matchDateTo && matchPrice;
    });
    
    setFilteredOrders(filtered);
  }, [filters, orders]);

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

  const takeOrder = (orderId) => {
    const updatedOrders = filteredOrders.map(order => 
      order.id === orderId ? { ...order, status: 'taken' } : order
    );
    
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const finalOrders = allOrders.map(order => 
      order.id === orderId ? { ...order, status: 'taken' } : order
    );
    
    localStorage.setItem('orders', JSON.stringify(finalOrders));
    const activeOrders = finalOrders.filter(order => order.status === 'active');
    setOrders(activeOrders);
    
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

      <RouteFilter 
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
      />

      <div className="card" style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px', textAlign: 'center' }}>Карта заказов ({filteredOrders.length})</h3>
        <InteractiveMap routes={filteredOrders} />
      </div>

      <div className="grid-responsive">
        {filteredOrders.map(order => (
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
        
        {filteredOrders.length === 0 && (
          <div className="card" style={{ textAlign: 'center', gridColumn: '1 / -1' }}>
            <p style={{ color: '#666', fontSize: '18px' }}>
              {orders.length === 0 ? 'Пока нет доступных заказов.' : 'Ничего не найдено по вашим фильтрам.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindTrips;