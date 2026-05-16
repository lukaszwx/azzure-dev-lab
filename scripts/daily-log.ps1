$logPath = ".\docs\diario.md"
$date = Get-Date -Format "dd/MM/yyyy HH:mm"
$branch = git branch --show-current
$lastCommit = git log -1 --pretty=format:"%h - %s"

Write-Host ""
Write-Host "===== AZZURE DAILY LOG =====" -ForegroundColor Cyan
Write-Host ""

Write-Host "Digite as tarefas feitas hoje."
Write-Host "Quando terminar, pressione ENTER vazio."
Write-Host ""

$tasks = @()

while ($true) {
    $task = Read-Host "Tarefa"

    if ([string]::IsNullOrWhiteSpace($task)) {
        break
    }

    $tasks += $task
}

if ($tasks.Count -eq 0) {
    Write-Host ""
    Write-Host "Nenhuma tarefa informada. Log cancelado." -ForegroundColor Yellow
    exit
}

$content = @"

## [$date]

**Branch:** $branch  
**Último commit:** $lastCommit

### Tarefas realizadas

"@

foreach ($task in $tasks) {
    $content += "- $task`n"
}

$content += @"

---

"@

Add-Content -Path $logPath -Value $content

Write-Host ""
Write-Host "Log salvo em docs/diario.md" -ForegroundColor Green