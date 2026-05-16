Write-Host ""
Write-Host "========== AZZURE DEV LAB ==========" -ForegroundColor Cyan
Write-Host ""

$branch = git branch --show-current
$lastCommit = git log -1 --pretty=format:"%h - %s"
$status = git status --short
$commitCount = git rev-list --count HEAD

Write-Host "Branch atual:" -ForegroundColor Yellow
Write-Host $branch

Write-Host ""
Write-Host "Total de commits:" -ForegroundColor Yellow
Write-Host $commitCount

Write-Host ""
Write-Host "Último commit:" -ForegroundColor Yellow
Write-Host $lastCommit

Write-Host ""
Write-Host "Arquivos modificados:" -ForegroundColor Yellow

if ($status) {
    Write-Host $status
}
else {
    Write-Host "Nenhuma alteração pendente." -ForegroundColor Green
}

Write-Host ""
Write-Host "===================================="