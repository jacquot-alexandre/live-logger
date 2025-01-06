# Save the current directory $originalDirectory
$originalDirectory = Get-Location

# move to in the directory where the current script is located
$scriptDirectory = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptDirectory

# Define the path to the XML file relative to the script
$xmlFilePath = "../paths.xml"

# Load the XML file
$xml = [xml](Get-Content $xmlFilePath)

# Extract the path value
$wslDistroDir = $xml.root.wslDistroPath

# Define the destination directory of distribution files related to the server (html, js)
$distDestinationDir = $wslDistroDir+"\home\ajacquot\Documents\LiveLogger\Docker\Back-end\dist"

$liveloggerRootDir = $xml.root.liveloggerRootPath

# Define the source directory
$distSourceDir = $liveloggerRootDir+"\LiveLogger-Net-TypeScript_NodeJs-Angular\NxtStp-LiveLogger-Backend\NxtStp.Node-TypeScript.LiveLogger-main\dist"

# Remove all child items in the destination directory
Get-ChildItem $distDestinationDir | ForEach-Object { Remove-Item $_.FullName -Recurse -Force }

Write-Output "All child items in '$distDestinationDir' have been deleted."

# Copy all items from the source directory to the destination directory
Copy-Item -Path $distSourceDir\* -Destination $distDestinationDir -Recurse -Force

Write-Output "html and js files copied successfully from $distSourceDir to $distDestinationDir"

# Dockerfile destination directory
$DockerfileDestinationDir = Split-Path -Path $distDestinationDir

#Dockerfile source directory
$DockerfileSourceDir = $liveloggerRootDir+"\Build\Docker\Back-end"

# Copy the dockerfile into its destination directory

Copy-Item -Path $DockerfileSourceDir\Dockerfile -Destination $DockerfileDestinationDir

Write-Output "Dockerfile copied successfully from $DockerfileSourceDir to $DockerfileDestinationDir"

# Depedencies description file (package*.json) source directory
$DependenciesSourceDir = Split-Path -Path $distSourceDir

# Copy the dependencies file into its destination directory

Copy-Item -Path $DependenciesSourceDir\package.json -Destination $DockerfileDestinationDir
Copy-Item -Path $DependenciesSourceDir\package-lock.json -Destination $DockerfileDestinationDir

Write-Output "package*.json copied successfully from $DependenciesSourceDir to $DockerfileDestinationDir"

# Restore the original directory
Set-Location $originalDirectory
