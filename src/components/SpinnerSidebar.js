import React from 'react';
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
            {IntroComponent && <IntroComponent/>}
            <Spinner />
        </div>
        <Footer />
    </Sidebar>
);

export const SpinnerSidebarContainer = connect(state => ({
    PAGE_TITLE: pageTitleSelector(state),
}))(SpinnerSidebar);