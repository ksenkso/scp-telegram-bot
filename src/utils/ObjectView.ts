import { ScpObject } from '../types';

export default class ObjectView {

    static classNames: Record<string, string> = {
        keter: 'Кетер',
        thaumiel: 'Таумиэль',
        euclid: 'Евклид',
        safe: 'Безопасный',
        na: 'Не назначен или нейтрализован',
        nonstandard: 'Нестандартный класс'
    }

    static defaultClassName = ObjectView.classNames.na

    constructor(private info: ScpObject) {
    }

    get className(): string {
        let className = ObjectView.classNames[this.info.class]
        if (!className) {
            className = ObjectView.defaultClassName
        }
        return className
    }

    toString() {
        return `
[${this.info.name}](${this.info.link})
Класс объекта: ${this.className}
`
    }
}
