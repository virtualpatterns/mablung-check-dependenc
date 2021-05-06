#!/usr/bin/env node

import '@virtualpatterns/mablung-source-map-support/install';
import { createRequire as CreateRequire } from 'module';
import Command from 'commander';
import FileSystem from 'fs-extra';
import Is from '@pwn/is';
import JSON5 from 'json5';
import Path from 'path';

import { Check } from '../library/check.js';

const Process = process;
const Require = CreateRequire(import.meta.url);

const Package = JSON5.parse(FileSystem.readFileSync(Require.resolve('../../package.json')), { 'encoding': 'utf-8' });

Command.
version(Package.version).
option('--project-path <path>', 'Path of the project to check', '.') // Process.cwd())
.option('--configuration-path <path>', 'Path of the configuration file, if it exists', './check-dependency.json').
option('--report-missing', 'Report missing dependencies', true).
option('--no-report-missing', 'Do not report missing dependencies').
option('--report-unused', 'Report used dependencies', true).
option('--no-report-unused', 'Do not report used dependencies').
option('--report-used', 'Report used dependencies', false).
action(async (option) => {

  try {

    let path = option.projectPath;
    let configuration = null;

    if (await FileSystem.pathExists(option.configurationPath)) {
      configuration = JSON5.parse(await FileSystem.readFile(option.configurationPath, { 'encoding': 'utf-8' }));
    } else {
      configuration = {};
    }

    let dependency = await Check(path, configuration);
    process.exitCode = 0;

    if (Is.not.emptyObject(dependency.missing) &&
    option.reportMissing) {

      let missingDependency = null;
      missingDependency = Object.entries(dependency.missing);
      missingDependency = missingDependency.sort(([leftDependency], [rightDependency]) => leftDependency.localeCompare(rightDependency));

      console.log('-'.repeat(80));
      console.log('Missing dependencies');
      console.log('-'.repeat(80));

      missingDependency.forEach(([dependency, path]) => {
        console.log(`${dependency} used in ...`);
        console.log(path.sort().map((path) => `  ${Path.relative('', path)}`).join('\n'));
      });

      console.log();

      process.exitCode = 1;

    }

    if (dependency.unused.length > 0 &&
    option.reportUnused) {

      console.log('-'.repeat(80));
      console.log('Unused dependencies');
      console.log('-'.repeat(80));
      console.log(dependency.unused.sort().map((dependency) => `${dependency}`).join('\n'));
      console.log();

      process.exitCode = 1;

    }

    if (Is.not.emptyObject(dependency.used) &&
    option.reportUsed) {

      let usedDependency = null;
      usedDependency = Object.entries(dependency.used);
      usedDependency = usedDependency.sort(([leftDependency], [rightDependency]) => leftDependency.localeCompare(rightDependency));

      console.log('-'.repeat(80));
      console.log('Used dependencies');
      console.log('-'.repeat(80));

      usedDependency.forEach(([dependency, path]) => {
        console.log(`${dependency} used in ...`);
        console.log(path.sort().map((path) => `  ${Path.relative('', path)}`).join('\n'));
      });

      console.log();

    }

    // if (process.exitCode === 0) {

    //   console.log('-'.repeat(80))
    //   console.log('There are no dependency issues.')
    //   console.log('-'.repeat(80))

    // }

  } catch (error) {
    console.error(error);
    process.exitCode = 2;
  }

});

Command.parse(Process.argv);
//# sourceMappingURL=check-dependency.js.map