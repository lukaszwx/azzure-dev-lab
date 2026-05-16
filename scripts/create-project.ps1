Write-Host ""
Write-Host "===== AZZURE PROJECT GENERATOR =====" -ForegroundColor Cyan
Write-Host ""

$name = Read-Host "Nome do projeto"

Write-Host ""
Write-Host "1 - API"
Write-Host "2 - BOT"
Write-Host "3 - SCRIPT"
Write-Host "4 - WEB"

$type = Read-Host "Escolha"

$projectPath = ".\projects\$name"

if(Test-Path $projectPath){
    Write-Host ""
    Write-Host "Projeto já existe." -ForegroundColor Red
    exit
}

New-Item -ItemType Directory -Path $projectPath | Out-Null
New-Item -ItemType Directory -Path "$projectPath\src" | Out-Null

switch($type){
    "1" {$projectType = "API"}
    "2" {$projectType = "BOT"}
    "3" {$projectType = "SCRIPT"}
    "4" {$projectType = "WEB"}
    default {$projectType = "GERAL"}
}

@"
# $name

Tipo: $projectType

## Objetivo

Descreva aqui o objetivo do projeto.
"@ | Set-Content "$projectPath\README.md"

@"
node_modules
.env
dist
"@ | Set-Content "$projectPath\.gitignore"

@"
console.log("Azzure Systems :: $name iniciado")
"@ | Set-Content "$projectPath\src\index.ts"

@"
{
  "name":"$name",
  "version":"1.0.0",
  "scripts":{
      "dev":"tsx src/index.ts"
  }
}
"@ | Set-Content "$projectPath\package.json"

Write-Host ""
Write-Host "Projeto criado com sucesso." -ForegroundColor Green