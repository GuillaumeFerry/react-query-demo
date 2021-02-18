import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { deleteTodo, updateTodo } from './lib/api'

export const TodoItem = ({id, text, completed}) => {
    const queryClient = useQueryClient()

    const deleteMutation = useMutation(deleteTodo, {
        // refetch todos after mutation
        onSuccess: () => queryClient.invalidateQueries('todos')
    })

    const onDelete = () => {
        deleteMutation.mutate(id)
    }

    const checkMutation = useMutation(updateTodo, {
        // refetch todos after mutation
        onSuccess: () => queryClient.invalidateQueries('todos')
    })

    const onCheck = (event) => {
        checkMutation.mutate({id, fields: {completed: event.target.checked}})
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
