package com.andrebarca.services;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JsonDataSource;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
/**
 *
 * @author andre
 */
@RestController
public class RelatorioService {

    @RequestMapping(value = "/api/json/report", method=RequestMethod.POST)
    public ResponseEntity<?> report(InputStream data) throws IOException, JRException {
        String reportName = "proventos";
    	String filename = "download";
        JsonDataSource datasource = new JsonDataSource(data);
        System.out.println(datasource.toString());
        Map<String,Object> reportParameters = new HashMap<>();
        reportParameters.put("PAGE_TITLE", "Exemplo Jasper PDF");
        File file = new ClassPathResource(String.format("reports/%s.jrxml", reportName)).getFile();
        JasperDesign jasperDesign = JRXmlLoader.load(file.getAbsolutePath());
        JasperReport jasperReport = JasperCompileManager.compileReport(jasperDesign);
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, reportParameters, datasource);
        byte[] content = JasperExportManager.exportReportToPdf(jasperPrint);
        return ResponseEntity.ok()
        		.header("Content-Disposition", String.format("attachment; filename=\"%s.pdf\"", filename))
        		.contentLength(content.length)
        		.contentType(MediaType.APPLICATION_PDF)
        		.body(content);
    }
}
