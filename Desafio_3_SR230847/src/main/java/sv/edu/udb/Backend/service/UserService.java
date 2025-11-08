package sv.edu.udb.Backend.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import sv.edu.udb.Backend.dto.UserDTO;
import sv.edu.udb.Backend.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService extends UserDetailsService {
    List<UserDTO> findAll();
    Optional<UserDTO> findById(Long id);
    Optional<UserDTO> findByEmail(String email);
    UserDTO createUser(UserDTO userDTO);
    UserDTO updateUser(Long id, UserDTO userDTO);
    void deleteUser(Long id);
}