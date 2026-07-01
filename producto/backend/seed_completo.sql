-- =========================================================
-- SCRIPT DE POBLADO COMPLETO - DATOS DE PRUEBA
-- =========================================================

-- ROLPERSONAL
INSERT INTO ims_backend_rolpersonal (nombre_rol) VALUES
('medico'), ('tens'), ('chofer'), ('control');

-- GRUPOPERSONAL
INSERT INTO ims_backend_grupopersonal (nombre_grupo) VALUES
('ALPHA'), ('BRAVO'), ('CHARLIE');

-- CATEGORIAINSUMO
INSERT INTO ims_backend_categoriainsumo (categoria) VALUES
('ANALGESICOS'),('SEDANTES'),('ANTIARRITMICOS'),('VASOACTIVOS'),('SUEROS'),
('ANTIBIOTICOS'),('ANTICONVULSIVANTES'),('BRONCODILATADORES'),('CORTICOIDES'),
('ANTIEMETICOS'),('JERINGAS'),('AGUJAS'),('CATETERES'),('GUANTES'),
('GASAS Y APOSITOS'),('VENDAS'),('VIA AEREA'),('OXIGENOTERAPIA'),
('INMOVILIZACION'),('SUTURA');

-- UNIDADMEDIDAINSUMO
INSERT INTO ims_backend_unidadmedidainsumo (unit) VALUES
('MG'),('ML'),('G'),('UNIDAD'),('AMPOLLA'),('FRASCO'),('CAJA');

-- PERSONAL (contraseña: Test1234! -- hash pbkdf2 de ejemplo, cambiar en uso real)
INSERT INTO ims_backend_personal
(password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined, totp_secret, rut, rol_id) VALUES
('pbkdf2_sha256$1200000$dummyhash1$dummyhash1dummyhash1dummyhash1dummyh=', NULL, false, '11111111-1', 'Nicoletta', 'Botto', 'nicoletta@example.com', false, true, '2026-07-01 00:00:00+00', 'JBSWY3DPEHPK3PXP', '11111111-1', 1),
('pbkdf2_sha256$1200000$dummyhash2$dummyhash2dummyhash2dummyhash2dummyh=', NULL, false, '19058428-3', 'Pascal', 'Coloma', 'pascal@example.com', false, true, '2026-07-01 00:00:00+00', 'JBSWY3DPEHPK3PXQ', '19058428-3', 2),
('pbkdf2_sha256$1200000$dummyhash3$dummyhash3dummyhash3dummyhash3dummyh=', NULL, false, '21431791-5', 'Leonardo', 'Vera', 'leonardo@example.com', false, true, '2026-07-01 00:00:00+00', 'JBSWY3DPEHPK3PXR', '21431791-5', 3),
('pbkdf2_sha256$1200000$dummyhash4$dummyhash4dummyhash4dummyhash4dummyh=', NULL, false, '19758364-9', 'Diego', 'Valencia', 'diego@example.com', false, true, '2026-07-01 00:00:00+00', 'JBSWY3DPEHPK3PXS', '19758364-9', 2),
('pbkdf2_sha256$1200000$dummyhash5$dummyhash5dummyhash5dummyhash5dummyh=', NULL, true,  '12345678-5', 'Claudio', 'Vásquez', 'claudio@example.com', true,  true, '2026-07-01 00:00:00+00', 'VIME74VCCXDF3THXLDRAX5SDLH5AKKWU', '12345678-5', 4);

-- SUSCRITOSAGRUPO
INSERT INTO ims_backend_suscritosagrupo (fecha_entrada, fecha_salida, grupo_id, personal_id) VALUES
('2026-07-01 00:00:00+00', NULL, 1, 3),
('2026-07-01 00:00:00+00', NULL, 1, 4),
('2026-07-01 00:00:00+00', NULL, 2, 5);

