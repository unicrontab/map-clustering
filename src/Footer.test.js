import React from 'react';
import renderer from 'react-test-renderer';
import Footer from './Footer';

test('Render the footer', () => {
    const rendered = renderer.create(
        <Footer />
    );
    expect(rendered.toJSON).not.toBeNull();
});