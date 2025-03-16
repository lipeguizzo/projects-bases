package br.com.guizzo.projectbasic.modules.mail.services;

import br.com.guizzo.projectbasic.modules.mail.domain.dto.MailAttachmentDTO;
import br.com.guizzo.projectbasic.modules.mail.domain.dto.MailOptionDTO;
import br.com.guizzo.projectbasic.modules.mail.mappers.MailAttachmentMapper;
import br.com.guizzo.projectbasic.shared.exceptions.BadRequestException;
import com.github.jknack.handlebars.Handlebars;
import com.github.jknack.handlebars.Template;
import com.github.jknack.handlebars.io.ClassPathTemplateLoader;
import com.github.jknack.handlebars.io.CompositeTemplateLoader;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MailSendService {

    @Autowired
    private JavaMailSender mailSender;

    private Handlebars handlebars;

    private List<MailAttachmentDTO> defaultAttachments;

    @Value("${MAIL_DEFAULT}")
    private String mailDefault;


    public MailSendService() {

        ClassPathTemplateLoader mainLoader = new ClassPathTemplateLoader("/templates/views", ".hbs");
        ClassPathTemplateLoader partialsLoader = new ClassPathTemplateLoader("/templates/partials", ".hbs");

        this.handlebars = new Handlebars(new CompositeTemplateLoader(mainLoader, partialsLoader));

        this.defaultAttachments = List.of(
                new MailAttachmentDTO(
                  "facebook.png",
                        "src/main/resources/templates/assets/icons/facebook.png",
                        "facebook",
                        null
                ),
                new MailAttachmentDTO(
                        "instagram.png",
                        "src/main/resources/templates/assets/icons/instagram.png",
                        "instagram",
                        null
                ),

                new MailAttachmentDTO(
                        "whatsapp.png",
                        "src/main/resources/templates/assets/icons/whatsapp.png",
                        "whatsapp",
                        null
                )
        );

    }


    public void execute(MailOptionDTO options) {
        try {
            Template template = handlebars.compile(options.getTemplate().toString());

            String emailContent = template.apply(options.getContext());
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(options.getTo());
            helper.setSubject(options.getSubject());
            helper.setText(emailContent, true);
            message.setFrom(mailDefault);

            List<MailAttachmentDTO> attachments = new ArrayList<>(this.defaultAttachments);
            if(options.getAttachments() != null) attachments.addAll(options.getAttachments());
            MailAttachmentMapper.toFile(attachments, helper);

            mailSender.send(message);

        }catch (Exception e) {
            throw new BadRequestException(e.getMessage());
        }
    }
}
