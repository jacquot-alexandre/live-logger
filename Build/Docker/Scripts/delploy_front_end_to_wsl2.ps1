# Define the destination directory
$distDestinationDir = "\\wsl.localhost\Ubuntu-24.04\home\ajacquot\Documents\LiveLogger\Docker\Front-end\dist"

# Define the source a directory
$distSourceDir = "C:\Users\Ich\Documents\0000_Github\live-logger\LiveLogger-Net-TypeScript_NodeJs-Angular\NxtStp-LiveLogger-Frontend\dist\NxtStp-LiveLogger-front\browser"

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
$DockerfileSourceDir = "C:\Users\Ich\Documents\0000_Github\live-logger\Build\Docker\Front-end"

# Copy the dockerfile into its destination directory

Copy-Item -Path $DockerfileSourceDir\Dockerfile -Destination $DockerfileDestinationDir

Write-Output "Dockerfile copied successfully from $DockerfileSourceDir to $DockerfileDestinationDir"