import React from 'react';
import { Map, Marker, TileLayer, Popup } from 'react-leaflet'
import data from './data'
import { Local } from './types'
import { Icon } from 'leaflet'
import Logo from './logo.svg'

import './App.css';

const defaultIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png'
})

function App() {
    const [activeLocal, setActiveLocal] = React.useState<Local | null>(null)

    return (
        <Map center={[-22.655251, -43.254572]} zoom={14}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy;
            <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a>
            contributors"
            />

            {data && data.map((local, i: number) => {
                console.log(local)
                const icon = local?.img ? new Icon({ iconUrl: local.img, iconSize: [25, 25]}) : defaultIcon
                return (
                    <Marker
                        key={`${i}`}
                        position={[local.lat, local.lon]}
                        onclick={() => setActiveLocal(local)}
                        icon={icon}
                    />
                )
            })}

            {activeLocal && (
                <Popup position={[activeLocal.lat, activeLocal.lon]} onClose={() => setActiveLocal(null)}>
                    <div>
                        <h2 style={{ width: '100%', display: 'block' }}>{activeLocal.name}</h2>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>

                            <div>
                                <span>Latitude: {activeLocal.lat}</span>
                                <br />
                                <span>Longitude: {activeLocal.lon}</span>
                            </div>
                            <div>
                                <img src={Logo} alt="blablabl" width={50} height={50} />
                            </div>
                        </div>
                    </div>
                </Popup>
            )}
        </Map>
    );
}

export default App;
