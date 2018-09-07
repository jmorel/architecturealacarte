import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentPageIndex , resetCurrentId} from '../../../actions';
import { Footer } from '../../../components/Footer';
import { ListHeader } from '../../../components/Header';
import { PaginatedList } from '../../../components/PaginatedList';
import { Sidebar } from '../../../components/Sidebar';
import { mapStateToProps, SECTION_NAME } from '../cinquanteLieuxUtils';
import { CinquanteLieuxLocationCard } from './CinquanteLieuxLocationCard';

export class CinquanteLieuxListSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.setCurrentIndex = this.setCurrentIndex.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(resetCurrentId(SECTION_NAME));
    }

    setCurrentIndex(index) {
        const { dispatch } = this.props;
        dispatch(setCurrentPageIndex(SECTION_NAME, index));
    }

    render() {
        const { pagination, locations } = this.props;
        return (
            <Sidebar>
                <ListHeader title="Les 50 lieux en France a voir au moins une fois dans sa vie "></ListHeader>
                <div className="Sidebar-content">
                    <p>Cette sélection a été composée par les revues <a href="https://www.admagazine.fr/architecture/balade/diaporama/les-50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie/43560">AD</a> et <a href="https://www.vanityfair.fr/">Vanity Fair</a> en supplément de leurs numéros de juin 2017.</p>
                    <PaginatedList currentIndex={pagination.currentIndex} lastIndex={pagination.lastIndex} setCurrentIndex={this.setCurrentIndex}>
                        {locations.currentPageIds
                            .map(id => locations.byId[id])
                            .map(location => (
                                <Link
                                    to={`/50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie/${location.nom}`}
                                    className="CinquanteLieuxLocationCard-link"
                                    key={location.nom}>
                                    <CinquanteLieuxLocationCard title={location.nom} subtitle={location.description} categories={location.categorie} />
                                </Link>
                            ))}
                    </PaginatedList>
                </div>
                <Footer />
            </Sidebar>
        );
    }
}

export const CinquanteLieuxListSidebarContainer = connect(mapStateToProps)(CinquanteLieuxListSidebar)
