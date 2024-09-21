import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AppService {
  constructor(private readonly mailService: MailerService) { }

  getHello(): string {
    return 'Hello World!';
  }

  sendMail(recipient: string, message: string) {

    this.mailService.sendMail({
      from: 'Focus Bear <noreply@focusbear.com>',
      to: recipient,
      subject: 'Invite to Focus Bear',
      text: message,
    });
  }
}