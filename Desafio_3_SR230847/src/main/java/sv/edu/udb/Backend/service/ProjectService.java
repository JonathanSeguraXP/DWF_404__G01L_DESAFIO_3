package sv.edu.udb.Backend.service;

import sv.edu.udb.Backend.dto.ProjectDTO;
import java.util.List;
import java.util.Optional;

public interface ProjectService {
    List<ProjectDTO> findAll();
    Optional<ProjectDTO> findById(Long id);
    List<ProjectDTO> findByUserEmail(String email);
    ProjectDTO createProject(ProjectDTO projectDTO, String userEmail);
    ProjectDTO updateProject(Long id, ProjectDTO projectDTO);
    void deleteProject(Long id);
}