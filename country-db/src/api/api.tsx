import type { ICountry } from "../pages/Index"

interface IApiResponse<T> {
    data?: T,
    error?: boolean,
    message: string,
    statusCode: number,
    details?: string
}

export class ApiError extends Error {
    status: number

    constructor(status: number, message: string){
        super(message)
        this.status = status
        this.name = "ApiError"
    }
}

class ApiClient{
    private baseUrl: string

    constructor(baseUrl: string = `${import.meta.env.VITE_URL}`){
        this.baseUrl = baseUrl
    }

    private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`
        const config: RequestInit = {...options, headers: {"Content-Type": 'application/json', ...options?.headers}}

        try {
            const data = await fetch(url, config)

            if(!data.ok){
                const errorData = await data.json().catch(() => ({}))
                throw new ApiError(data.status, errorData.error || `HTTP ${data.status}: ${data.statusText}`)
            }

            return await data.json()
        } catch (error) {
            if(error instanceof ApiError){
                throw error
            }
            throw new ApiError(0, `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
    }

    async get<T>(endpoint: string): Promise<T>{
        return this.request<T>(endpoint, {method: 'GET'})
    }

    async post<TRequest, TResponse>(endpoint: string, data: TRequest): Promise<TResponse>{
        return this.request<TResponse>(endpoint, {method: 'POST', body: JSON.stringify(data)})
    }

    async getCountries(): Promise<IApiResponse<ICountry[]>> {
        return this.get<IApiResponse<ICountry[]>>('')
    }
}

export const client = new ApiClient()