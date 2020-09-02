export default interface PhotoMetadataDTO {
    id: number;
    height: number;
    width: number;
    orientation: string;
    compressed: boolean;
    comment: string;
    photoId: number;
}