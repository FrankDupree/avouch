package com.codeniro.avouch.repository;

import com.codeniro.avouch.domain.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);
}
