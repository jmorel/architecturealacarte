import { INITIAL_PAGE_STATE } from '../../reducers';

export const SECTION_NAME = 'EteArchi';
export const ID_PROP_NAME = 'date';
export const COORDINATES_PROP_NAME = 'coordonnees';
export const DATASET_URL = 'https://jmorel.opendatasoft.com/api/v2/catalog/datasets/ete-archi/exports/json';

export function getImageUrl(location) {
    return `https://jmorel.opendatasoft.com/explore/dataset/ete-archi/files/${location.image.id}/300`;
}

export function getImageRatio(location) {
    return location.image.height / location.image.width * 100;
}

export const mapStateToProps = (state, ownProps) => ({
    ...(state[SECTION_NAME] || INITIAL_PAGE_STATE),
    ...ownProps,
});
