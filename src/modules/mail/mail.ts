import { createTransport } from 'nodemailer';
import hbs from 'handlebars';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import fs from 'fs/promises';
import path from 'path';
import { IMailOption } from './domain/interfaces/mail-option.interface';

const registerPartials = async () => {
  const partialsDir = path.join(process.cwd(), '/public/templates/partials/');
  const partialFiles = await fs.readdir(partialsDir);

  for (const file of partialFiles) {
    const partialName = path.basename(file, '.hbs');
    const partialContent = await fs.readFile(
      path.join(partialsDir, file),
      'utf-8',
    );

    hbs.registerPartial(partialName, partialContent);
  }
};

const compileTemplate = async <T>(templateName: string, data: T) => {
  const filePath = path.join(
    process.cwd(),
    '/public/templates/views/',
    `${templateName}.hbs`,
  );
  const source = await fs.readFile(filePath, 'utf-8');
  const template = hbs.compile(source);
  return template(data);
};

export const transporter = createTransport(
  {
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    secure: process.env.MAIL_SECURE === 'true' ? true : false,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  } as SMTPTransport.Options,
  { from: process.env.MAIL_DEFAULT },
);

const sendMail = transporter.sendMail;

transporter.sendMail = async <T>(mailOptions: IMailOption<T>) => {
  await registerPartials();
  if (mailOptions.template) {
    const html = await compileTemplate(
      mailOptions.template,
      mailOptions.context,
    );
    mailOptions.html = html;
  }
  return sendMail.call(transporter, mailOptions);
};
