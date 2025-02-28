import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import { User } from 'src/modules/user/entities/user.entity';
import { EmailConfiguration, WebConfiguration } from './../configuration.interface';
import { newUserTemplate } from './templates/new-user';

@Injectable()
export class EmailService {
  constructor(
    @InjectSendGrid() private readonly sendGridService: SendGridService,
    private readonly configService: ConfigService,
  ) {}

  async newUser(user: User): Promise<any> {
    const url = `${process.env.WEB_APP_URL}/auth/change-password/${user.changePasswordToken}`;

    const mail: MailDataRequired = {
      to: user.email,
      from: process.env.EMAIL_FROM_EMAIL,
      subject: `Welcome to ${process.env.APP_NAME}`,
      html: newUserTemplate(`${user.firstName} ${user.lastName}`, process.env.APP_NAME, url),
    };

    return await this.sendGridService.send(mail);
  }

  async changePassword(user: User, changePasswordToken: string): Promise<any> {
    const { url: webAppUrl } = this.configService.get<WebConfiguration>('web');
    const { fromEmail, requestPasswordTemplate } = this.configService.get<EmailConfiguration>('email');
    console.log(`${webAppUrl}/auth/change-password/${changePasswordToken}`);
    return await this.sendGridService.send({
      to: user.email,
      from: fromEmail,
      templateId: requestPasswordTemplate,
      dynamicTemplateData: {
        name: `${user.firstName} ${user.lastName}`,
        actionUrl: `${webAppUrl}/auth/change-password/${changePasswordToken}`,
      },
    });
  }
}
