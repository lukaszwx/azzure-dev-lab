$date = Get-Date -Format "dd/MM/yyyy HH:mm"

Write-Host ""
Write-Host "===== AZZURE DAILY LOG =====" -ForegroundColor Cyan
Write-Host ""

$entry = Read-Host "O que voce fez hoje"

$content = @"

## [$date]

- $entry

"@

Add-Content -Path ".\docs\diario.md" -Value $content

Write-Host ""
Write-Host "Log salvo com sucesso." -ForegroundColor Green