import L from 'leaflet';

class Location {
    constructor(data) {
        this.data = data;
        this.markerIcon = this.buildMarkerIcon(false);
        this.collapsedMarkerIcon = this.buildMarkerIcon(true);
    }

    buildMarkerIcon(collapsed) {
        const image = this.getImageData();
        const iconRadius = 50;
        const ratio = Math.min(image.width / iconRadius, image.height / iconRadius);
        const iconHeight = image.height / ratio;
        const iconWidth = image.width / ratio;
        return L.divIcon({
            iconSize: [50, 50],
            iconAnchor: [25, 25],
            className: collapsed ? 'CollapsedMarkerIcon' : 'MarkerIcon',
            html: `<img src="${this.getImageUrl()}" alt="${this.getTitle()}" width="${iconWidth}" height="${iconHeight}">`
        })
    };


    getImageData() {
        throw new Error("Method not implemented");
    }

    getImageUrl() {
        throw new Error("Method not implemented");
    }

    getTitle() {
        throw new Error("Method not implemented");
    }
}

export class EteArchiLocation extends Location {
    getId() {
        return this.data.date;
    }

    getTitle()  {
        return this.data.titre;
    }

    getDate() {
        return this.data.date;
    }

    getListUrl() {
        return '/ete-archi';
    }

    getDetailsUrl() {
        return `/ete-archi/${this.getId()}`;
    }

    getImageCredits() {
        return this.data.credits_image;
    }

    getImageUrl() {
        return `https://jmorel.opendatasoft.com/explore/dataset/ete-archi/files/${this.data.image.id}/300`
    }

    getImageData() {
        return this.data.image;
    }

    getLatLon() {
        return this.data.coordonnees;
    }
}