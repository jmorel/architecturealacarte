import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { setCurrentId } from '../actions';
import { currentIdSelector, currentLocationSelector, listUrlSelector } from '../selectors';
import { Spinner } from './Spinner';


export const withCurrentLocation = (WrappedComponent, SpinnerComponent) => {
    class DetailsSidebar extends React.Component {
        _dispatchCurrentLocation() {
            const { dispatch, currentId, match } = this.props;
            if (!currentId || currentId !== match.params.id) {
                dispatch(setCurrentId(match.params.id));
            }
        }

        componentDidMount() {
            this._dispatchCurrentLocation();
        }

        componentDidUpdate() {
            this._dispatchCurrentLocation();
        }

        render() {
            let { currentLocation, currentId, listUrl } = this.props;

            if (!currentLocation && currentId) {
                return <Redirect to={listUrl} />
            }

            if (!currentLocation) {
                return SpinnerComponent ? <SpinnerComponent /> : <Spinner />
            }

            return <WrappedComponent currentLocation={currentLocation} {...this.props} />
        }
    }

    const DetailsSidebarWithRouter = withRouter(DetailsSidebar);

    const mapStateToProps = (state, ownProps) => ({
        currentLocation: currentLocationSelector(state),
        currentId: currentIdSelector(state),
        LIST_URL: listUrlSelector(state),
        match: ownProps.match,
    });

    const DetailsSidebarWithRouterContainer = connect(mapStateToProps)(DetailsSidebarWithRouter);

    return DetailsSidebarWithRouterContainer;
}



