package sv.edu.udb.Backend.dto;

import lombok.Data;
import sv.edu.udb.Backend.entity.Role;

@Data
public class UserDTO {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private Role role;
}