-- PACIENTE
INSERT INTO ims_backend_paciente (rut, nombre_completo, fecha_nacimiento, direccion, condicion_paciente, telefono, comuna) VALUES
('18.245.671-3', 'Fernanda Isidora Contreras Molina', '1990-03-15', 'Av. Libertad 480', 'Hipertensión controlada', '956123478', 'Viña del Mar'),
('12.876.543-9', 'Rodrigo Andrés Vergara Salinas', '1985-11-02', 'Calle 5 Poniente 210', 'Sin anotaciones', '978234561', 'Valparaíso'),
('9.456.321-k', 'Trinidad Belén Muñoz Rojas', '1965-07-28', 'Pasaje Los Aromos 55', 'Diabetes tipo 2', '932345678', 'Quilpué'),
('21.098.765-4', 'Matías Ignacio Cárcamo Fuentes', '2001-01-19', 'Av. Colón 1345', 'Sin anotaciones', '945678912', 'Viña del Mar'),
('15.678.234-2', 'Antonella Sofía Reyes Pizarro', '1978-05-09', 'Calle Alemania 89', 'Asma bronquial', '967891234', 'Villa Alemana'),
('8.234.567-1', 'Cristóbal Eduardo Bravo Núñez', '1958-12-30', 'Av. Argentina 700', 'Cardiopatía isquémica', '923456789', 'Valparaíso'),
('19.876.234-5', 'Josefa Amanda Torres Leiva', '1995-09-14', 'Calle Uno Norte 30', 'Sin anotaciones', '956789123', 'Quillota'),
('11.345.678-7', 'Vicente Tomás Aguilera Soto', '1982-04-22', 'Av. España 1560', 'Epilepsia', '934567891', 'Viña del Mar'),
('16.987.432-6', 'Constanza Emilia Godoy Parra', '1999-08-03', 'Pasaje Las Rosas 12', 'Sin anotaciones', '978912345', 'Concón'),
('7.654.321-8', 'Benjamín Ángel Sepúlveda Ortiz', '1970-02-17', 'Av. Perú 990', 'EPOC', '912345678', 'Valparaíso');

-- AMBULANCIA
INSERT INTO ims_backend_ambulancia (patente, modelo, estado_disponibilidad) VALUES
('ACBD123', 'Mercedes Sprinter 2023', 'Lista para un nuevo despacho'),
('PKKW12',  'Mercedes-Benz Sprinter', 'Lista para un nuevo despacho'),
('BODEGA',  'none', 'none');

