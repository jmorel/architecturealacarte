import L from 'leaflet';

export function buildImageIcon(record) {
    const iconRadius = 50;
    const ratio = Math.min(record.image.width / iconRadius, record.image.height / iconRadius);
    const iconHeight = record.image.height / ratio;
    const iconWidth = record.image.width / ratio;
    return L.divIcon({
        iconSize: [50, 50],
        iconAnchor: [25, 25],
        className: 'ImageMarkerIcon',
        html: `<img src="https://jmorel.opendatasoft.com/explore/dataset/ete-archi/files/${record.image.id}/300" alt="${record.titre}" width="${iconWidth}" height="${iconHeight}">`
    })
};

export function buildSimpleIcon(record) {
    return L.divIcon({
        iconSize: [12, 12],
        iconAnchor: [6, 6],
        className: 'SimpleMarkerIcon',
    })
}