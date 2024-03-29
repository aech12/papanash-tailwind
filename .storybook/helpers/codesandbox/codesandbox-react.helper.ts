import lernaJson from '../../../lerna.json';
import { generateCodeSandboxLink } from './codesandbox.helper';

export function generateReactCodeSandboxLink(options) {
  const { components, extensions, code, dependencies } = options;

  const html = `<div class="app" id="root"></div>`;

  const previewCode = `import { ${components.join(', ')} ${
    components.length > 0 && extensions.length > 0 ? ', ' : ''
  }${extensions.join(', ')} } from '@papanasi/react';
import '@papanasi/react/papanasi.css';${[...extensions, ''].join('(); \n')}

const App = () => (${code}
);
`;

  const demoCode = `
import React from 'react';
import ReactDOM from 'react-dom';

${previewCode}

ReactDOM.render(
  <App />,
  document.getElementById("root")
)
`.trim();

  const projectDependencies = {
    ...dependencies,
    react: '16.8.0',
    'react-dom': '16.8.0',
    '@papanasi/react': `${lernaJson.version}`
  };

  const devDependencies = {
    'react-scripts': 'latest'
  };

  const { url } = generateCodeSandboxLink({
    html,
    demoCode,
    dependencies: projectDependencies,
    devDependencies
  });

  return { url, content: previewCode };
}
