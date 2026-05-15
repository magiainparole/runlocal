<#
.SYNOPSIS
    Add, commit and push the current working tree of the RunLocal project.

.DESCRIPTION
    Wraps the three-step git workflow that this project uses every day:
    pull --rebase, add ., commit, push. Pulls first so the weekly
    GitHub Action commit on data/trending.json never blocks the push.

.PARAMETER Message
    Commit message. If omitted, prompts for one interactively.

.EXAMPLE
    .\publish.ps1 "ui: enlarge header logo"

.EXAMPLE
    .\publish.ps1
    # then types the message when prompted
#>

param(
    [Parameter(Position = 0)]
    [string]$Message
)

$ErrorActionPreference = "Stop"

# Move to the script directory so the script works regardless of where it
# is invoked from.
Set-Location -Path $PSScriptRoot

# Make sure we are inside a git repository.
$insideRepo = git rev-parse --is-inside-work-tree 2>$null
if ($insideRepo -ne "true") {
    Write-Host "Not a git repository in $PSScriptRoot." -ForegroundColor Red
    exit 1
}

# Step 1: pull with rebase to absorb any remote commits (the GitHub Action
# is the most likely source of those). --autostash temporarily stashes any
# uncommitted working tree changes and reapplies them after the rebase, so
# the pull works even when you have edits in flight.
Write-Host "[1/4] Pulling remote changes with rebase (autostash on)..." -ForegroundColor Cyan
git pull --rebase --autostash
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "Pull/rebase failed." -ForegroundColor Yellow
    Write-Host "If the message mentions conflicts, resolve them and run:" -ForegroundColor Yellow
    Write-Host "  git rebase --continue" -ForegroundColor Yellow
    Write-Host "  .\publish.ps1 `"$Message`"" -ForegroundColor Yellow
    Write-Host "If the stash was applied but other steps failed, run:" -ForegroundColor Yellow
    Write-Host "  git stash list" -ForegroundColor Yellow
    Write-Host "  git stash pop" -ForegroundColor Yellow
    exit 1
}

# Step 2: stage everything in the working tree.
Write-Host "[2/4] Staging changes..." -ForegroundColor Cyan
git add .

# If nothing is staged, exit clean.
$staged = git diff --cached --name-only
if (-not $staged) {
    Write-Host "Nothing to commit. Working tree clean." -ForegroundColor Green
    exit 0
}

Write-Host "Staged files:" -ForegroundColor DarkGray
$staged | ForEach-Object { Write-Host "  $_" -ForegroundColor DarkGray }

# Step 3: commit. Ask for a message if not provided.
if (-not $Message) {
    Write-Host ""
    $Message = Read-Host "Commit message"
    if (-not $Message) {
        Write-Host "Empty commit message. Aborting." -ForegroundColor Red
        exit 1
    }
}

Write-Host "[3/4] Committing..." -ForegroundColor Cyan
git commit -m "$Message"
if ($LASTEXITCODE -ne 0) {
    Write-Host "Commit failed." -ForegroundColor Red
    exit 1
}

# Step 4: push to remote.
Write-Host "[4/4] Pushing to remote..." -ForegroundColor Cyan
git push
if ($LASTEXITCODE -ne 0) {
    Write-Host "Push failed. The commit is local, fix and run 'git push' manually." -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Done. Vercel will pick up the new commit in a couple of minutes." -ForegroundColor Green
