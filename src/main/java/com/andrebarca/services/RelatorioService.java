package com.andrebarca.services;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
/**
 *
 * @author andre
 */
@RestController
public class RelatorioService {

    @RequestMapping(value = "/api/dividendos/report", method=RequestMethod.POST)
    public ResponseEntity<?> report(@RequestBody Map<String, Object> data) throws IOException {
        data.forEach((k, v) -> {
            System.out.println(k + " ---> " + v);
        } );
        //JsonDataSource datasource = new  JsonDataSource();
        //
        Map reportParameters = new HashMap();
        File file = new ClassPathResource("reports/dividendos.jrxml").getFile();
        JasperDesign jasperDesign = JRXmlLoader.load(file.getAbsolutePath());
        JasperReport jasperReport = JasperCompileManager.compileReport(jasperDesign);
        //JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, reportParameters, datasource);


        return new ResponseEntity<>(file, HttpStatus.OK);
    }
}
