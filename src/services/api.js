import axios from 'axios'

process.env.mockEndpoint = "https://6060f5a2ac47190017a7055e.mockapi.io"

export const mockApi = axios.create({
  baseURL: process.env.mockEndpoint
})
