import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './App.css'
import { LatLngExpression } from 'leaflet'
import Axios from 'axios'
// import Map from './components/Map'

import {
  useQuery,
} from '@tanstack/react-query'

function App() {

  const { isPending, error, data } = useQuery({
    queryKey: ['iss'],
    queryFn: ({ signal }) =>
      Axios.get('iss', {
        signal,
      }),
  })

  if (isPending) return 'Loading...';


  if (error) return 'An error has occurred: ' + error.message;

  const position: LatLngExpression = [data.data.latitude, data.data.longitude]

  console.log(data.data);

  // const position: LatLngExpression = [51.505, -0.09]

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
  )
}

export default App




// const queryClient = new QueryClient()

// export default function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Map />
//     </QueryClientProvider>
//   )
// }

// function Example() {
//   const { isPending, error, data } = useQuery({
//     queryKey: ['repoData'],
//     queryFn: () =>
//       fetch('https://api.github.com/repos/TanStack/query').then((res) =>
//         res.json(),
//       ),
//   })

//   if (isPending) return 'Loading...'

//   if (error) return 'An error has occurred: ' + error.message

//   return (
//     <div>
//       <h1>{data.name}</h1>
//       <p>{data.description}</p>
//       <strong>👀 {data.subscribers_count}</strong>{' '}
//       <strong>✨ {data.stargazers_count}</strong>{' '}
//       <strong>🍴 {data.forks_count}</strong>
//     </div>
//   )
// }
