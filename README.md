¡Claro que sí! Un buen `README.md` es fundamental para que cualquiera (o tú mismo dentro de unos meses) sepa cómo levantar el proyecto sin volverse loco. 

Como hemos configurado la conexión con un backend externo (Nuxt) y lo hemos preparado para móvil (Android), he incluido las instrucciones exactas para que las conexiones y los tokens JWT funcionen a la primera.

Copia el siguiente texto y pégalo en el archivo `README.md` que está en la raíz de tu proyecto de Quasar (sobreescribiendo lo que haya):

***

```markdown
# ⚽ Golejadors App (Frontend Quasar)

Aquesta és l'aplicació frontend per a la gestió de golejadors, desenvolupada amb [Quasar Framework](https://quasar.dev/) i Vue 3. Permet als usuaris registrar-se, iniciar sessió (mitjançant JWT) i gestionar el seu propi rànquing de jugadors i gols.

## 🚀 Requisits Previs

Abans de començar, assegura't de tenir instal·lat:
- **Node.js** (versió 18 o superior recomanada).
- **Gestor de paquets**: `npm`, `yarn` o `pnpm`.
- **Android Studio** (Només si vols executar l'app a l'emulador d'Android via Capacitor).
- **Backend**: Aquest projecte requereix que el servidor backend (Nuxt 3 API) estigui en funcionament per gestionar l'autenticació i la base de dades.

## ⚙️ Configuració de l'Entorn

L'aplicació necessita saber on connectar-se per fer les peticions a la base de dades. Això es configura generalment a l'arxiu `src/boot/axios.js`.

Dependint d'on executis l'aplicació, la URL base (`baseURL`) de l'API ha de canviar:

1. **Per a desenvolupament web (Navegador):**
   Normalment el backend local està a `http://localhost:3000`
2. **Per a l'emulador d'Android:**
   L'emulador no reconeix `localhost` com el teu ordinador, sinó com el propi telèfon. Has d'utilitzar la IP especial: `http://10.0.2.2:3000`
3. **Per a producció (Mòbil real o Web penjada):**
   Has de posar la IP pública del teu servidor o el domini (ex: `https://la-meva-api.com`).

*Nota: L'aplicació utilitza **JSON Web Tokens (JWT)** desats al `localStorage` per mantenir la sessió de l'usuari de forma segura.*

## 📦 Instal·lació de dependències

Obre la terminal a l'arrel del projecte de Quasar i executa:

```bash
npm install
# o bé
pnpm install
# o bé
yarn install
```

## 💻 Execució del projecte

### Mode Desenvolupament (Web)
Per obrir l'aplicació al teu navegador web amb recàrrega automàtica (Hot-Module-Replacement):

```bash
quasar dev
```

### Mode Emulador (Android / Capacitor)
Per provar l'aplicació com una app nativa al teu emulador d'Android:

1. Assegura't de tenir els arxius de Capacitor generats. Si és el primer cop, executa: `quasar mode add capacitor`
2. Executa l'entorn de desenvolupament per a Android:
```bash
quasar dev -m android
```
*(Això obrirà Android Studio o llançarà l'emulador automàticament si ja el tens configurat).*

## 🛠️ Estructura principal del codi

- `/src/pages`: Conté les pantalles principals de l'aplicació (`LoginPage.vue`, `ResourceListPage.vue`, etc.).
- `/src/layouts`: Conté el `MainLayout.vue` amb el menú lateral i la barra de navegació.
- `/src/boot/axios.js`: Configuració global de les peticions HTTP. Aquí interceptem les trucades per afegir el Token JWT a cada petició a l'API.

## 🏗️ Construcció per a Producció

Quan vulguis generar els arxius finals per pujar a un servidor web:

```bash
quasar build
```

Per generar l'APK de l'aplicació d'Android per instal·lar-la en un mòbil físic:

```bash
quasar build -m android
```
```

***