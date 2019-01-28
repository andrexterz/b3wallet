package com.andrebarca.services;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginService {

  @RequestMapping(value = "/api/login", method = RequestMethod.POST)
  public ResponseEntity<?> login(@RequestBody String credentials) {
    System.out.println(credentials);
    Map<String, Object> tokenMap = new HashMap<String, Object>();
    tokenMap.put("message", "jwt auth message test");
    tokenMap.put("token", UUID.randomUUID());
    return new ResponseEntity<>(tokenMap, HttpStatus.OK);
  }

  @RequestMapping(value = "/api/user", method = RequestMethod.GET)
  public ResponseEntity<Principal> getUser(Principal user) {
    return new ResponseEntity<>(user, HttpStatus.OK);
  }

}