-- INSUMOMEDICO + PRESENTACIONINSUMO (unificado)
WITH nuevos_insumos AS (
  INSERT INTO ims_backend_insumomedico (nombre_insumo, categoria_id) VALUES
  ('PARACETAMOL', 1), ('IBUPROFENO', 1), ('KETOROLACO', 1), ('MORFINA', 1),
  ('TRAMADOL', 1), ('MIDAZOLAM', 2), ('DIAZEPAM', 2), ('PROPOFOL', 2),
  ('AMIODARONA', 3), ('LIDOCAINA', 3), ('ADENOSINA', 3), ('ADRENALINA', 4),
  ('NORADRENALINA', 4), ('DOPAMINA', 4), ('SUERO FISIOLOGICO', 5),
  ('RINGER LACTATO', 5), ('SUERO GLUCOSADO', 5), ('CEFTRIAXONA', 6),
  ('AMOXICILINA', 6), ('CLINDAMICINA', 6), ('FENITOINA', 7),
  ('ACIDO VALPROICO', 7), ('SALBUTAMOL', 8), ('IPRATROPIO', 8),
  ('HIDROCORTISONA', 9), ('DEXAMETASONA', 9), ('METOCLOPRAMIDA', 10),
  ('ONDANSETRON', 10), ('JERINGA 3ML', 11), ('JERINGA 5ML', 11),
  ('JERINGA 10ML', 11), ('AGUJA 21G', 12), ('AGUJA 23G', 12),
  ('BRANULA 18G', 13), ('BRANULA 20G', 13), ('GUANTES LATEX TALLA M', 14),
  ('GUANTES NITRILO TALLA L', 14), ('GASA ESTERIL', 15),
  ('APOSITO ADHESIVO', 15), ('VENDA ELASTICA', 16), ('VENDA TRIANGULAR', 16),
  ('TUBO OROFARINGEO', 17), ('MASCARILLA LARINGEA', 17), ('CANULA NASAL', 18),
  ('MASCARILLA DE OXIGENO', 18), ('COLLAR CERVICAL', 19), ('TABLA ESPINAL', 19),
  ('FERULA NEUMATICA', 19), ('SUTURA NYLON 3-0', 20), ('SUTURA VICRYL 4-0', 20)
  RETURNING id
),
ordenados AS (
  SELECT id, ROW_NUMBER() OVER () AS rn FROM nuevos_insumos
),
cantidades AS (
  SELECT * FROM (VALUES
    (1,500.00,1),(2,400.00,1),(3,10.00,1),(4,10.00,5),(5,50.00,1),
    (6,5.00,5),(7,10.00,1),(8,200.00,5),(9,150.00,5),(10,2.00,5),
    (11,6.00,5),(12,1.00,4),(13,400.00,4),(14,1.00,5),(15,4.00,5),
    (16,1000.00,2),(17,1000.00,2),(18,500.00,2),(19,1.00,6),(20,500.00,1),
    (21,150.00,4),(22,600.00,1),(23,500.00,3),(24,100.00,5),(25,100.00,5),
    (26,100.00,5),(27,10.00,4),(28,8.00,4),(29,3.00,4),(30,5.00,4),
    (31,10.00,4),(32,100.00,4),(33,50.00,4),(34,1.00,4),(35,1.00,4),
    (36,50.00,4),(37,50.00,4),(38,10.00,4),(39,10.00,4),(40,1.00,4),
    (41,1.00,4),(42,20.00,4),(43,20.00,4),(44,1.00,4),(45,1.00,4),
    (46,1.00,4),(47,12.00,4),(48,12.00,4)
  ) AS t(rn, cantidad, unidad_medida_id)
)
INSERT INTO ims_backend_presentacioninsumo (cantidad, insumo_id, unidad_medida_id)
SELECT c.cantidad, o.id, c.unidad_medida_id
FROM cantidades c JOIN ordenados o ON o.rn = c.rn;

-- STOCKINSUMO (bodega = ambulancia con patente 'BODEGA')
INSERT INTO ims_backend_stockinsumo (presentacion_id, ambulancia_id, stock)
SELECT p.id, (SELECT id FROM ims_backend_ambulancia WHERE patente = 'BODEGA'), 100
FROM ims_backend_presentacioninsumo p;

-- DESPACHO
INSERT INTO ims_backend_despacho
(direccion_origen, direccion_destino, descripcion_llamado, estado, fecha_llamado, fecha_asignacion, fecha_finalizacion, ambulancia_id, asignado_por_id, creado_por_id, paciente_id) VALUES
('Av. San Martín 1020', 'Hospital Gustavo Fricke', 'Dolor torácico', 'finalizado', '2026-07-01 02:00:00+00', '2026-07-01 02:05:00+00', '2026-07-01 02:40:00+00', 1, 2, 5, 1),
('Calle Uno Norte 30', 'Hospital Carlos Van Buren', 'Caída con trauma', 'asignado', '2026-07-01 02:20:00+00', '2026-07-01 02:22:00+00', NULL, 2, 2, 5, 2),
('Av. Argentina 700', 'Hospital Naval', 'Dificultad respiratoria', 'recibido', '2026-07-01 02:35:00+00', NULL, NULL, NULL, NULL, 5, 3);

-- DESPACHOPERSONAL
INSERT INTO ims_backend_despachopersonal (despacho_id, grupo_id, asignado_en) VALUES
(1, 1, '2026-07-01 02:05:00+00'),
(2, 2, '2026-07-01 02:22:00+00');

-- ATENCION
INSERT INTO ims_backend_atencion
(hora_salida, hora_llegada, sello_electronico, estado_sello, ambulancia_id, despacho_id, rut_receptor, rut_registrador_id) VALUES
('2026-07-01 02:05:00+00', '2026-07-01 02:40:00+00', NULL, 'Pendiente', 1, 1, NULL, 5),
('2026-07-01 02:22:00+00', NULL, NULL, 'Pendiente', 2, 2, NULL, 2);

