# 写真の順序を修正するスクリプト
# 実行方法: PowerShellでこのスクリプトを実行してください

$imagesDir = "C:\Users\kanat\.gemini\antigravity\scratch\salon-hangout-lp\images"

Write-Host "写真の順序を修正しています..." -ForegroundColor Green

# 一時ファイル名に変更
Rename-Item "$imagesDir\member-01.jpg" -NewName "temp-01.jpg" -Force
Rename-Item "$imagesDir\member-02.jpg" -NewName "temp-02.jpg" -Force
Rename-Item "$imagesDir\member-03.jpg" -NewName "temp-03.jpg" -Force
Rename-Item "$imagesDir\member-04.jpg" -NewName "temp-04.jpg" -Force
Rename-Item "$imagesDir\member-05.jpg" -NewName "temp-05.jpg" -Force

Write-Host "一時ファイル名に変更完了" -ForegroundColor Yellow

# 正しい順序に変更
# temp-04 (元member-04/門脇さんの位置にあった原さん) → member-01 (原さん)
Rename-Item "$imagesDir\temp-04.jpg" -NewName "member-01.jpg" -Force

# temp-03 (元member-03/おくみさんの位置にあった山本さん) → member-02 (山本さん)
Rename-Item "$imagesDir\temp-03.jpg" -NewName "member-02.jpg" -Force

# temp-05 (元member-05/金谷さんの位置にあったおくみさん) → member-03 (おくみさん)
Rename-Item "$imagesDir\temp-05.jpg" -NewName "member-03.jpg" -Force

# temp-02 (元member-02/山本さんの位置にあった門脇さん) → member-04 (門脇さん)
Rename-Item "$imagesDir\temp-02.jpg" -NewName "member-04.jpg" -Force

# temp-01 (元member-01/原さんの位置にあった金谷さん) → member-05 (金谷さん)
Rename-Item "$imagesDir\temp-01.jpg" -NewName "member-05.jpg" -Force

Write-Host "写真の順序修正が完了しました！" -ForegroundColor Green
Write-Host ""
Write-Host "修正後の順序:" -ForegroundColor Cyan
Write-Host "member-01.jpg: 原 和己" -ForegroundColor White
Write-Host "member-02.jpg: 山本 智大" -ForegroundColor White
Write-Host "member-03.jpg: おくみ" -ForegroundColor White
Write-Host "member-04.jpg: 門脇 幸平" -ForegroundColor White
Write-Host "member-05.jpg: 金谷 武士" -ForegroundColor White
