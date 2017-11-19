import React from 'react';
import ReactDOM from 'react-dom';
import Errors from './Errors';
import renderer from 'react-test-renderer';

const error = {
    error: 'error',
    detail: {
        status: 'bad status'
    },
};



test('Do not render the Errors component without any errors', () => {
    const rendered = renderer.create(
        <Errors errors={[]} />
    );
    expect(rendered.toJSON()).toBeNull();    
});

test('Render the Errors component with multiple errors', () => {
    const rendered = renderer.create(
        <Errors errors={[error, error]} />
    );
    expect(rendered.toJSON()[0]).not.toBeNull();
    expect(rendered.toJSON()[1]).not.toBeNull();
});
