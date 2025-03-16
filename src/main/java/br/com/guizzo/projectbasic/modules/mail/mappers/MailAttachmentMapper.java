package br.com.guizzo.projectbasic.modules.mail.mappers;

import br.com.guizzo.projectbasic.modules.mail.domain.dto.MailAttachmentDTO;
import jakarta.mail.MessagingException;
import org.springframework.mail.javamail.MimeMessageHelper;

import java.io.File;
import java.util.List;

public class MailAttachmentMapper {
    public static void toFile(List<MailAttachmentDTO> attachments, MimeMessageHelper helper) throws MessagingException {
        for (MailAttachmentDTO attachment : attachments) {
            File file = new File(attachment.getPath());
            if (attachment.getCid() != null && !attachment.getCid().isEmpty()) {
                addInlineAttachment(attachment, helper, file);
            } else {
                addRegularAttachment(attachment, helper, file);
            }
        }
    }

    private static void addInlineAttachment(MailAttachmentDTO attachment, MimeMessageHelper helper, File file) throws MessagingException {
        helper.addInline(attachment.getCid(), file);
    }

    private static void addRegularAttachment(MailAttachmentDTO attachment, MimeMessageHelper helper, File file) throws MessagingException {
        helper.addAttachment(attachment.getFilename(), file);
    }
}
