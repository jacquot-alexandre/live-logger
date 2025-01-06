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

# Define the destination directory of the distribution files related to reverse proxy server
$nginxDestinationDir = $wslDistroDir+"\home\ajacquot\Documents\LiveLogger\Docker\Nginx"

$liveloggerRootDir = $xml.root.liveloggerRootPath

#Dockerfile source directory
$DockerfileSourceDir = $liveloggerRootDir+"\Build\Docker\Nginx"

# Copy the dockerfile and nginx configuration file into its destination directory

Copy-Item -Path $DockerfileSourceDir\Dockerfile -Destination $nginxDestinationDir

Write-Output "Dockerfile copied successfully from $DockerfileSourceDir to $nginxDestinationDir"

Copy-Item -Path $DockerfileSourceDir\nginx.conf -Destination $nginxDestinationDir

Write-Output "Nginx configuration copied successfully from $DockerfileSourceDir to $nginxDestinationDir"

# Copy the docker compose file into its destination directory.

# Docker compose file destination directory
$ComposefileDestinationDir = Split-Path -Path $nginxDestinationDir

# Docker compose file source directory
$ComposefileSourceDir = $liveloggerRootDir+"\Build\Docker\"

# Copy the docker compose file into its destination directory

Copy-Item -Path $ComposefileSourceDir\docker-compose.yml -Destination $ComposefileDestinationDir

Write-Output "Docker compose file copied successfully from $ComposefileSourceDir to $ComposefileDestinationDir"

# Restore the original directory
Set-Location $originalDirectory
