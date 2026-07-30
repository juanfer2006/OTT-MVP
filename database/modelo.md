# Modelo de datos — CineApp (MVP)

> Solo películas por ahora. Sin temporadas ni episodios.

---

## Entidades

- USUARIO
- REGION
- CONTENIDO
- CONTENIDO_REGION
- TARJETA
- FAVORITO
- DISLIKE
- HISTORIAL_REPRODUCCION
- SESION

---

### USUARIO
| Campo | Tipo | Descripción |
|---|---|---|
| id | INT (PK) | Identificador único |
| nombre | VARCHAR(100) | Nombre del usuario |
| apellido | VARCHAR(100) | Apellido del usuario |
| correo | VARCHAR(150) | Correo único para login |
| contraseña | VARCHAR(255) | Hash bcrypt |
| region_id | INT(FK) | Referencia a REGION |

---

### REGION
| Campo | Tipo | Descripción |
|---|---|---|
| id | INT(PK) | Identificador único |
| nombre | VARCHAR(100) | Nombre de la región |
| codigo | VARCHAR(10) | Código de la región |

---

### CONTENIDO
| Campo | Tipo | Descripción |
|---|---|---|
| id | INT (PK) | Identificador único |
| titulo | VARCHAR(200) | Título de la película |
| descripcion | TEXT | Sinopsis |
| categoria | VARCHAR(50) | "accion", "drama", "comedia", etc. |
| ruta_portada | VARCHAR(500) | Ruta local de la imagen |
| ruta_video | VARCHAR(500) | Ruta local del video |
| duracion | INT | Duracion en minutos |
| año | INT | Año de estreno |
| creado_en | DATETIME | Fecha de registro |

---

### CONTENIDO_REGION
| Campo | Tipo | Descripción |
|---|---|---|
| id | INT(PK) | Identificador único |
| contenido_id | INT(PK) | Referencia a contenido |
| region_id | INT(PK) | Referencia a región |

---

### TARJETA
| Campo | Tipo | Descripción |
|---|---|---|
| id | INT(PK) | Identificador único |
| usuario_id | INT(PK) | Referencia a usuario |
| numero | VARCHAR(20) | Número de tarjeta |
| nombre | VARCHAR(100) | Nombre en la tarjeta |
| vencimiento | VARCHAR(7) | Fecha de vencimiento |

---

### FAVORITO
| Campo | Tipo | Descripción |
|---|---|---|
| id | INT (PK) | Identificador único |
| usuario_id | INT (FK) | Referencia a usuario |
| contenido_id | INT (FK) | Referencia a contenido |

---

### DISLIKE
| Campo | Tipo | Descripción |
|---|---|---|
| id | INT (PK) | Identificador único |
| usuario_id | INT (FK) | Referencia a usuario |
| contenido_id | INT (FK) | Referencia a contenido |

---

### HISTORIAL_REPRODUCCION
| Campo | Tipo | Descripción |
|---|---|---|
| id | INT (PK) | Identificador único |
| usuario_id | INT (FK) | Referencia a usuario |
| contenido_id | INT (FK) | Referencia a contenido |
| progreso_segundos | INT | Segundo exacto donde quedo la reproducción |
| ultima_vez | DATETIME | Última vez que lo vio |

---

### SESION
| Campo | Tipo | Descripción |
|---|---|---|
| id | INT (PK) | Identificador único |
| usuario_id | INT (FK) | Referencia a usuario |
| token | TEXT | JWT activo |
| expira_en | DATETIME | Cuándo vence el token |
| creado_en | DATETIME | Cuándo se creó la sesión |

---

## Relaciones

- Un USUARIO pertenece a una REGION.
- Un USUARIO puede tener una TARJETA.
- Un USUARIO puede tener muchos FAVORITOS.
- Un USUARIO puede tener muchos DISLIKES.
- Un USUARIO puede tener muchos HISTORIALES.
- Un USUARIO puede tener muchas SESIONES.

- Un CONTENIDO puede estar disponible en muchas REGIONES mediante CONTENIDO_REGION.

- Un CONTENIDO puede aparecer en muchos FAVORITOS.
- Un CONTENIDO puede aparecer en muchos DISLIKES.
- Un CONTENIDO puede aparecer en muchos HISTORIALES.