package com.pg_management_system.pg_management_sytem.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pg_management_system.pg_management_sytem.Repository.PgDetailsRepository;
import com.pg_management_system.pg_management_sytem.exception.ResourceNotFoundException;
import com.pg_management_system.pg_management_sytem.model.PgDetails;


@RestController
@RequestMapping("/api/v1")
public class PgController {
	
	@Autowired
	private PgDetailsRepository pgDetailsRepository;
	
	// create pgDetail rest api
	@PostMapping("/pgDetails")
	public PgDetails createPgDetail(@RequestBody PgDetails pgDetails) {
		return pgDetailsRepository.save(pgDetails);
	}
	
	// get all pgDetails
	@GetMapping("/pgDetails")
	public List<PgDetails> getAllPgDetails() {
		return pgDetailsRepository.findAll();
	}
	
	// get pgDetail by id rest api
	@GetMapping("/pgDetails/{id}")
	public ResponseEntity<PgDetails> getpgDetailById(@PathVariable Long id) {
		PgDetails pgDetails = pgDetailsRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("PG Detail not exist with id :" + id));
		return ResponseEntity.ok(pgDetails);
	}

	//update pdDetail by id rest api
	@PutMapping("/pgDetails/{id}")
	public ResponseEntity<PgDetails> updatePgDetail(@PathVariable Long id, @RequestBody PgDetails pgDetails) {
	    PgDetails existingPgDetail = pgDetailsRepository.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("PG Detail not exist with id :" + id));
	    
	    // Update the fields with the values from the request body
	    existingPgDetail.setName(pgDetails.getName());
	    existingPgDetail.setAddress(pgDetails.getAddress());
	    existingPgDetail.setContact(pgDetails.getContact());
	    
	    PgDetails updatedPgDetail = pgDetailsRepository.save(existingPgDetail);
	    return ResponseEntity.ok(updatedPgDetail);
	}

	
	// delete employee rest api
	@DeleteMapping("/pgDetails/{id}")
	public ResponseEntity<Map<String, Boolean>> deletePgDetail(@PathVariable Long id) {
		PgDetails pgDetail = pgDetailsRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("PG Detail not exist with id :" + id));

		pgDetailsRepository.delete(pgDetail);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
