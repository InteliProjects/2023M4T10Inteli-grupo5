import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: -18.45138876264891,
  lng: -53.16543584288092,
};

// eslint-disable-next-line react/prop-types
const MapComponent = React.memo(function MapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCNwzEivPtGChHCUMaR2YqyS4307H-TNJQ',
  });

  const onLoad = React.useCallback(function onLoadCallback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    // Adicione a camada de tráfego para visualização de caminhões
    const trafficLayer = new window.google.maps.TrafficLayer();
    trafficLayer.setMap(map);
  }, []);

  const onUnmount = React.useCallback(function onUnmountCallback() {
    // Faça qualquer limpeza aqui
  }, []);

  return isLoaded ? (
    <>
      <h2 style={{color: "var(--cinza-titulo)", textAlign: "center"}}>Localização do Caminhão</h2>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={9}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
      </GoogleMap>
    </>
  ) : <></>;
});

export default MapComponent;
