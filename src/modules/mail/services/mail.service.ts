import { join } from 'path';
import { IAttachment } from '../domain/interfaces/attachment.interface';
import { IMailOption } from '../domain/interfaces/mail-option.interface';
import { transporter } from '../mail';

class MailService {
  async send<T>(options: IMailOption<T>): Promise<void> {
    const defaultAttachments: IAttachment[] = [
      {
        filename: 'facebook.png',
        path: join(process.cwd(), 'public/templates/assets/icons/facebook.png'),
        cid: 'facebook',
      },
      {
        filename: 'instagram.png',
        path: join(
          process.cwd(),
          'public/templates/assets/icons/instagram.png',
        ),
        cid: 'instagram',
      },
      {
        filename: 'whatsapp.png',
        path: join(process.cwd(), 'public/templates/assets/icons/whatsapp.png'),
        cid: 'whatsapp',
      },
    ];
    await transporter.sendMail({
      ...options,
      attachments: [...defaultAttachments, ...(options.attachments ?? [])],
    });
  }
}

export const mailService = new MailService();
