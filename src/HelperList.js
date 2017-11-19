/* eslint-disable class-methods-use-this */
import React from 'react';
import './HelperList.css';
import { List, ListItem } from 'material-ui/List';
import { primary, secondary, clusterColors } from './theme';


class HelperList extends React.Component {
    render() {
        console.log(this.props.addresses)
        if (this.props.addresses.length) return null;
        return (
            <List style={{ backgroundColor: primary }}>
                <ListItem
                    primaryText='Enter addresses on the left (or just use the defaults)'
                    key={1}
                    style={{ color: secondary, padding: '0px !important' }}
                />
                <ListItem
                    primaryText='Select the algorithm you want to use for clustering'
                    secondaryText='(some models require at least 10 addresses)'
                    key={2}
                    style={{ color: secondary, padding: '0px !important' }}
                />
                <ListItem
                    primaryText='Select the number of clusters you want'
                    secondaryText='(you cannot have more clusters than addresses)'
                    key={3}
                    style={{ color: secondary, padding: '0px !important' }}
                />
                <ListItem
                    primaryText='Click CLUSTER ADDRESSES'
                    key={4}
                    style={{ color: secondary, padding: '0px !important' }}
                />
            </List>
        );
    }
}

export default HelperList;
