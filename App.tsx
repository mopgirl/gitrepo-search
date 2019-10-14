import React from 'react';
import FetchView from './src/View/FetchView';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DetailView from './src/View/DetailView';

const APP = createStackNavigator(
    {
        FETCH : {
            screen : FetchView,

        },
        DETAIL : {
            screen : DetailView,
        }
    }
);

export default createAppContainer(APP);
