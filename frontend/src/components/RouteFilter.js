import React from 'react';
import { Search, X } from 'lucide-react';

const RouteFilter = ({ filters, onFilterChange, onClearFilters }) => {
  return (
    <div className="card" style={{ marginBottom: '24px' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px', 
        marginBottom: '16px' 
      }}>
        <Search size={20} style={{ color: '#667eea' }} />
        <h3 style={{ margin: 0, color: '#667eea' }}>Фильтр маршрутов</h3>
      </div>
      
      <div className="grid-2-cols">
        <div className="form-group" style={{ marginBottom: '12px' }}>
          <label>Откуда</label>
          <input
            type="text"
            placeholder="Город отправления"
            value={filters.from}
            onChange={(e) => onFilterChange('from', e.target.value)}
          />
        </div>
        
        <div className="form-group" style={{ marginBottom: '12px' }}>
          <label>Куда</label>
          <input
            type="text"
            placeholder="Город назначения"
            value={filters.to}
            onChange={(e) => onFilterChange('to', e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid-2-cols">
        <div className="form-group" style={{ marginBottom: '12px' }}>
          <label>Дата от</label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => onFilterChange('dateFrom', e.target.value)}
          />
        </div>
        
        <div className="form-group" style={{ marginBottom: '12px' }}>
          <label>Дата до</label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => onFilterChange('dateTo', e.target.value)}
          />
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
          <label>Макс. цена (₽)</label>
          <input
            type="number"
            placeholder="1000"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
          />
        </div>
        
        <button 
          onClick={onClearFilters}
          style={{
            background: 'transparent',
            border: '2px solid #e1e5e9',
            borderRadius: '8px',
            padding: '8px',
            cursor: 'pointer',
            color: '#666',
            marginTop: '20px'
          }}
          title="Очистить фильтры"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default RouteFilter;