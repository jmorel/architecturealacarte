export const SECTION_NAME = 'CinquanteLieux';
export const ID_PROP_NAME = 'nom';
export const COORDINATES_PROP_NAME = 'coordonnees';
export const DATASET_URL = 'https://jmorel.opendatasoft.com/api/v2/catalog/datasets/50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie/exports/json';

export function getImageUrl(location) {
    return `https://jmorel.opendatasoft.com/explore/dataset/50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie/files/${location.image.id}/300`;
}

export function getImageRatio(location) {
    return location.image.height / location.image.width * 100;
}

export const mapStateToProps = (state, ownProps) => ({
    ...(state[SECTION_NAME]),
    ...ownProps,
});

