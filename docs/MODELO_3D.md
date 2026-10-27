# Chispa 3D — lo que necesito para integrar tu diseño

Chispa ha vuelto a la portada como **escena propia**: canvas 3D transparente, dos containers sin marca y una animación de saltos entre ellos y el suelo. También sigue como proyecto anterior de web/3D. La portada carga Three.js solo para esa escena, y el CV no.

Cuando me envíes el muñeco, lo sustituyo en la escena de la portada sin rehacer el portfolio. El cargador sigue preparado: si existe `assets/models/mascot.glb`, lo carga, lo escala, lo centra, lo apoya en el suelo y retira el personaje procedural.

---

## 1. Qué mándame (por orden de utilidad)

1. **`mascot.glb`** — el modelo en glTF 2.0 binario, con las texturas incrustadas.
2. **`mascot.blend`** — si lo tienes en Blender, mejor: puedo ajustar pivotes, materiales y expresiones sin pedirte cambios.
3. **Renders de referencia** — frontal, 3/4, lateral y espalda, con fondo neutro. Aunque el GLB ya los incluya, me ayudan a comprobar que se ve como esperas.
4. **Paleta y materiales** — colores exactos (hex) y si es cerámica, plástico, metal, peluche, plastilina…
5. **Personalidad** — 3–5 adjetivos y cómo debe reaccionar: tímido, dormilón, nervioso, orgulloso, curioso… Esto define las expresiones y el movimiento.

Si el diseño aún es 2D, mándame un **turnaround** (frontal, perfil, espalda) y una hoja de expresiones. Puedo modelar una versión 3D simplificada o adaptar el prototipo actual a ese diseño.

---

## 2. Formato y orientación

| Cosa | Cómo lo necesito |
|---|---|
| Formato | `.glb` (glTF 2.0). También acepto `.gltf` + carpeta de texturas, pero el `.glb` es más limpio. |
| Ejes | **Y hacia arriba**, personaje mirando a **+Z**. |
| En Blender | Mira hacia **−Y** (vista frontal). El exportador de glTF convierte Z-up → Y-up y −Y → +Z. |
| Origen | En los **pies**, centrado en X/Z. Si no, lo corrijo automáticamente. |
| Escala | Realista o arbitraria; la normalizo a ~3,9 unidades de alto. |
| Transformaciones | Aplicadas (`Ctrl + A` → All Transforms) antes de exportar. |
| Escena | Solo el personaje. **Sin cámaras, sin luces, sin suelo.** |
| Unidades | 1 unidad = 1 metro es lo ideal, pero no es obligatorio. |

> Si el personaje no es un robot (un bicho, una nube, una cabeza, un objeto con ojos), también vale. Solo necesito saber dónde están la cabeza y los ojos.

---

## 3. Nombres de los nodos (lo más importante)

Para que Chispa **te mire de verdad**, la cabeza y los ojos tienen que ser objetos separados con el pivote en su sitio. Nombres exactos (respetan mayúsculas):

| Nodo | Pivote | Para qué |
|---|---|---|
| `Head` | En el cuello, no en el centro de la cabeza | Girar la cabeza hacia el cursor |
| `Eye_L` / `Eye_R` | En el centro de cada ojo | Mover los ojos de forma independiente |
| `Pupil_L` / `Pupil_R` | En el centro de cada pupila | Referencia para afinar la mirada (opcional) |
| `Antenna` | En la base de la antena | Muelle y vibración (si tiene antena) |
| `Arm_L` / `Arm_R` | En el hombro | Saludar y gesticular |
| `Body` | En la base del torso | Balanceo e inclinación |

- Si no existen `Eye_L`/`Eye_R`, el modelo sigue funcionando, pero solo se moverá la cabeza (o todo el cuerpo).
- Si los ojos y las pupilas son una sola malla, puedo rotar el ojo entero; no podré deslizar la pupila.
- Los nombres deben estar en el objeto, no en el material.
- Si tu modelo ya tiene un rig, puedo usar los huesos con esos nombres; avísame.

### Expresiones (opcional)

Si quieres parpadeos y expresiones reales:

- **Shape keys** llamadas `Blink`, `Smile`, `Surprised` (o un rig facial), o
- **Mallas separadas** para párpados y boca, con nombres claros (`Eyelid_L`, `Eyelid_R`, `Mouth`).

Con el modelo procedural actual las expresiones son procedurales. Con tu modelo, el cargador base ya usa `Head`, `Eye_L/R` y las animaciones `Idle`/`Wave`; si incluyes párpados separados, shape keys o un rig facial, los conecto en la integración (es una segunda pasada, no automática).

