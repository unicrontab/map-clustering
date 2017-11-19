import React from 'react';
import ReactDOM from 'react-dom';
import Intro from './Intro';
import { shallow } from 'enzyme';

test('Render the Intro', () => {
    const testTitle = 'Test Title';
    const testSubtitle = 'Test Subtitle';
    const introComponent = shallow(
        <Intro title={testTitle} subtitle={testSubtitle} />
    );
    expect(introComponent.instance().props.title).toEqual(testTitle);
    expect(introComponent.instance().props.subtitle).toEqual(testSubtitle);    
});
