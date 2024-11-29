import { envs } from '../../config';

export class DiscordService {
  private readonly discordWebHookUrl = envs.DISCORD_WEBHOOK_URL;

  constructor() {}

  async notify(message: string) {
    const body = {
      content: message,
      //   embeds: [
      //     {
      //       image: {
      //         url: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGE1ZGYyZmdmcnk3cTRrYTBncTJhbDBna3AzZnc0YTlteHVuYTEyeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d9RbxjZ8QXesiYoerE/giphy.gif',
      //       },
      //     },
      //   ],
    };

    const response = await fetch(this.discordWebHookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (response.ok) return true;

    console.log('Error sending message to discord');
    return false;
  }
}
