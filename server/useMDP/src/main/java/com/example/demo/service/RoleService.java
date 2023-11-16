package com.example.demo.service;

import com.example.demo.model.domain.Role;
import com.example.demo.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public Role addRole(String roleName) {
        Role newRole = new Role(roleName);
        return roleRepository.save(newRole);
    }

    public Role updateRole(Long roleId, String newRoleName) {
        Role existingRole = roleRepository.findById(roleId).orElse(null);
        if (existingRole != null) {
            existingRole.setName(newRoleName);
            return roleRepository.save(existingRole);
        }
        return null; // 해당 ID로 역할을 찾지 못한 경우에 대한 처리
    }
}