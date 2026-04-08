# my-app

Monorepo que contiene la app mobile en React Native (Expo) y el backend en Django.

---

## Estructura

```
my-app/
├── mobile/                  # React Native con Expo Router
│   ├── src/
│   │   ├── app/             # Rutas (file-based routing)
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx
│   │   │   ├── (auth)/
│   │   │   │   ├── _layout.tsx
│   │   │   │   ├── login.tsx
│   │   │   │   └── register.tsx
│   │   │   └── (tabs)/
│   │   │       ├── _layout.tsx
│   │   │       ├── index.tsx
│   │   │       ├── profile.tsx
│   │   │       └── settings.tsx
│   │   ├── components/
│   │   │   ├── ui/          # Componentes genéricos
│   │   │   └── features/    # Componentes por dominio
│   │   ├── hooks/
│   │   ├── lib/
│   │   │   └── api.ts       # Cliente HTTP
│   │   ├── store/           # Zustand stores
│   │   └── types/
│   ├── app.json
│   ├── eas.json
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── backend/                 # Django REST Framework
│   ├── apps/
│   ├── config/
│   │   ├── settings.py
│   │   └── urls.py
│   ├── manage.py
│   ├── requirements.txt
│   └── requirements-dev.txt
├── shared/                  # Código compartido entre proyectos
│   ├── types/
│   │   └── api.ts           # Tipos generados desde OpenAPI
│   └── constants/
│       └── api.ts           # Rutas y constantes de la API
├── .github/
│   └── workflows/
│       ├── mobile.yml       # CI para cambios en /mobile
│       └── backend.yml      # CI para cambios en /backend
├── package.json
└── .gitignore
```

---

## Requisitos

| Herramienta | Versión mínima |
|-------------|----------------|
| Node.js     | 20.x           |
| npm         | 10.x           |
| Python      | 3.12           |
| Expo CLI    | latest         |
| EAS CLI     | latest         |

---

## Setup inicial

### Mobile

```bash
cd mobile
npm install
cp .env.example .env
npx expo start
```

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements-dev.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver
```

---

## Variables de entorno

### Mobile — `mobile/.env`

```bash
EXPO_PUBLIC_API_URL=http://localhost:8000
```

### Backend — `backend/.env`

```bash
SECRET_KEY=
DEBUG=True
DATABASE_URL=
ALLOWED_HOSTS=localhost,127.0.0.1
```

> Nunca commitear archivos `.env`. Solo se versiona el `.env.example`.

---

## Scripts disponibles

Desde la raíz del monorepo:

```bash
npm run mobile           # Inicia Expo
npm run test:mobile      # Tests del front
npm run test:backend     # Tests del back
npm run lint:mobile      # Lint del front
```

---

## Generación de tipos desde la API

El equipo de backend expone el schema OpenAPI en `/api/schema/`. Para regenerar los tipos TypeScript en `/shared/types/api.ts`:

```bash
npx openapi-typescript http://localhost:8000/api/schema/ -o shared/types/api.ts
```

Correr este comando cada vez que el backend agregue o modifique endpoints.

---

## Flujo de trabajo con Git

### Branches

```
main        → producción, protegida, requiere PR + review
develop     → integración, requiere PR
```

### Convención de nombres

```
feature/mobile/<descripcion>    # nuevas features del front
feature/backend/<descripcion>   # nuevas features del back
fix/mobile/<descripcion>        # fixes del front
fix/backend/<descripcion>       # fixes del back
```

### Flujo estándar

```bash
git checkout develop
git pull origin develop
git checkout -b feature/mobile/login

# ... trabajas ...

git add .
git commit -m "feat: agrega pantalla de login"
git push origin feature/mobile/login
# Abrir PR hacia develop en GitHub
```

### Convención de commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

| Prefijo    | Cuándo usarlo                        |
|------------|--------------------------------------|
| `feat:`    | Nueva funcionalidad                  |
| `fix:`     | Corrección de bug                    |
| `chore:`   | Tareas de mantenimiento, configs     |
| `docs:`    | Cambios en documentación             |
| `refactor:`| Refactor sin cambio de funcionalidad |
| `test:`    | Agrega o modifica tests              |

---

## CI/CD

Los workflows de GitHub Actions se activan por path:

| Evento                    | Workflow que corre  |
|---------------------------|---------------------|
| Push en `mobile/**`       | `mobile.yml`        |
| Push en `backend/**`      | `backend.yml`       |
| Push en `shared/**`       | `mobile.yml`        |

### Builds con EAS

| Profile       | Branch    | Plataforma  |
|---------------|-----------|-------------|
| `development` | cualquiera| internal    |
| `preview`     | develop   | iOS + Android|
| `production`  | main      | iOS + Android|

---

## Equipo

| Área    | Responsabilidad              |
|---------|------------------------------|
| Mobile  | Todo dentro de `/mobile`     |
| Backend | Todo dentro de `/backend`    |
| Shared  | Coordinación entre ambos equipos |
