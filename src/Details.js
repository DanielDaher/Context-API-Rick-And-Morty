import React from 'react';

export default class Details extends React.Component {
    render() {
        return (<div>
            Olá {this.props.match.params.id}
        </div>);
    };
};