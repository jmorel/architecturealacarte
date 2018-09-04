import React from 'react';
import { Footer } from '../../../components/Footer';
import { ListHeader } from '../../../components/Header';
import { Sidebar } from '../../../components/Sidebar';
import { Spinner } from '../../../components/Spinner';

export function EteArchiSpinnerSidebar() {
    return (
        <Sidebar>
            <ListHeader title="L'ete archi de David Abittan" />
            <div className="Sidebar-content">
                <Spinner/>
            </div>
            <Footer />
        </Sidebar>
    );
}