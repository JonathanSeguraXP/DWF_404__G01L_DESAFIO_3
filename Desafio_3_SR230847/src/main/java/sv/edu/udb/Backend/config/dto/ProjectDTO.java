package sv.edu.udb.Backend.config.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDTO {
    private Long id;

    @NotBlank(message = "El nombre del proyecto es obligatorio")
    private String name;

    private String description;
    private String createdBy;
    private LocalDateTime createdAt;
}