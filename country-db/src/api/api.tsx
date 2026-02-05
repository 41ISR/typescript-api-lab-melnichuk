import type { ICountry } from "../pages/Index"

interface IApiResponse<T> {
    data?: T,
    error?: boolean,
    message: string,
    statusCode: number,
    details?: string
}
interface ICreateCountryRequest extends ICountry {}

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

    private buildURL(endpoint: string, params?: Record<string, any>){
        const url = new URL(`${this.baseUrl}${endpoint}`)
        if(params){
            Object.entries(params).forEach(([key, val]) => {
                if(val !== undefined && key !== undefined)
                    url.searchParams.append(key, String(val))
            })
        }
        return url.toString()
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

    async get<T>(endpoint: string, params?: Record<string, any>): Promise<T>{
        const url = params ? this.buildURL(endpoint, params) : endpoint
        return this.request<T>(url.replaceAll(this.baseUrl, ""), {method: 'GET'})
    }

    async post<TRequest, TResponse>(endpoint: string, data: TRequest): Promise<TResponse>{
        return this.request<TResponse>(endpoint, {method: 'POST', body: JSON.stringify(data)})
    }

    async delete<T>(endpoint: string): Promise<T>{
        return this.request<T>(endpoint, {method: 'DELETE'})
    }


    async getCountries(): Promise<IApiResponse<ICountry[]>> {
        return this.get<IApiResponse<ICountry[]>>('')
    }

    async getCountry(country: string): Promise<IApiResponse<ICountry>> {
        return this.get<IApiResponse<ICountry>>(`/${country}`)
    }

    // ВСЕ: сургута не существует 
    // СУРГУТ:

    async createCountry(data: ICountry): Promise<IApiResponse<ICountry>> {
        return this.post<ICreateCountryRequest, IApiResponse<ICountry>>('/create', data) 
    }

    async deleteCountry(country: string): Promise<IApiResponse<void>> {
        return this.delete<IApiResponse<void>>(`/${country}`)
    }
}

export const client = new ApiClient()