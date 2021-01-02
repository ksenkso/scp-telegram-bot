import {HearsTriggers} from 'telegraf/typings/composer';
import {TelegrafContext} from 'telegraf/typings/context';

export const hears = (triggers: HearsTriggers<TelegrafContext>) => {
    return (target: any, key: string, descriptor: TypedPropertyDescriptor<any>) => {
        if (!target.hearCallbacks) {
            target.hearCallbacks = [];
        }
        target.hearCallbacks.push({
            callback: descriptor.value,
            triggers,
        });
    };
}
