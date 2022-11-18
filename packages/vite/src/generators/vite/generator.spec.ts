import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';
import { uniq } from '@nrwl/nx-plugin/testing';

import generator from './generator';
import { ViteGeneratorSchema } from './schema';

describe('vite generator', () => {
  let appTree: Tree;
  const options: ViteGeneratorSchema = { name: uniq('test') };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, options.name);
    expect(config).toBeDefined();
  });

  it('should create files properly named', async () => {
    await generator(appTree, options);
    expect(appTree.exists('libs/index.html')).toBeDefined();
    expect(appTree.exists(`libs/${options.name}.ts`)).toBeDefined();
  });
});
