import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Users, Shield, Clock } from 'lucide-react';
import { useTranslation } from '../utils/LanguageContext';

const Home = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <section style={{
        textAlign: 'center',
        padding: '60px 20px',
        color: 'white'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          marginBottom: '16px'
        }}>
          {t('homeTitle')}
        </h1>
        <p style={{
          fontSize: '20px',
          marginBottom: '32px',
          opacity: 0.9
        }}>
          {t('homeSubtitle')}
        </p>
        
        <div className="flex-buttons">
          <Link to="/create-order" className="btn" style={{
            fontSize: '18px',
            padding: '16px 32px'
          }}>
            {t('sendPackageBtn')}
          </Link>
          <Link to="/find-couriers" className="btn" style={{
            fontSize: '18px',
            padding: '16px 32px',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            {t('findCourierBtn')}
          </Link>
          <Link to="/create-trip" className="btn" style={{
            fontSize: '18px',
            padding: '16px 32px',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            {t('becomeCourierBtn')}
          </Link>
        </div>
      </section>

      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginTop: '40px'
      }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <Package size={48} style={{ color: '#667eea', marginBottom: '16px' }} />
          <h3 style={{ marginBottom: '12px' }}>Быстрая доставка</h3>
          <p style={{ color: '#666' }}>Доставляем посылки в кратчайшие сроки с попутчиками</p>
        </div>
        
        <div className="card" style={{ textAlign: 'center' }}>
          <Shield size={48} style={{ color: '#667eea', marginBottom: '16px' }} />
          <h3 style={{ marginBottom: '12px' }}>Безопасность</h3>
          <p style={{ color: '#666' }}>Проверенные курьеры и система рейтингов</p>
        </div>
        
        <div className="card" style={{ textAlign: 'center' }}>
          <Users size={48} style={{ color: '#667eea', marginBottom: '16px' }} />
          <h3 style={{ marginBottom: '12px' }}>Сообщество</h3>
          <p style={{ color: '#666' }}>Тысячи попутчиков готовы помочь с доставкой</p>
        </div>
      </section>
    </div>
  );
};

export default Home;