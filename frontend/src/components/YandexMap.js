import React, { useEffect, useRef } from 'react';

const YandexMap = ({ routes = [] }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    // Загружаем Яндекс.Карты API
    if (!window.ymaps) {
      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      window.ymaps.ready(() => {
        if (!mapInstance.current) {
          mapInstance.current = new window.ymaps.Map(mapRef.current, {
            center: [55.76, 37.64], // Москва
            zoom: 5,
            controls: ['zoomControl', 'fullscreenControl']
          });
        }

        // Очищаем карту
        mapInstance.current.geoObjects.removeAll();

        // Добавляем маршруты
        routes.forEach((route, index) => {
          // Геокодируем города
          Promise.all([
            window.ymaps.geocode(route.from),
            window.ymaps.geocode(route.to)
          ]).then(([fromResult, toResult]) => {
            const fromCoords = fromResult.geoObjects.get(0)?.geometry.getCoordinates();
            const toCoords = toResult.geoObjects.get(0)?.geometry.getCoordinates();

            if (fromCoords && toCoords) {
              // Добавляем метки
              const fromPlacemark = new window.ymaps.Placemark(fromCoords, {
                balloonContent: `Откуда: ${route.from}`
              }, {
                preset: 'islands#greenDotIcon'
              });

              const toPlacemark = new window.ymaps.Placemark(toCoords, {
                balloonContent: `Куда: ${route.to}<br>Цена: ${route.price || route.price + ' ₽'}`
              }, {
                preset: 'islands#redDotIcon'
              });

              // Добавляем линию маршрута
              const polyline = new window.ymaps.Polyline([fromCoords, toCoords], {
                balloonContent: `${route.from} → ${route.to}`
              }, {
                strokeColor: '#667eea',
                strokeWidth: 3,
                strokeOpacity: 0.8
              });

              mapInstance.current.geoObjects.add(fromPlacemark);
              mapInstance.current.geoObjects.add(toPlacemark);
              mapInstance.current.geoObjects.add(polyline);
            }
          });
        });

        // Автоматически подстраиваем масштаб
        if (routes.length > 0) {
          setTimeout(() => {
            mapInstance.current.setBounds(mapInstance.current.geoObjects.getBounds(), {
              checkZoomRange: true,
              zoomMargin: 50
            });
          }, 1000);
        }
      });
    }
  }, [routes]);

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '100%', 
        height: window.innerWidth < 768 ? '300px' : '400px', 
        borderRadius: '12px',
        overflow: 'hidden'
      }} 
    />
  );
};

export default YandexMap;