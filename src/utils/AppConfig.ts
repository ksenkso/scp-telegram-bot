import dotenv from 'dotenv';

export class AppConfig {
    static defaults = [
        'BOT_TOKEN',
        'SCP_API_URL',
        'REPLY_TIMEOUT'
    ];

    private vars: Map<string, string> = new Map<string, string>();

    constructor() {
        this.loadVariables(...AppConfig.defaults);
    }

    get(name: string): string {
        if (!this.vars.has(name)) {
            throw new Error(`No such env variable: '${name}'`);
        } else {
            return this.vars.get(name)!;
        }
    }

    loadVariables(...variables: string[]) {
        dotenv.config();
        variables.forEach(name => {
            if (!process.env.hasOwnProperty(name)) {
                throw new Error(
                    `Required environment variable is not defined:
                    '${name}' variable is required`
                );
            } else {
                this.vars.set(name, process.env[name]!);
            }
        });
    }
}
