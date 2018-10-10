import React from 'react';

const Authenticate = PassedComponent =>
    class extends React.Component {
        render() {
            return <PassedComponent />;
        }
    };

export default Authenticate;

//Take in a component as an argument, return a class component.
//In render(), return component that gets passed into it.