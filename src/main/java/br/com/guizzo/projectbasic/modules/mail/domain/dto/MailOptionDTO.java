package br.com.guizzo.projectbasic.modules.mail.domain.dto;

import br.com.guizzo.projectbasic.modules.mail.domain.enums.MailTemplate;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class MailOptionDTO<T>{
    private final String[] to;
    private final String subject;
    private final MailTemplate template;
    private final T context;
    private final List<MailAttachmentDTO> attachments;
}
