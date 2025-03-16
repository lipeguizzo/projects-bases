package br.com.guizzo.projectbasic.infra.filesystem.adapters;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.InputStream;

@Data
@AllArgsConstructor
public class FileAdapter {
    private String name;
    private String relativePath;
    private InputStream content;
    private Long length;
    private String contentType;
    private byte[] bytes;
}
