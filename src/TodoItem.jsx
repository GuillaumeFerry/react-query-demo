import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { deleteTodo } from './lib/api'

export const TodoItem = ({id, text, completed}) => {
    const queryClient = useQueryClient()

    const { mutate } = useMutation(deleteTodo, {
        // refetch todos after mutation
        onSuccess: () => queryClient.invalidateQueries('todos')
    })

    const onDelete = () => {
        mutate(id)
    }

    const onCheck = () => {
        
    }

    return (
        <li>
            <span>{text}</span>
            <input
                type="checkbox"
                onChange={onCheck}
                checked={!!completed}
            />
            <button onClick={onDelete}>Delete</button>
        </li>
    )
}
