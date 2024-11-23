import TripManager from '../../components/TripManager';
import MapComponent from '../../components/MapComponent';
import './style.css'

const GerencieViagem = () => {


    return(
        <>
             <div className="travel-section">
  <div className="map-container">
    {/* Insira aqui o componente de mapa */}
    <MapComponent />
  </div>
  <div className="trip-manager-container">
    {/* Insira aqui o gerenciador de viagens */}
    <TripManager />
  </div>
</div>
        
        </>
    )

}

export default GerencieViagem;