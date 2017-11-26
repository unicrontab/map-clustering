import React from 'react';
import ReactDOM from 'react-dom';
import AddressInput from './AddressInput';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { mount } from 'enzyme';

const api = ({url, method, headers, body}) => new Promise((resolve, reject) => {
    resolve({ test: 'test' });
});

const handler = event => event;
const createNodeMock = () => ({
    refs: {
        shadow: {
            scrollHeight: 200
        }
    }
});

test('Address Input Renders', async () => {
    const rendered = renderer.create(
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <AddressInput
                onAddressChange={handler}
                handleErrors={handler}
                handleLoading={handler}
            />
        </MuiThemeProvider>
    , { createNodeMock} );
    expect(rendered.toJSON()).not.toBeNull();
});
