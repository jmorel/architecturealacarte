import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { setCurrentId } from '../actions';
import { currentIdSelector, currentLocationSelector, listUrlSelector } from '../selectors';
import { Spinner } from './Spinner';

export const DetailsSidebar = ({ children }) => (
    <div className="DetailsSidebar">
        {children}
    </div>
);

DetailsSidebar.propTypes = {
    children: PropTypes.node.isRequired,
};

export const withCurrentLocation = (WrappedComponent, SpinnerComponent) => {
    class WithCurrentLocation extends React.Component {
        componentDidMount() {
            this.dispatchCurrentLocation();
        }

        componentDidUpdate() {
            this.dispatchCurrentLocation();
        }

        dispatchCurrentLocation() {
            const { dispatch, currentId, match } = this.props;
            if (!currentId || currentId !== match.params.id) {
                dispatch(setCurrentId(match.params.id));
            }
        }


        render() {
            const { currentLocation, currentId, LIST_URL } = this.props;

            if (!currentLocation && currentId) {
                return <Redirect to={LIST_URL} />;
            }

            if (!currentLocation) {
                return SpinnerComponent ? <SpinnerComponent /> : <Spinner />;
            }

            return <WrappedComponent currentLocation={currentLocation} {...this.props} />;
        }
    }

    WithCurrentLocation.propTypes = {
        currentLocation: PropTypes.object,
        currentId: PropTypes.string,
        LIST_URL: PropTypes.string.isRequired,
        match: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    WithCurrentLocation.defaultProps = {
        currentLocation: undefined,
        currentId: undefined,
    };

    const WithCurrentLocationWithRouter = withRouter(WithCurrentLocation);

    const mapStateToProps = (state, ownProps) => ({
        currentLocation: currentLocationSelector(state),
        currentId: currentIdSelector(state),
        LIST_URL: listUrlSelector(state),
        match: ownProps.match,
    });

    const WithCurrentLocationWithRouterContainer = connect(mapStateToProps)(WithCurrentLocationWithRouter);

    return WithCurrentLocationWithRouterContainer;
};

