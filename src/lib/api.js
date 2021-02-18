import axios from 'axios'

// AIRTABLE API
const API_URL = "https://api.airtable.com/v0"
const BASE = "appZi9IKweICZrglI"
const TABLE = "Table%201"
const VIEW = "Grid%20view"

const AUTH_HEADER = {
    Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_TOKEN}`
}

export const fetchTodos = async( pageParam ) => {
    // useQuery
    // let url = `${API_URL}/${BASE}/${TABLE}/?${VIEW}`

    //useInfiniteQuery
    let url = `${API_URL}/${BASE}/${TABLE}/?${VIEW}&pageSize=${2}`
    if (pageParam){
        url = url + `&offset=${pageParam}`
    }

    // destructuring data to avoid data.data
    let { data } = await axios.get(url, { 
        headers: { ...AUTH_HEADER }
    })

    return data
}

export const createTodo = async( fields ) => {
    let url = `${API_URL}/${BASE}/${TABLE}`

    let data = await axios.post(url, {fields}, {
        headers: {
            ...AUTH_HEADER,
            'Content-Type': 'application/json'
        }
    })

    console.log('DATA SEND:', data)

    return data
}