---

## 4. Materiales y texturas

- Materiales **PBR metallic-roughness** (Principled BSDF en Blender).
- **Nada de nodos procedurales** que glTF no entienda: hornea (`Bake`) las texturas que hagan falta.
- Texturas **1K o 2K** como máximo, potencias de dos, en PNG/JPEG, **incrustadas** en el GLB.
- Evita transmisión, subsurface scattering y mezclas complejas: no se exportan igual en todos los navegadores.
- Emisión permitida (para ojos, antena, pantallas). Si el personaje tiene partes emisivas, dime cuáles.
- Si usas transparencias (pelo, cristal), avísame: requieren un tratamiento especial y pueden dar problemas de ordenación.

El estilo de la web es cálido y táctil: hueso, arcilla, naranja clara, sombras suaves. Si tu personaje es de otro palo (metálico, oscuro, colorido), lo integramos igual, pero puede pedir un ajuste de luces o de fondo.

---

## 5. Presupuesto técnico

| Métrica | Objetivo | Máximo |
|---|---|---|
| Triángulos | 20.000–80.000 | 150.000 |
| Tamaño del `.glb` | < 5 MB | 8 MB |
| Texturas | 1K | 2K |
| Materiales | 3–6 | 10 |
| Animaciones | 0–4 clips | — |

Es un personaje de portada, no un juego: con 30k triángulos y texturas de 1K se ve perfecto y carga rápido en móvil.

**Compresión:** de momento el loader **no** incluye decodificadores Draco/Meshopt. Exporta sin compresión o avísame para añadirlos (y probarlos en GitHub Pages).

---

## 6. Animaciones (opcional)

Si quieres animaciones pregrabadas, expórtalas con estos nombres y sin movimiento de raíz:

- `Idle` — respiración / balanceo en bucle (2–4 s).
- `Wave` — saludo, una sola reproducción.
- `Happy` — reacción al clic.
- `Blink` — parpadeo corto (si no lo haces procedural).

24 o 30 fps. El personaje se queda en el sitio: sin desplazamiento del root. La mirada al cursor se superpone a la animación, así que evita que `Idle` mueva la cabeza de forma agresiva (o avísame y lo mezclo con cuidado).

---

## 7. Exportar desde Blender (checklist)

1. Selecciona **solo** el personaje (y su armature, si tiene).
2. `File → Export → glTF 2.0 (.glb)`.
3. Marca:
   - **Format:** glTF Binary (`.glb`)
   - **Include:** Selected Objects
   - **Transform:** +Y Up
   - **Data:** Apply Modifiers
   - **Geometry:** normals, tangents si usas normal maps
   - **Material:** Export (no “placeholder”)
   - **Images:** Automatic / Embed
4. Comprueba que no haya cámaras ni luces seleccionadas.
5. Abre el `.glb` en [gltf-viewer.donmccurdy.com](https://gltf-viewer.donmccurdy.com/) o en Blender de nuevo para verificar que se ve bien.
6. Mándame el archivo (o déjalo en `assets/models/mascot.glb`).

---

## 8. Qué hago yo con el archivo

- Normalizo escala, orientación y posición en el suelo.
- Ajusto cámara, luces, sombras y entorno para que encaje con la web.
- Conecto la mirada al cursor, el blink y las reacciones (clic, saludo, scroll).
- Añado un **fallback 2D** y el modo de movimiento reducido.
- Compruebo peso, tiempos de carga y comportamiento en móvil.
- Si hace falta, creo una versión low-poly para móvil o un LOD.

---

## 9. Preguntas que me ayudan

1. ¿El personaje es el mismo en toda la web o solo en la portada?
2. ¿Tiene boca y expresiones, o solo ojos?
3. ¿Material: cerámica/clay, plástico, metal, peluche, cartoon?
4. ¿Quieres que reaccione a clics, al scroll o al formulario?
5. ¿Lo has modelado tú? ¿Cómo quieres acreditarlo?
6. ¿Tienes una referencia de movimiento (vídeo, GIF, otro personaje) que te guste?

---

## 10. Si solo tienes una idea

No pasa nada. Mándame:

- 2–3 referencias visuales que te gusten.
- Un boceto, aunque sea a mano.
- La personalidad y el nombre.
- Los colores que quieras usar.

Con eso puedo proponer una versión 3D coherente con la web y iterar. El prototipo actual está pensado para eso: enseñar el comportamiento antes de invertir horas en el modelo final.
