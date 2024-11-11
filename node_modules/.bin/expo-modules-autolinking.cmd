@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\expo-modules-autolinking\bin\expo-modules-autolinking.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\..\expo-modules-autolinking\bin\expo-modules-autolinking.js" %*
)