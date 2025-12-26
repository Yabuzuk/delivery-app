import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '../utils/LanguageContext';

const BackButton = ({ style = {} }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <button 
      onClick={() => navigate(-1)}
      style={{
        background: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(10px)',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '8px',
        color: '#667eea',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: '600',
        marginBottom: '16px',
        ...style
      }}
    >
      <ArrowLeft size={16} />
      {t('back')}
    </button>
  );
};

export default BackButton;