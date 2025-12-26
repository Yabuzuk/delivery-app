import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Plane, Map, User } from 'lucide-react';

const Header = () => {
  return (
    <header style={{
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(10px)',
      padding: '16px 24px',
      boxShadow: '0 2px 20px rgba(0,0,0,0.1)'
    }}>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          textDecoration: 'none',
          color: '#333',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          <Package size={32} />
          ПопутДоставка
        </Link>
        
        <div style={{ 
          display: 'flex', 
          gap: '16px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <Link to="/create-order" style={{
            textDecoration: 'none',
            color: '#667eea',
            fontWeight: '600'
          }}>
            Отправить посылку
          </Link>
          <Link to="/find-couriers" style={{
            textDecoration: 'none',
            color: '#667eea',
            fontWeight: '600'
          }}>
            Найти курьера
          </Link>
          <Link to="/create-trip" style={{
            textDecoration: 'none',
            color: '#667eea',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Plane size={16} />
            Стать курьером
          </Link>
          <Link to="/find-trips" style={{
            textDecoration: 'none',
            color: '#667eea',
            fontWeight: '600'
          }}>
            Заказы
          </Link>
          <Link to="/my-orders" style={{
            textDecoration: 'none',
            color: '#667eea',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <User size={16} />
            Мои заказы
          </Link>
          <Link to="/map" style={{
            textDecoration: 'none',
            color: '#667eea',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Map size={16} />
            Карта
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;