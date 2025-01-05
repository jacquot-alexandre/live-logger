# move to in the directory where the current script is located
$scriptDirectory = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptDirectory

# Define the path to the XML file relative to the script
$xmlFilePath = "../paths.xml"

# Load the XML file
$xml = [xml](Get-Content $xmlFilePath)

# Extract the path value
$wslDistroDir = $xml.root.wslDistroPath

# Define the destination directory of the directory container the server built file (html, js)
$distDestinationDir = $wslDistroDir+"\home\ajacquot\Documents\LiveLogger\Docker\Front-end\dist"

$liveloggerRootDir = $xml.root.liveloggerRootPath

# Define the source a directory
$distSourceDir = $liveloggerRootDir+"\LiveLogger-Net-TypeScript_NodeJs-Angular\NxtStp-LiveLogger-Frontend\dist\NxtStp-LiveLogger-front\browser"

# Get and delete all child items in the specified directory
Get-ChildItem $distDestinationDir | ForEach-Object { Remove-Item $_.FullName -Recurse -Force }

Write-Output "All child items in '$distDestinationDir' have been deleted."

# Get all files and directories from the source directory
$items = Get-ChildItem -Path $distSourceDir -Recurse

# Copy all files from the source directory to the destination directory
foreach ($item in $items) {
    Copy-Item $item.FullName $distDestinationDir;
}

Write-Output "Files copied successfully from $distSourceDir to $distDestinationDir"

# Dockerfile destination directory
$DockerfileDestinationDir = Split-Path -Path $distDestinationDir

#Dockerfile source directory
$DockerfileSourceDir = $liveloggerRootDir+"\Build\Docker\Front-end"

# Copy the dockerfile into its destination directory

Copy-Item -Path $DockerfileSourceDir\Dockerfile -Destination $DockerfileDestinationDir

Write-Output "Dockerfile copied successfully from $DockerfileSourceDir to $DockerfileDestinationDir"

# Convert the path to an array by splitting it on the backslash
$pathArray = $distSourceDir -split '\\'

# Remove the last three elements from the array
$pathArray = $pathArray[0..($pathArray.Length - 4)]

# Join the remaining elements back into a path
$DependenciesSourceDir = ($pathArray -join '\')


# Copy the dependencies file into its destination directory
# Depedencies description file are package*.json

Copy-Item -Path $DependenciesSourceDir\package.json -Destination $DockerfileDestinationDir
Copy-Item -Path $DependenciesSourceDir\package-lock.json -Destination $DockerfileDestinationDir

Write-Output "package*.json copied successfully from $DependenciesSourceDir to $DockerfileDestinationDir"