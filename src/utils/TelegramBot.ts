import { TelegrafContext } from 'telegraf/typings/context';
import { Telegraf } from 'telegraf';
import { AppConfig } from './AppConfig';

export default class TelegramBot {

    protected bot: Telegraf<TelegrafContext>;

    constructor(config: AppConfig) {
        this.bot = new Telegraf(config.get('BOT_TOKEN'));
    }

    launch() {
        return this.bot.launch()
    }
}
