import dotenv from 'dotenv';
import { ScpBot } from './ScpBot';
import { AppConfig } from './AppConfig';

dotenv.config();

if (!process.env.BOT_TOKEN) {
    throw new Error('Bot token is not defined');
}

const bot = new ScpBot(new AppConfig())
bot.launch()
