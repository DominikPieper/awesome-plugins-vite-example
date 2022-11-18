import { BuildExecutorSchema } from './schema';
import { ExecutorContext, joinPathFragments } from '@nrwl/devkit';
import { relative } from 'path';
import { build } from 'vite';

export default async function runExecutor(options: BuildExecutorSchema, context: ExecutorContext) {
  console.log('Executor ran for Build', options);

  const projectDir = context.workspace.projects[context.projectName].root;
  const distDir = joinPathFragments(`dist/${projectDir}`);

  await build({
    root: `${context.root}/${projectDir}`,
    build: {
      outDir: relative(projectDir, distDir)
    }
  });

  return {
    success: true,
  };
}
