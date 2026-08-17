$ErrorActionPreference = "Continue"
$env:FIREBASE_DATA_CONNECT_EMULATOR_HOST = "127.0.0.1:9399"
$browser = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$url = "http://127.0.0.1/clubox/#/formulario/demo-deportista-10000000"
$profilePath = Join-Path $env:TEMP "clubox-p02-chrome-screenshot-$PID"
$screenshotPath = Join-Path $env:TEMP "clubox-p02-public-$PID.png"
$tabletPath = Join-Path $env:TEMP "clubox-p02-public-tablet-$PID.png"
$mobilePath = Join-Path $env:TEMP "clubox-p02-public-mobile-$PID.png"

$arguments = @(
  "--headless=new", "--disable-gpu", "--no-first-run", "--user-data-dir=$profilePath",
  "--virtual-time-budget=8000", "--window-size=1280,1100", "--screenshot=$screenshotPath", $url
)
Start-Process -FilePath $browser -ArgumentList $arguments -Wait -WindowStyle Hidden
if (!(Test-Path -LiteralPath $screenshotPath)) {
  [Console]::Error.WriteLine("PUBLIC_SCREENSHOT_NOT_CREATED")
  exit 1
}
$tabletArguments = @(
  "--headless=new", "--disable-gpu", "--no-first-run", "--user-data-dir=$profilePath-tablet",
  "--virtual-time-budget=8000", "--window-size=768,1024", "--screenshot=$tabletPath", $url
)
Start-Process -FilePath $browser -ArgumentList $tabletArguments -Wait -WindowStyle Hidden
if (!(Test-Path -LiteralPath $tabletPath)) {
  [Console]::Error.WriteLine("PUBLIC_TABLET_SCREENSHOT_NOT_CREATED")
  exit 1
}
$mobileArguments = @(
  "--headless=new", "--disable-gpu", "--no-first-run", "--user-data-dir=$profilePath-mobile",
  "--virtual-time-budget=8000", "--window-size=390,844", "--screenshot=$mobilePath", $url
)
Start-Process -FilePath $browser -ArgumentList $mobileArguments -Wait -WindowStyle Hidden
if (!(Test-Path -LiteralPath $mobilePath)) {
  [Console]::Error.WriteLine("PUBLIC_MOBILE_SCREENSHOT_NOT_CREATED")
  exit 1
}
Write-Host "P02_BROWSER_SCREENSHOT_OK: $screenshotPath"
Write-Host "P02_BROWSER_TABLET_OK: $tabletPath"
Write-Host "P02_BROWSER_MOBILE_OK: $mobilePath"
