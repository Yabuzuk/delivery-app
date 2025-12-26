import React, { useEffect, useRef } from 'react';

const InteractiveMap = ({ routes = [] }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && routes.length > 0) {
      // Создаем iframe с OpenStreetMap
      const mapHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
          <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
          <style>
            body { margin: 0; padding: 0; }
            #map { height: 100vh; width: 100%; }
          </style>
        </head>
        <body>
          <div id="map"></div>
          <script>
            const map = L.map('map').setView([55.7558, 37.6176], 5);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            const routes = ${JSON.stringify(routes)};
            
            // Добавляем маркеры для каждого маршрута
            routes.forEach((route, index) => {
              // Примерные координаты для популярных городов
              const cities = {
                'Москва': [55.7558, 37.6176],
                'Санкт-Петербург': [59.9311, 30.3609],
                'Екатеринбург': [56.8431, 60.6454],
                'Новосибирск': [55.0084, 82.9357],
                'Казань': [55.8304, 49.0661],
                'Уфа': [54.7388, 55.9721],
                'Нижний Новгород': [56.2965, 43.9361],
                'Челябинск': [55.1644, 61.4368],
                'Самара': [53.2001, 50.1500],
                'Омск': [54.9885, 73.3242]
              };
              
              const fromCoords = cities[route.from] || [55.7558, 37.6176];
              const toCoords = cities[route.to] || [59.9311, 30.3609];
              
              // Маркер отправления (зеленый)
              L.marker(fromCoords)
                .addTo(map)
                .bindPopup(\`<b>Откуда:</b> \${route.from}<br><b>Цена:</b> \${route.price || 'Не указана'}\`);
              
              // Маркер назначения (красный)
              const redIcon = L.icon({
                iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjUgMEMxOS40MDM2IDAgMjUgNS41OTY0NCAyNSAxMi41QzI1IDE5LjQwMzYgMTkuNDAzNiAyNSAxMi41IDI1QzUuNTk2NDQgMjUgMCAxOS40MDM2IDAgMTIuNUMwIDUuNTk2NDQgNS41OTY0NCAwIDEyLjUgMFoiIGZpbGw9IiNEQzI2MjYiLz4KPHBhdGggZD0iTTEyLjUgNDBMMTcuNSAyNUg3LjVMMTIuNSA0MFoiIGZpbGw9IiNEQzI2MjYiLz4KPC9zdmc+',
                iconSize: [25, 41],
                iconAnchor: [12, 41]
              });
              
              L.marker(toCoords, {icon: redIcon})
                .addTo(map)
                .bindPopup(\`<b>Куда:</b> \${route.to}<br><b>Описание:</b> \${route.description || 'Не указано'}\`);
              
              // Линия маршрута
              L.polyline([fromCoords, toCoords], {
                color: '#667eea',
                weight: 3,
                opacity: 0.8
              }).addTo(map);
            });
            
            // Подгоняем масштаб под все маркеры
            if (routes.length > 0) {
              const group = new L.featureGroup();
              routes.forEach(route => {
                const cities = {
                  'Москва': [55.7558, 37.6176],
                  'Санкт-Петербург': [59.9311, 30.3609],
                  'Екатеринбург': [56.8431, 60.6454],
                  'Новосибирск': [55.0084, 82.9357],
                  'Казань': [55.8304, 49.0661],
                  'Уфа': [54.7388, 55.9721]
                };
                const fromCoords = cities[route.from] || [55.7558, 37.6176];
                const toCoords = cities[route.to] || [59.9311, 30.3609];
                group.addLayer(L.marker(fromCoords));
                group.addLayer(L.marker(toCoords));
              });
              map.fitBounds(group.getBounds().pad(0.1));
            }
          </script>
        </body>
        </html>
      `;

      mapRef.current.innerHTML = `<iframe 
        srcdoc="${mapHtml.replace(/"/g, '&quot;')}" 
        style="width: 100%; height: 100%; border: none; border-radius: 12px;"
      ></iframe>`;
    } else {
      // Заглушка если нет маршрутов
      mapRef.current.innerHTML = `
        <div style="
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 12px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        ">
          <h3 style="margin-bottom: 16px;">🗺️ Карта маршрутов</h3>
          <p>Пока нет активных маршрутов для отображения</p>
        </div>
      `;
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

export default InteractiveMap;