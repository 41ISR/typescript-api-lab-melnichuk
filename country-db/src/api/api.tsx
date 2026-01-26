
class ApiError extends Error {
    status: number
    constructor(status: number, message: string){
        super(message)
        this.status = status
        this.name = "ApiError"
    }
}

class ApiClient{
    private baseUrl: string

    constructor(baseUrl: string = `${import.meta.env.VITE_URL}/api`){
        this.baseUrl = baseUrl
    }

    private async request(endpoint: string, options?: RequestInit) {
        const url = `${this.baseUrl}${endpoint}`
        const config: RequestInit = {...options, headers: {"Content-Type": 'application/json', ...options?.headers}}

        try {
            const data = await fetch(url, config)

            if(!data.ok){
                const errorData = await data.json().catch(() => ({}))
                throw new ApiError(data.status, errorData.error || `HTTP ${data.status}: ${data.statusText}`)
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export const client = new ApiClient('https://countries-api-abhishek.vercel.app/countries')