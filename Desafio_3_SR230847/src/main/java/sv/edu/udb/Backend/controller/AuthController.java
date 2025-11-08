package sv.edu.udb.Backend.controller;

import sv.edu.udb.Backend.config.JwtUtil;
import sv.edu.udb.Backend.dto.LoginRequest;
import sv.edu.udb.Backend.dto.JwtResponse;
import sv.edu.udb.Backend.entity.User;
import sv.edu.udb.Backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            User user = userService.findByUsername(loginRequest.getUsername())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            if (!userService.validatePassword(loginRequest.getPassword(), user.getPassword())) {
                return ResponseEntity.badRequest().body("Credenciales inválidas");
            }

            String token = jwtUtil.generateToken(user.getUsername());
            return ResponseEntity.ok(new JwtResponse(token, user.getUsername(), user.getEmail()));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error en autenticación: " + e.getMessage());
        }
    }
}