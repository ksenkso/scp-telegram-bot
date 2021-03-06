import ScpApi from './services/ScpApi';
import { TelegrafContext } from 'telegraf/typings/context';
import { AppConfig } from './utils/AppConfig';
import Messages from './utils/messages';
import TelegramBot from './utils/TelegramBot';
import { ScpObject } from './types';
import ObjectView from './utils/ObjectView';

export class ScpBot extends TelegramBot {
    private api: ScpApi;
    private readonly replyTimeout: number;

    constructor(config: AppConfig) {
        super(config);
        this.api = new ScpApi(config);
        this.replyTimeout = +config.get('REPLY_TIMEOUT');
        this.bot.start(this.onStart.bind(this));
        this.bot.help(this.onHelp.bind(this));
        this.bot.hears(/^(\d+)$/, this.onNumber.bind(this));
        this.bot.hears(/.*/, ScpBot.onNotRecognized);
    }

    private onNumber(ctx: TelegrafContext) {
        if (ctx.match) {
            this.findObject(ctx, +ctx.match[0]);
        } else {
            ScpBot.replyNotFound(ctx);
        }
    }

    private static onNotRecognized(ctx: TelegrafContext) {
        ctx.reply(Messages.notRecognized)
    }

    private static replyNotFound(ctx: TelegrafContext) {
        ctx.reply(Messages.notFound);
    }

    private static buildObjectReply(ctx: TelegrafContext, info: ScpObject) {
        ctx.replyWithMarkdown(new ObjectView(info).toString());
    }

    findObject(ctx: TelegrafContext, objectNumber: number) {
        const messageTimeout = setTimeout(() => {
            ctx.reply(Messages.searching);
        }, this.replyTimeout);

        this.api.getInfo(objectNumber)
            .then(info => {
                if (info) {
                    ScpBot.buildObjectReply(ctx, info);
                } else {
                    ScpBot.replyNotFound(ctx);
                }
            })
            .catch(err => {
                console.error(err);
                ScpBot.replyNotFound(ctx);
            })
            .finally(() => {
                clearTimeout(messageTimeout);
            });
    }

    onHelp(ctx: TelegrafContext) {
        ctx.replyWithMarkdown(Messages.help);
    }

    onStart(ctx: TelegrafContext) {
        ctx.replyWithMarkdown(Messages.hello);
    }
}
