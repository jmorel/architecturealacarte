import L from 'leaflet';

export const getImageUrl = (DATASET_ID, image) => image ? `https://jmorel.opendatasoft.com/explore/dataset/${DATASET_ID}/files/${image.id}/300` : '';

export const getImageRatio = (image) => image ? image.height / image.width * 100 : 50;

export const buildMarkerIcon = (DATASET_ID, image, alt, collapsed) => {
    if (!image) {
        return L.divIcon({
            iconSize: [50, 50],
            iconAnchor: [25, 25],
            className: collapsed ? 'CollapsedMarkerIcon' : 'MarkerIcon',
        })
    }

    const iconRadius = 50;
    const ratio = Math.min(image.width / iconRadius, image.height / iconRadius);
    const iconHeight = image.height / ratio;
    const iconWidth = image.width / ratio;
    return L.divIcon({
        iconSize: [50, 50],
        iconAnchor: [25, 25],
        className: collapsed ? 'CollapsedMarkerIcon' : 'MarkerIcon',
        html: `<img src="${getImageUrl(DATASET_ID, image)}" alt="${alt}" width="${iconWidth}" height="${iconHeight}">`
    })
};
