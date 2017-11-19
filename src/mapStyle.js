
import { white, black } from './theme';
const mapStyle = [
    {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: white,
            },
            {
                lightness: -50,
            },
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                color: black,
            },
            {
                lightness: 13,
            },
        ],
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: black,
            },
        ],
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#006655',
            },
            {
                lightness: 14,
            },
            {
                weight: 1.4,
            },
        ],
    },
    {
        featureType: 'landscape',
        elementType: 'all',
        stylers: [
            {
                color: '#004d40',
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
            {
                color: '#006655',
            },
            {
                lightness: 5,
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#000000',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#004d40',
            },
            {
                lightness: 25,
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'labels',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#000000',
            },
        ],
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#00332b',
            },
            {
                lightness: 16,
            },
        ],
    },
    {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [
            {
                color: black,
            },
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'transit',
        elementType: 'all',
        stylers: [
            {
                color: '#006655',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'all',
        stylers: [
            {
                color: '#001a15',
            },
        ],
    },
];

export default mapStyle;
