export function getImageUrl(location) {
    return `https://jmorel.opendatasoft.com/explore/dataset/ete-archi/files/${location.image.id}/300`;
}

export function getImageRatio(location) {
    return location.image.height / location.image.width * 100;
}
