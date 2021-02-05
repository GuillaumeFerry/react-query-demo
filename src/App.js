import './App.css'
import { useQuery } from 'react-query'
import { fetchTodos } from './lib/api'

function App() {
  const { data, error, isLoading, isError } = useQuery(
    'todos',
    fetchTodos
  )

  console.log(isLoading)
  console.log(data)

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <>
      {data?.records && 
        <ul>
          {
            data.records.map( rec =>
              <li key={rec.id}>{rec.fields.text}</li>
            )
          }
        </ul>
      }
    </>
    );
}

export default App;
