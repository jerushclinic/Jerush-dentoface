param(
    [string]$PdfPath = "content/services/dental/periodontal-gum-care/scaling-curettage.pdf",
    [string]$OutputDir = "scratch/scaling_pdf_pages"
)

Add-Type -AssemblyName System.Runtime.WindowsRuntime

$asTaskGeneric = [System.WindowsRuntimeSystemExtensions].GetMethods() | ? { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' }[0]
$asTaskAction = [System.WindowsRuntimeSystemExtensions].GetMethods() | ? { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncAction' }[0]

Function AwaitOp($WinRtTask, $ResultType) {
    $asTask = $asTaskGeneric.MakeGenericMethod($ResultType)
    $netTask = $asTask.Invoke($null, @($WinRtTask))
    $netTask.Wait(-1) | Out-Null
    $netTask.Result
}

Function AwaitAction($WinRtAction) {
    $netTask = $asTaskAction.Invoke($null, @($WinRtAction))
    $netTask.Wait(-1) | Out-Null
}

[Windows.Data.Pdf.PdfDocument, Windows.Data.Pdf, ContentType = WindowsRuntime] | Out-Null

$fullPath = [System.IO.Path]::GetFullPath($PdfPath)
if (!(Test-Path $fullPath)) {
    Write-Error "PDF not found: $fullPath"
    exit 1
}

if (!(Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
}

$fileStream = [System.IO.File]::OpenRead($fullPath)
$winRtStream = [System.IO.WindowsRuntimeStreamExtensions]::AsRandomAccessStream($fileStream)
$pdfDoc = AwaitOp ([Windows.Data.Pdf.PdfDocument]::LoadFromStreamAsync($winRtStream)) ([Windows.Data.Pdf.PdfDocument])

Write-Host "PDF Pages: $($pdfDoc.PageCount)"

for ($i = 0; $i -lt $pdfDoc.PageCount; $i++) {
    $page = $pdfDoc.GetPage($i)
    $outPng = [System.IO.Path]::Combine([System.IO.Path]::GetFullPath($OutputDir), "page_$($i+1).png")
    $outFileStream = [System.IO.File]::Create($outPng)
    $outWinRtStream = [System.IO.WindowsRuntimeStreamExtensions]::AsRandomAccessStream($outFileStream)
    
    $options = New-Object Windows.Data.Pdf.PdfPageRenderOptions
    $options.DestinationWidth = 1400
    
    AwaitAction ($page.RenderToStreamAsync($outWinRtStream, $options))
    
    $outWinRtStream.Dispose()
    $outFileStream.Dispose()
    $page.Dispose()
    Write-Host "Successfully rendered page $($i+1) to $outPng"
}

$winRtStream.Dispose()
$fileStream.Dispose()

