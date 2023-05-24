# Pasos a seguir para deploy

[Requirements]

Tener instalado Node.js

Ejecutar el comando "npm install" desde la terminal desde el directorio SRC

[header]

# Codigo fuente web frontend

[section]

# Conexiones

Crear archivo .env dentro del directorio frontend con la siguiente estructura:

REACT_APP_HTTP_HOST = (url)

REACT_APP_HTTP_PORT = (puerto)

REACT_APP_HTTP_PORTWS = (puerto webSocket)

REACT_APP_DEVELOP = "false"

REACT_APP_LOCATION_MAP = '[13.6637543, -88.5593211]'

REACT_APP_MAP_ZOOM_GENERAL = 9

REACT_APP_MAP_ZOOM_SPECIFIC = 10

# Correr proyecto

Ejecutar el comando "npm start" dentro del directorio SRC
