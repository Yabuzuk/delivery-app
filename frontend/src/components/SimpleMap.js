import React from 'react';

const YandexMap = ({ routes = [] }) => {
  return (
    <div style={{ 
      width: '100%', 
      height: window.innerWidth < 768 ? '300px' : '400px',
      borderRadius: '12px',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <h3 style={{ marginBottom: '16px' }}>🗺️ Карта маршрутов</h3>
      <p style={{ marginBottom: '16px' }}>Найдено маршрутов: {routes.length}</p>
      
      {routes.slice(0, 3).map((route, index) => (
        <div key={index} style={{
          background: 'rgba(255,255,255,0.2)',
          padding: '8px 12px',
          margin: '4px 0',
          borderRadius: '8px',
          fontSize: '14px'
        }}>
          📍 {route.from} → {route.to}
          {route.price && ` • ${route.price}${typeof route.price === 'string' && route.price.includes('₽') ? '' : ' ₽'}`}
        </div>
      ))}
      
      {routes.length > 3 && (
        <p style={{ marginTop: '8px', opacity: 0.8 }}>
          И еще {routes.length - 3} маршрутов...
        </p>
      )}
      
      {routes.length === 0 && (
        <p style={{ opacity: 0.8 }}>Пока нет активных маршрутов</p>
      )}
    </div>
  );
};

export default YandexMap;