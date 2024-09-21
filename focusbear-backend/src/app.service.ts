import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AppService {
  constructor(private readonly mailService: MailerService) { }

  getHello(): string {
    return 'Hello World!';
  }

  sendMail() {
    const message = 'Hi! Your friend just sent you an invite to Focus Bear!';
    const recipient = 'toby56@pm.me'

    this.mailService.sendMail({
      from: 'Focus Bear <noreply@focusbear.com>',
      to: recipient,
      subject: 'Invite to Focus Bear',
      text: message,
    });
  }
}