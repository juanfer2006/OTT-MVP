# Modelo Entidad-Relación (MER)

## Relaciones

1. REGION 1 ----- N USUARIO

Un usuario pertenece a una región.
Una región puede tener muchos usuarios.

---

2. USUARIO 1 ----- N TARJETA

Un usuario puede registrar varias tarjetas.
Una tarjeta pertenece a un solo usuario.

---

3. USUARIO 1 ----- N FAVORITO

Un usuario puede tener muchos favoritos.

---

4. CONTENIDO 1 ----- N FAVORITO

Un contenido puede estar en favoritos de muchos usuarios.

---

5. USUARIO 1 ----- N DISLIKE

Un usuario puede dar muchos dislikes.

---

6. CONTENIDO 1 ----- N DISLIKE

Un contenido puede recibir muchos dislikes.

---

7. USUARIO 1 ----- N HISTORIAL_REPRODUCCION

Un usuario puede reproducir muchos contenidos.

---

8. CONTENIDO 1 ----- N HISTORIAL_REPRODUCCION

Un contenido puede aparecer en muchos historiales.

---

9. USUARIO 1 ----- N SESION

Un usuario puede iniciar muchas sesiones.

---

10. CONTENIDO N ----- N REGION

Se implementa mediante la tabla CONTENIDO_REGION.