import './App.css'
import { useQuery } from 'react-query'
import { fetchTodos } from './lib/api'

function App() {
  const { data, error, isLoading, isError } = useQuery(
    'todos',
    fetchTodos
  )

    console.log(data)
    console.log('err', error)

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && {error}}
      {data?.data?.records && 
        <ul>
          {
            data.data.records.map( rec =>
              <li key={rec.id}>{rec.fields.text}</li>
            )
          }
        </ul>
      }
    </>
    );
}

export default App;
