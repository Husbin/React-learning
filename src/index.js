import React from 'react';
import ReactDOM from 'react-dom';
import Route from './router/';
import {AppContainer} from 'react-hot-loader'
import "react-hot-loader/patch"
import {Provider} from 'react-redux'
import store from './store/store'
import './utils/setRem';
import './style/base.css';
import FastClick from 'fastclick';
import registerServiceWorker from './registerServiceWorker';


FastClick.attach(document.body);

store.subscribe(() => {
  console.log('store发生了变化');
});

const render = Component => {
    ReactDOM.render(
        //绑定redux、热加载
        <Provider store={store}>
            <AppContainer>
                <Component />
            </AppContainer>
        </Provider>,
        document.getElementById('root'),
    )
}

render(Route);


//Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./router/', () => {
        render(Route);
    })
}
registerServiceWorker();
