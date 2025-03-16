package br.com.guizzo.projectbasic.modules.mail.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MailAttachmentDTO{
    private final String filename;
    private final String path;
    private final String cid;
    private final String href;
}
