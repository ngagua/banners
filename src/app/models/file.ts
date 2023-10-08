export interface FileResponse {
    message: string
    data: FileUploadResponse
}

export interface FileRequest {
    file: File
    fileName: string
    mimeType: string
    fileSize: number
}

export interface FileUploadResponse {
    id: string
    fileName: string
    mimeType: string
    fileSize: number
}
