package sv.edu.udb.Backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import sv.edu.udb.Backend.entity.User;
import sv.edu.udb.Backend.entity.Role;
import sv.edu.udb.Backend.repository.UserRepository;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            // Admin user
            User admin = User.builder()
                    .email("admin@novatech.com")
                    .password(passwordEncoder.encode("admin123"))
                    .firstName("Admin")
                    .lastName("Principal")
                    .role(Role.ADMIN)
                    .build();

            // Regular user
            User user = User.builder()
                    .email("usuario@novatech.com")
                    .password(passwordEncoder.encode("user123"))
                    .firstName("Usuario")
                    .lastName("Ejemplo")
                    .role(Role.USER)
                    .build();

            userRepository.save(admin);
            userRepository.save(user);

            System.out.println("=== Datos de prueba cargados ===");
            System.out.println("Admin: admin@novatech.com / admin123");
            System.out.println("User: usuario@novatech.com / user123");
        }
    }
}
