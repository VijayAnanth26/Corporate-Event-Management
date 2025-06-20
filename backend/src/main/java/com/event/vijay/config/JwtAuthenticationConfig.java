package com.event.vijay.config;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.event.vijay.utils.JwtUtils;

import io.micrometer.common.lang.NonNull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationConfig extends OncePerRequestFilter {

  private JwtUtils jwtUtil;
  private UserDetailsService userDetailsService;
  
  @Autowired
  public JwtAuthenticationConfig(JwtUtils jwtUtil, UserDetailsService userDetailsService) {
    this.jwtUtil = jwtUtil;
    this.userDetailsService = userDetailsService;
  }
  
  @Override
  protected void doFilterInternal(
    @NonNull HttpServletRequest request, 
    @NonNull HttpServletResponse response,
    @NonNull FilterChain filterChain)
    throws ServletException, IOException {

      String authHeader= request.getHeader(AUTHORIZATION);
      String token;
      String username;
      if(authHeader==null || !authHeader.startsWith("Bearer")){
        filterChain.doFilter(request, response);
        return;
      }
      token = authHeader.substring(7);
      username=jwtUtil.extractUsername(token);
      if(username != null && SecurityContextHolder.getContext().getAuthentication()==null){
        UserDetails userDetails= this.userDetailsService.loadUserByUsername(username);
        if(jwtUtil.isTokenValid(token, userDetails)) {
          UsernamePasswordAuthenticationToken authToken= new UsernamePasswordAuthenticationToken(userDetails,null, userDetails.getAuthorities());
          authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
          SecurityContextHolder.getContext().setAuthentication(authToken);
        }
        filterChain.doFilter(request, response);
      }
    }
}