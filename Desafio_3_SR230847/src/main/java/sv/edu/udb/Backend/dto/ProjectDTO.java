package sv.edu.udb.Backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ProjectDTO {
    private Long id;
    private String name;
    private String description;
    private String createdBy; // Email del usuario creador
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}