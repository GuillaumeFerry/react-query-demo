import React from 'react'
import './App.css'
import { useInfiniteQuery } from 'react-query'
import { fetchTodos } from './lib/api'
import { AddTodo } from './AddTodo'
import { TodoItem } from './TodoItem'

function App() {
  // Simple Query
  // const { data, error, isLoading, isError } = useQuery(
  //   'todos',
  //   fetchTodos
  // )

  const {
    data,
    error,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery(
      'todos',
      ({ pageParam = 0 }) => fetchTodos(pageParam),
      {
        getNextPageParam: (lastPage, pages) => lastPage.offset,
      }
  )

  console.log(data)

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <>
      <AddTodo/>
      {data?.pages && 
        <ul>
          {
          data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {
                group.records.map( ({id, fields}) =>
                  <TodoItem key={id} id={id} {...fields} />
                )
              }
            </React.Fragment>
          ))
          }
        </ul>
      }
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {
          isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load more'
            : 'No more'
        }
      </button>
    </>
    );
}

export default App;
