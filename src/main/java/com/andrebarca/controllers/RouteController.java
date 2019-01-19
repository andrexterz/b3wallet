package com.andrebarca;

import java.util.Enumeration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.core.annotation.Order;
import javax.servlet.Filter;
import javax.servlet.FilterConfig;
import javax.servlet.FilterChain;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
@Order(1)
public class RouteController implements Filter {

  @RequestMapping(value = "/{path:[^\\.]*}")
  public String redirect() {
    return "forward:/";
  }

  @Override
  public void doFilter (ServletRequest request, ServletResponse response, FilterChain chain) throws ServletException, IOException {
    HttpServletRequest req = (HttpServletRequest) request;
    HttpServletResponse res = (HttpServletResponse) response;

    System.out.println("request: " + req.getRequestURI());

    Enumeration<String> headers = req.getHeaderNames();
    while (headers.hasMoreElements()) {
        String headerName = headers.nextElement();
        System.out.println("Header -> " + headerName + ": " + req.getHeader(headerName));
    }

    chain.doFilter(request, response);
    System.out.println("response: " + res.getContentType());
  }

  @Override
  public void init(FilterConfig filterConfig) throws ServletException {

  }

  @Override
  public void destroy () {

  }
}
