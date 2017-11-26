import React from 'react';
import ReactDOM from 'react-dom';
import HelperList from './HelperList';
import renderer from 'react-test-renderer';


test('Render the Helper List', () => {
    const rendered = renderer.create(
        <HelperList addresses={['test','test2']}/>
    );
    expect(rendered).not.toBeNull();
})