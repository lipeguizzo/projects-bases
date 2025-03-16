package br.com.guizzo.projectbasic.infra.filesystem.mappers;

import br.com.guizzo.projectbasic.infra.filesystem.adapters.FileAdapter;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public class FileMapper {
    public static FileAdapter toFileAdapter(MultipartFile file) throws IOException {
        if (file == null) {
            throw new IllegalArgumentException("Arquivo não pode ser nulo!");
        }

        return new FileAdapter(
                file.getOriginalFilename(),
                file.getName(),
                file.getInputStream(),
                file.getSize(),
                file.getContentType(),
                file.getBytes()
        );
    }
}
