import {FormEventHandler} from "react";

type Form = {
    name: string,
    surname: string,
    phone: string,
    email: string,
    roomCounter: number,
}

// @ts-ignore
export function updateForm (state, action) {
    let newStore = {};
    for (var attr in action) {
        // @ts-ignore
        newStore[attr]= state[attr] + action[attr]
        console.error('newStore', newStore)
    }
    return {...state, ...newStore}
    // return Object.assign({}, state, action)
}

export class FormStore {
    // @ts-ignore
    constructor(updateState, state) {
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
    }

    subscribe(callback: any) {
        // @ts-ignore
        this._callbacks.push(callback);
        // @ts-ignore
        return ()=> this._callbacks = this._callbacks.filter(cb=> cb !== callback)
    }
}