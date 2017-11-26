import React from 'react';
import ReactDOM from 'react-dom';
import LoadingIndicator from './LoadingIndicator';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

test('Loading Indicator not loading', () => {
    const rendered = renderer.create(
        <LoadingIndicator loading={false} />
    ).toJSON();
    expect(rendered).toBeNull();
});
