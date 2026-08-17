$ErrorActionPreference = "Continue"
$env:FIREBASE_DATA_CONNECT_EMULATOR_HOST = "127.0.0.1:9399"
$publicFile = "dataconnect/clubox/public.gql"
$stateFile = "dataconnect/p02_state_tests.gql"
$slugVars = "@dataconnect/p02_slug_vars.json"

function Invoke-DataConnect([string]$file, [string]$operation, [string]$variables = "") {
  if ($variables) {
    $result = & firebase.cmd dataconnect:execute $file $operation --vars $variables 2>&1
  } else {
    $result = & firebase.cmd dataconnect:execute $file $operation 2>&1
  }
  if ($LASTEXITCODE -ne 0) { throw ($result -join "`n") }
  return ($result -join "`n")
}

try {
  $active = Invoke-DataConnect $publicFile "GetPublicForm" $slugVars
  if ($active -notmatch 'Alta deportista' -or $active -notmatch 'firstName') { throw "ACTIVE_FORM_READ_FAILED" }

  $submitVars = "@dataconnect/p02_submit_vars.json"
  $submit = Invoke-DataConnect $publicFile "SubmitPublicInscription" $submitVars
  if ($submit -notmatch 'inscription_insert') { throw "PUBLIC_SUBMIT_FAILED" }
  $persisted = Invoke-DataConnect $stateFile "LocalP02SubmittedInscription"
  if ($persisted -notmatch 'P02Frontend' -or $persisted -notmatch 'RECIBIDA') { throw "INSCRIPTION_NOT_PERSISTED" }

  Invoke-DataConnect $stateFile "LocalP02DeactivateDemoForm" | Out-Null
  $inactive = Invoke-DataConnect $publicFile "GetPublicForm" $slugVars
  if ($inactive -notmatch '"forms": \[\]') { throw "INACTIVE_FORM_WAS_PUBLIC" }

  $failedSubmit = & firebase.cmd dataconnect:execute $publicFile "SubmitPublicInscription" --vars $submitVars 2>&1
  if ($LASTEXITCODE -eq 0 -or ($failedSubmit -join "`n") -notmatch 'Active form not found') {
    throw "INACTIVE_FORM_ACCEPTED_SUBMISSION"
  }

  Invoke-DataConnect $stateFile "LocalP02ActivateDemoForm" | Out-Null
  $reactivated = Invoke-DataConnect $publicFile "GetPublicForm" $slugVars
  if ($reactivated -notmatch 'Alta deportista') { throw "FORM_REACTIVATION_FAILED" }
  Write-Output "P02_PUBLIC_FLOW_OK"
} finally {
  Invoke-DataConnect $stateFile "LocalP02ActivateDemoForm" | Out-Null
}
