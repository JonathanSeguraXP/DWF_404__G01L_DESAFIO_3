package sv.edu.udb.Backend.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sv.edu.udb.Backend.dto.AuthRequest;
import sv.edu.udb.Backend.dto.AuthResponse;
import sv.edu.udb.Backend.entity.User;
import sv.edu.udb.Backend.entity.Role;
import sv.edu.udb.Backend.repository.UserRepository;
import sv.edu.udb.Backend.service.AuthService;
import sv.edu.udb.Backend.service.JwtService;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthResponse authenticate(AuthRequest request) {
        // Autenticar usuario
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // Obtener usuario y generar token
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        String jwtToken = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(jwtToken)
                .email(user.getEmail())
                .role(user.getRole().name())
                .fullName(user.getFirstName() + " " + user.getLastName())
                .build();
    }

    @Override
    public AuthResponse register(AuthRequest request) {
        // Verificar si el usuario ya existe
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El usuario ya existe");
        }

        // Crear nuevo usuario (por defecto como USER)
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName("Nuevo") // Puedes modificar esto para recibir más datos
                .lastName("Usuario")
                .role(Role.USER) // Por defecto USER, ADMIN se asigna manualmente
                .build();

        User savedUser = userRepository.save(user);
        String jwtToken = jwtService.generateToken(savedUser);

        return AuthResponse.builder()
                .token(jwtToken)
                .email(savedUser.getEmail())
                .role(savedUser.getRole().name())
                .fullName(savedUser.getFirstName() + " " + savedUser.getLastName())
                .build();
    }
}
