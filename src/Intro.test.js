import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Intro from './Intro';

test('Render the Intro', () => {
    const testTitle = 'Test Title';
    const testSubtitle = 'Test Subtitle';
    const introWrapper = shallow(
        <Intro title='testTitle' subtitle='testSubTitle' />
    );
    expect(introWrapper.prop('title').toEqual(testTitle));
});
