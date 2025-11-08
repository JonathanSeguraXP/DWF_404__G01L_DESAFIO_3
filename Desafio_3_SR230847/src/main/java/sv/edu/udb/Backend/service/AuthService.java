package sv.edu.udb.Backend.service;

import sv.edu.udb.Backend.dto.AuthRequest;
import sv.edu.udb.Backend.dto.AuthResponse;

public interface AuthService {
    AuthResponse authenticate(AuthRequest request);
    AuthResponse register(AuthRequest request);
}