package com.pg_management_system.pg_management_sytem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pg_management_system.pg_management_sytem.model.PgDetails;

@Repository
public interface PgDetailsRepository extends JpaRepository<PgDetails, Long> {

}
