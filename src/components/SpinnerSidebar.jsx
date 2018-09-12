import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pageTitleSelector } from '../selectors';
import { Footer } from './Footer';
import { ListHeader } from './Header';
import { Sidebar } from './Sidebar';
import { Spinner } from './Spinner';

export const SpinnerSidebar = ({ PAGE_TITLE, IntroComponent }) => (
    <Sidebar>
        <ListHeader title={PAGE_TITLE} />
        <div className="Sidebar-content">
            {IntroComponent && <IntroComponent />}
            <Spinner />
        </div>
        <Footer />
    </Sidebar>
);

SpinnerSidebar.propTypes = {
    PAGE_TITLE: PropTypes.string.isRequired,
    IntroComponent: PropTypes.func,
};

SpinnerSidebar.defaultProps = {
    IntroComponent: undefined,
};

export const SpinnerSidebarContainer = connect(state => ({
    PAGE_TITLE: pageTitleSelector(state),
}))(SpinnerSidebar);
