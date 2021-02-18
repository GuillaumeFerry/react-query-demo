import React, { useRef } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { createTodo } from './lib/api' 

export const AddTodo = () => {
    const inputRef = useRef()
    const queryClient = useQueryClient()

    const { mutate } = useMutation(createTodo, {
        onSuccess: () => queryClient.invalidateQueries('todos')
    })

    const onAdd = () => {
        mutate({text: inputRef.current.value})
        inputRef.current.value = ''
    }

    return (
        <>
            <input ref={inputRef}/>
            <button onClick={onAdd}>Add ToDo</button>
            <hr/>
        </>
    )
}
