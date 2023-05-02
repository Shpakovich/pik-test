import {FormEventHandler} from "react";

export type Form = {
    name: string,
    surname: string,
    phone: string,
    email: string,
    roomCounter: number,
}

export class FormStore {
    constructor(updateState: void, state: Form) {
        // @ts-ignore
        this._updateState = updateState;
        // @ts-ignore
        this._state = state;
        // @ts-ignore
        this._callbacks = [];
    }

    get state() {
        // @ts-ignore
        return this._state;
    }

    // @ts-ignore
    update(action: Partial<Form>): FormEventHandler<HTMLFormElement> | undefined {
        // @ts-ignore
        this._state = this._updateState(this.state, action)
        // @ts-ignore
        this._callbacks.forEach(callback => callback())
    }

    subscribe(callback: any) {
        // @ts-ignore
        this._callbacks.push(callback);
        // @ts-ignore
        return ()=> this._callbacks = this._callbacks.filter(cb=> cb !== callback)
    }
}
