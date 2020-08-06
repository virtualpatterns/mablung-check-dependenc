#!/usr/bin/env node

import '@virtualpatterns/mablung-source-map-support/install'
import Command from 'commander'
import FileSystem from 'fs-extra'
import Is from '@pwn/is'
import JSON5 from 'json5'
import Path from 'path'

import { Check } from '../library/check.js'

const Package = JSON5.parse(FileSystem.readFileSync('package.json'), { 'encoding': 'utf-8' })
const Process = process

Command
  .version(Package.version)
  .option('--project-path <path>', 'Path of the project to check', Process.cwd())
  .option('--configuration-path <path>', 'Path ...', `${Process.cwd()}/check-dependency.json`)
  .action(async (option) => {

    try {

      let path = option.projectPath
      let configuration = null

      if (FileSystem.pathExists(option.configurationPath)) {
        configuration = JSON5.parse(await FileSystem.readFile(option.configurationPath, { 'encoding': 'utf-8' }))
      } else {
        configuration = {}
      }

      let dependency = await Check(path, configuration)
      
      if (dependency.unused.length > 0) {

        console.log('-'.repeat(80))
        console.log('Unused dependencies')
        console.log('-'.repeat(80))
        console.log(dependency.unused.map((dependency) => `${dependency}`).join('\n'))
        console.log()

        process.exitCode = 1

      }

      if (Is.not.emptyObject(dependency.missing)) {

        let missingDependency = Object.entries(dependency.missing)

        console.log('-'.repeat(80))
        console.log('Missing dependencies')
        console.log('-'.repeat(80))

        missingDependency.forEach(([dependency, path]) => {
          console.log(`'${dependency}' used in ...`)
          console.log(path.map((path) => `  ${Path.relative('', path)}`).join('\n'))
        })

        console.log()

        process.exitCode = 1

      }

      if (dependency.unused.length <= 0 &&
          Is.emptyObject(dependency.missing)) {
        
        console.log('-'.repeat(80))
        console.log('There are no dependency issues.')
        console.log('-'.repeat(80))

        process.exitCode = 0

      }
      
    } catch (error) {
      console.error(error)
      process.exitCode = 2
    }

  })

Command.parse(Process.argv)
