const defaultAddressRaw = [
    'One Infinite Loop Cupertino, CA 95014',
    '100 Winchester Circle Los Gatos, CA 95032',
    'Boulder Creek',
    'Butano State Park',
    'Memorial County Park',
    'Half Moon Bay',
    'El Granada',
    'Pacifica',
    'Palo Alto',
    'Madrone',
    'Henry W. Coe State Park',
];

export default {
    api: {
        URL: 'https://jspf94pcl2.execute-api.us-west-2.amazonaws.com',
        CLUSTER: 'https://9srf12nq4a.execute-api.us-west-2.amazonaws.com',
    },
    GMapClientSideKey: '<your google maps javascript api key>',
    defaultAddresses: defaultAddressRaw.join('\n'),
};
