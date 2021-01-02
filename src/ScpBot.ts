import ScpApi from './ScpApi';
import { TelegrafContext } from 'telegraf/typings/context';
import { AppConfig } from './AppConfig';
import Messages from './utils/messages';
import TelegramBot from './utils/TelegramBot';
import { ScpObject } from './types';

export class ScpBot extends TelegramBot {
    private api: ScpApi;

    constructor(config: AppConfig) {
        super(config);
        this.api = new ScpApi(config);
        this.bot.hears(/(\d+)/, this.onNumber.bind(this));
    }

    private onNumber(ctx: TelegrafContext) {
        if (ctx.match) {
            this.findObject(ctx, +ctx.match[0]);
        } else {
            ScpBot.replyNotFound(ctx);
        }
    }

    private static replyNotFound(ctx: TelegrafContext) {
        ctx.reply(Messages.notFound);
    }

    findObject(ctx: TelegrafContext, objectNumber: number) {
        ctx.reply('Looking up in the database...👀');
        this.api.getInfo(objectNumber)
            .then(info => {
                ScpBot.buildObjectReply(ctx, info);
            })
            .catch(err => {
                console.error(err);
                ScpBot.replyNotFound(ctx);
            });
    }


    private static buildObjectReply(ctx: TelegrafContext, info: ScpObject) {
        const message = `[${info.name}](${info.link})`;
        ctx.reply(message, {
            parse_mode: 'MarkdownV2'
        });
    }
}