-- SIGNOSVITALES
INSERT INTO ims_backend_signosvitales
(timestamp, presion_sistolica, presion_diastolica, frecuencia_cardiaca, saturacion_oxigeno, temperatura, fr, fio2, hgt, gcs, eva, hora, observaciones, atencion_id) VALUES
('2026-07-01 02:10:00+00', 120, 80, 78, 98, 36.5, 16, 21, 95, 15, 2, '0210', 'Paciente estable', 1),
('2026-07-01 02:25:00+00', 110, 70, 88, 96, 36.8, 18, 21, 100, 15, 4, '0225', 'Sin novedad', 2);

-- DETALLEINSUMOATENCION
INSERT INTO ims_backend_detalleinsumoatencion (atencion_id, insumo_id, observaciones, cantidad_usada) VALUES
(1, 1, 'Uso profiláctico', 1),
(2, 4, 'Sin observaciones', 1);

-- DOCUMENTO
INSERT INTO ims_backend_documento (archivo_s3_key, archivo_hash, firma_s3_key, atencion_id, created_at) VALUES
('documentos/atencion_1.pdf', 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2', 'firmas/atencion_1.sig', 1, '2026-07-01 02:41:00+00'),
('documentos/atencion_2.pdf', 'b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3', 'firmas/atencion_2.sig', 2, '2026-07-01 02:30:00+00');

-- DEVICETOKEN
INSERT INTO ims_backend_devicetoken (device_token, usuario_id, created_at) VALUES
('token_dev_claudio_001', 5, '2026-07-01 02:00:00+00'),
('token_dev_pascal_001', 2, '2026-07-01 02:00:00+00');

-- PREINFORME
INSERT INTO ims_backend_preinforme (pre_informe, motivo_llamado, estado_paciente, atencion_id) VALUES
('Preinforme generado automáticamente', 'Dolor torácico', 'Estable', 1),
('Preinforme generado automáticamente', 'Trauma por caída', 'Consciente', 2);

-- CRONOLOGIA
INSERT INTO ims_backend_cronologia
(hora_llamada, despacho_movil, llegada_qth1, salida_qth1, llegada_qth2, salida_qth2, categoria, atencion_id) VALUES
('0200', '0205', '0215', '0220', '0235', '0240', 'C1', 1),
('0220', '0222', '0230', '0233', NULL, NULL, 'C2', 2);

-- LOGAUDITORIA
INSERT INTO ims_backend_logauditoria (rut_usuario, descripcion, timestamp, atencion_id, usuario_id, tipo) VALUES
('12345678-5', 'El usuario con RUT 12345678-5 (ID: 5) registró al paciente con RUT 18.245.671-3.', '2026-07-01 03:05:12+00', NULL, 5, 'paciente'),
('12345678-5', 'El usuario con RUT 12345678-5 (ID: 5) registró al paciente con RUT 12.876.543-9.', '2026-07-01 03:06:22+00', NULL, 5, 'paciente'),
('19058428-3', 'El usuario con RUT 19058428-3 (ID: 2) registró al paciente con RUT 9.456.321-k.', '2026-07-01 03:07:32+00', NULL, 2, 'paciente'),
('19058428-3', 'El usuario con RUT 19058428-3 (ID: 2) registró la ambulancia con patente ACBD123, modelo Mercedes Sprinter 2023 e ID 1.', '2026-07-01 02:40:49+00', NULL, 2, 'ambulancia'),
('12345678-5', 'El usuario con RUT 12345678-5 (ID: 5) registró la ambulancia con patente PKKW12, modelo Mercedes-Benz Sprinter e ID 2.', '2026-07-01 02:43:41+00', NULL, 5, 'ambulancia'),
('19058428-3', 'El usuario con RUT 19058428-3 (ID: 2) creó el grupo ALPHA y asignó los siguientes RUTs: 21431791-5, 19758364-9.', '2026-07-01 02:58:16+00', NULL, 2, 'grupo');
