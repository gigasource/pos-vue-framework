import path from 'path';
import initStoryshots, { multiSnapshotWithOptions, Stories2SnapsConverter } from '@storybook/addon-storyshots';

import registerRequireContextHook from 'babel-plugin-require-context-hook/register';

registerRequireContextHook();
initStoryshots({
  framework: 'vue',
  configPath: path.join(__dirname, '.storybook'),
  //integrityOptions: { cwd: path.join(__dirname, '.storybook', 'stories') },
  test: multiSnapshotWithOptions(),
  stories2snapsConverter: new Stories2SnapsConverter({
    // This puts all my *.snaps.js in a __snapshots__ folder next to my stories folder, the default is to have them next to the *.stories.js files themselves
    snapshotsDirName: './__snapshots__',
    // This just sets the extension to *.snap.js which I like
    snapshotExtension: '.js.snap',
    storiesExtensions: ['.js']
  }),
});
