import {connect} from 'react-redux';
import {compose} from 'redux';//unique syntax for HOC's. 
import {selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

const mapStateToProps = state => ({
    isLoading: selectIsCollectionFetching(state)
});

const CollectionsOverviewContainer = compose(//evaluates from right to left. first WithSpinner then connect(mapStateToProps)
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;