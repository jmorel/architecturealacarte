import React from 'react';
import { Footer } from '../../../components/Footer';
import { ListHeader } from '../../../components/Header';
import { Sidebar } from '../../../components/Sidebar';
import { Spinner } from '../../../components/Spinner';

export function CinquanteLieuxSpinnerSidebar() {
    return (
        <Sidebar>
            <ListHeader title="Les 50 lieux en France a voir au moins une fois dans sa vie "></ListHeader>
            <div className="Sidebar-content">
                <p>Cette sélection a été composée par les revues <a href="https://www.admagazine.fr/architecture/balade/diaporama/les-50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie/43560">AD</a> et <a href="https://www.vanityfair.fr/">Vanity Fair</a> en supplément de leurs numéros de juin 2017.</p>
                <Spinner/>
            </div>
            <Footer />
        </Sidebar>
    );
}