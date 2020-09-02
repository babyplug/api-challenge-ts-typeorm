export default interface PhotoDTO {
    name: string
    description: string
    filename: string
    views: number
    isPublished: boolean
    authorId: number
    albumId: number[]
}