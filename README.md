# E-commerce Angular

Aplicación de comercio electrónico moderna construida con Angular 19.


## Tecnologías

- Angular 19
- RxJS
- TypeScript
- Docker

## Instalación

### Desarrollo local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:4200`

### Docker

```bash
# Construir imagen
docker build -t mi-tienda .

# Ejecutar contenedor
docker run -p 4200:80 mi-tienda
```

## Variables de Entorno

No se requieren variables de entorno para el desarrollo local.

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/      # Componentes reutilizables
│   ├── models/         # Interfaces y tipos
│   ├── pages/          # Componentes de página
│   └── services/       # Servicios
├── assets/            # Recursos estáticos
└── styles/           # Estilos globales
```

## Contribuir

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
