INSERT INTO users (id, email, password, first_name, last_name, role) VALUES
                                                                         (1, 'admin@novatech.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVwUi.', 'Admin', 'Principal', 'ADMIN'),
                                                                         (2, 'usuario@novatech.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVwUi.', 'Usuario', 'Ejemplo', 'USER');

-- Insertar proyectos de prueba
INSERT INTO projects (id, name, description, user_id, created_at) VALUES
                                                                      (1, 'Sistema de Gestión', 'Desarrollo del sistema interno de NovaTech', 1, CURRENT_TIMESTAMP),
                                                                      (2, 'Portal Web Cliente', 'Portal web para clientes de NovaTech', 2, CURRENT_TIMESTAMP),
                                                                      (3, 'App Móvil', 'Aplicación móvil para empleados', 1, CURRENT_TIMESTAMP);

-- Reiniciar secuencias
ALTER SEQUENCE users_seq RESTART WITH 3;
ALTER SEQUENCE projects_seq RESTART WITH 4;