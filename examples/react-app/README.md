# React Example App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Webpack Config

[craco](https://github.com/sharegate/craco) is used in this project to override the Webpack configuration.

[craco.config.js](craco.config.js):

```js
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Insert yaml-nunjucks-loader
      // You will probably have to adjust the loader's position on upgrading CRA/react-scripts
      webpackConfig.module.rules[1].oneOf.unshift({ test: /\.yaml$/, use: 'yaml-nunjucks-loader' });
      return webpackConfig;
    }
  }
};
```

## Code Using YAML Template

```js
import React from 'react';
import logo from './logo.svg';
import './App.css';
import template from './example.yaml';

function App() {
  function renderYaml() {
    return JSON.stringify(template({ items: [
      { name: 'foo', value: 1 },
      { name: 'bar', value: 2 },
      { name: 'baz', value: 3 }
    ] }))
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Rendered Object</h2>
        <textarea>{renderYaml()}</textarea>
      </header>
    </div>
  );
}

export default App;
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: <https://facebook.github.io/create-react-app/docs/code-splitting>

### Analyzing the Bundle Size

This section has moved here: <https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size>

### Making a Progressive Web App

This section has moved here: <https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app>

### Advanced Configuration

This section has moved here: <https://facebook.github.io/create-react-app/docs/advanced-configuration>

### Deployment

This section has moved here: <https://facebook.github.io/create-react-app/docs/deployment>

### `npm run build` fails to minify

This section has moved here: <https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify>
