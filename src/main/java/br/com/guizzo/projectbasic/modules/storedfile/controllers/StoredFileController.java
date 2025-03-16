package br.com.guizzo.projectbasic.modules.storedfile.controllers;

import br.com.guizzo.projectbasic.infra.filesystem.adapters.FileAdapter;
import br.com.guizzo.projectbasic.modules.storedfile.services.StoredFileDownloadService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/files")
@Tag(name = "Files")
public class StoredFileController {

    @Autowired
    private StoredFileDownloadService storedFileDownloadService;

    @GetMapping("/{uuid}")
    public ResponseEntity<?> download(@PathVariable String uuid) {

        FileAdapter file = this.storedFileDownloadService.execute(uuid, false);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=" + file.getName());
        headers.add("Content-Type", file.getContentType());

        return ResponseEntity.ok()
                .headers(headers)
                .body(new InputStreamResource(file.getContent()));
    }

    @GetMapping("/public/{uuid}")
    public ResponseEntity<?> downloadPublic(@PathVariable String uuid) {

        FileAdapter file = this.storedFileDownloadService.execute(uuid, true);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=" + file.getName());
        headers.add("Content-Type", file.getContentType());

        return ResponseEntity.ok()
                .headers(headers)
                .body(new InputStreamResource(file.getContent()));
    }
}
