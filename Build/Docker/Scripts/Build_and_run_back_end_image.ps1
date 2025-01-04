$distDestinationDir = "\\wsl.localhost\Ubuntu-24.04\home\ajacquot\Documents\LiveLogger\Docker\Back-end"
docker build -t livelogger-backend $distDestinationDir
docker run -d -p 3000:3000 --name NxtStp-LiveLogger-Backend livelogger-backend