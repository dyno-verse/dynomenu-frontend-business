export interface IRequestADemo {
    statusCode: number
    statusMessage: string
    data: Data
}

export interface Data {
    title: string
    message: string
}
