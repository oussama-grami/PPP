# Script to build and push Docker images for PPP project

# Function to check if Docker is installed and running
function Check-Docker {
    try {
        $dockerVersion = docker --version
        Write-Host "Docker is installed: $dockerVersion" -ForegroundColor Green
        
        $dockerStatus = docker info
        Write-Host "Docker is running." -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "Error: Docker is not installed or not running." -ForegroundColor Red
        Write-Host "Please install Docker Desktop and make sure it's running." -ForegroundColor Red
        return $false
    }
}

# Function to build and push a Docker image
function Build-And-Push-Image {
    param (
        [string]$dockerfilePath,
        [string]$fullImageName
    )
    
    # Navigate to the directory containing the Dockerfile
    $dockerfileDir = Split-Path -Parent $dockerfilePath
    Push-Location $dockerfileDir
    
    try {
        # Build the Docker image
        Write-Host "Building Docker image: $fullImageName" -ForegroundColor Cyan
        docker build -t $fullImageName -f $dockerfilePath .
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Error: Failed to build Docker image." -ForegroundColor Red
            return $false
        }
        
        # Push the Docker image to Docker Hub
        Write-Host "Pushing Docker image to Docker Hub: $fullImageName" -ForegroundColor Cyan
        docker push $fullImageName
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Error: Failed to push Docker image to Docker Hub." -ForegroundColor Red
            return $false
        }
        
        Write-Host "Successfully built and pushed: $fullImageName" -ForegroundColor Green
        return $true
    }
    finally {
        # Return to the original directory
        Pop-Location
    }
}

# Main script

# Check if Docker is installed and running
if (-not (Check-Docker)) {
    exit 1
}

# Login to Docker Hub (optional - uncomment if needed)
# Write-Host "Please login to Docker Hub if not already logged in" -ForegroundColor Yellow
# docker login

# Define paths to Dockerfiles
$frontDockerfilePath = "$PSScriptRoot\front\Dockerfile"
$backDockerfilePath = "$PSScriptRoot\back\Ecopilot\Dockerfile"

# Define image names
$frontImageName = "azizdh091/ecopilot:latest"
$backImageName = "azizdh091/ecopilot-back:latest"

# Build and push front-end Docker image
Write-Host "\nBuilding and pushing front-end Docker image..." -ForegroundColor Yellow
$frontSuccess = Build-And-Push-Image -dockerfilePath $frontDockerfilePath -fullImageName $frontImageName

# Build and push back-end Docker image
Write-Host "\nBuilding and pushing back-end Docker image..." -ForegroundColor Yellow
$backSuccess = Build-And-Push-Image -dockerfilePath $backDockerfilePath -fullImageName $backImageName

# Summary
Write-Host "\n===== Build and Push Summary =====" -ForegroundColor Magenta
if ($frontSuccess) {
    Write-Host "Front-end: SUCCESS - $frontImageName" -ForegroundColor Green
} else {
    Write-Host "Front-end: FAILED - $frontImageName" -ForegroundColor Red
}

if ($backSuccess) {
    Write-Host "Back-end: SUCCESS - $backImageName" -ForegroundColor Green
} else {
    Write-Host "Back-end: FAILED - $backImageName" -ForegroundColor Red
}

Write-Host "\nScript completed." -ForegroundColor Green