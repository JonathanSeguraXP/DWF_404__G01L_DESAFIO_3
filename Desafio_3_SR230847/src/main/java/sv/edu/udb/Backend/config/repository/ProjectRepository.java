package sv.edu.udb.Backend.config.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sv.edu.udb.Backend.config.entity.Project;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByCreatedByEmail(String email);
    List<Project> findByNameContainingIgnoreCase(String name);
}
