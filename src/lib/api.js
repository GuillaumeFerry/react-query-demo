import axios from 'axios'

// AIRTABLE API
const API_URL = "https://api.airtable.com/v0"
const BASE = "appZi9IKweICZrglI"
const TABLE = "Table%201"
const VIEW = "Grid%20view"

const AUTH_HEADER = {
    Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_TOKEN}`
}

export const fetchTodos = async(key) => {
    let url = `${API_URL}/${BASE}/${TABLE}/?${VIEW}`

    // destructuring data to avoid data.data
    let { data } = await axios.get(url, { 
        headers: { ...AUTH_HEADER }
    })

    return data
}
