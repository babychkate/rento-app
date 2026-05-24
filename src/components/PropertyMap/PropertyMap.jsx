import { useEffect, useRef } from 'react';

// Leaflet підключається через CDN у index.html або динамічно
// Переконайся що в index.html є:
// <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
// <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

const PropertyMap = ({ coordinates, address }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Чекаємо що Leaflet завантажений
    if (typeof window.L === 'undefined') return;

    const L = window.L;

    const map = L.map(mapRef.current, {
      center: [coordinates.lat, coordinates.lng],
      zoom: 15,
      zoomControl: false,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    // Tile layer — OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Кастомна іконка маркера
    const customIcon = L.divIcon({
      className: '',
      html: `
        <div style="
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #60aaff 0%, #2979ff 35%, #1a5fff 70%, #0040dd 100%);
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(41,121,255,0.45);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            width: 10px;
            height: 10px;
            background: white;
            border-radius: 50%;
            transform: rotate(45deg);
          "></div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -44],
    });

    const marker = L.marker([coordinates.lat, coordinates.lng], { icon: customIcon }).addTo(map);

    marker.bindPopup(`
      <div style="
        font-family: 'Montserrat', sans-serif;
        font-size: 13px;
        font-weight: 600;
        color: #012A81;
        padding: 4px 2px;
        white-space: nowrap;
      ">${address}</div>
    `, {
      closeButton: false,
      offset: [0, -8],
    }).openPopup();

    // Додаємо кнопку зуму
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [coordinates, address]);

  return (
    <div
      ref={mapRef}
      className="w-full h-full"
      style={{ borderRadius: '20px', overflow: 'hidden' }}
    />
  );
};

export default PropertyMap;
