# MSA_phase1_2020_DevOps


## azure-pipelines.yml
### *Usage:*
By using the a pipeline it allows users to build, test, and upload automatically and simplifies tasks for group projects. In this case the pipeline is connected to GitHub and operate based on it's activities. This file can be in many different forms, in this case for GitHub it is stored as a ```.yml```. This file contains abstracted code that makes understanding and following all the operations taking place a bit easier.

Any faults that happen in the script can then be picked up by looking at the **jobs** which will give you the section of this file where an error has occured.
  
### Trigger:
```
trigger:
- master
- develop
```
Here the pipeline will kick off depending on if any changes were made in either the ```master``` or ```develop``` branch.

### pool:
```
pool:
  vmImage: 'ubuntu-latest'
  #vmImage: 'macOS-latest'
  #vmImage: 'windows-latest'
```
Here we specify the operating system of the agent that will be running the pipeline. In this case it was specified to *Ubuntu*

### steps:
```
Steps: 
```
Anything under this will be run as a series of terminal commands that will be carried out once the pipeline kicks off. Here is where everything will occure in terms of building, testing, etc. 
```task:``` References an abstracted function that was pre-made already
```displayName:``` What will be displayed when running the steps 

```
- task: NodeTool@0
  inputs:
    versionSpec: '10.x'
  displayName: 'Install Node.js'
```
In this case the pipeline is required to use npm as the project is a react app, there for Node must be installed. Here the specifide version is 10.*something*

```
- script: |
    cd $(rootDir)
    npm install
    npm run build
    cd ..
  displayName: 'npm install and build'
```
```script``` means direct commands that will be entered into the terminal and ```|``` means that the following commands will be entered sequencially. ```npm install``` followed by ```npm run build``` will then build the app and save it into a new folder called *build*. ```cd``` Changes the directory for which the commands will be run in.

```
- task: ArchiveFiles@2
  inputs:
    rootFolderOrFile: '$(buildDir)'
    includeRootFolder: false
    archiveType: 'zip'
    archiveFile: '$(Build.ArtifactStagingDirectory)/$(Build.BuildId).zip'
    replaceExistingArchive: true
```
It will zip up everything in a specified folder

```
- task: PublishBuildArtifacts@1
  inputs:
    PathtoPublish: '$(Build.ArtifactStagingDirectory)'
    ArtifactName: 'drop'
    publishLocation: 'Container'
```
Finally the changes that were made will be published into the actual project. By having this it means if any of the ```triggers``` are activated then changes will be made to the project.

```
variables:
  rootDir: 'my-app'
  buildDir: '$(rootDir)/build'
```
Variables can be defined to improve readability and can later be accessed using $(*variable name*).
