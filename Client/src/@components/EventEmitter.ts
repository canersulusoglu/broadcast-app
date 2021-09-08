type CallbackFunctionType = (...args: any[]) => void;

class EventEmitter {
    events : any;
    constructor()
    {
        this.events = {};
    }

    _getEventListByName(eventName : string) : any
    {
        if (typeof this.events[eventName] === 'undefined')
        {
            this.events[eventName] = new Set();
        }
        return this.events[eventName]
    }

    on(eventName : string, fn : unknown) : any
    {
        this._getEventListByName(eventName).add(fn);
    }

    once(eventName : string, fn : CallbackFunctionType) : any
    {
        const onceFn = (...args)=> {
            this.removeListener(eventName, onceFn);
            fn.apply(this, args);
        };
        this.on(eventName, onceFn);

    }

    emit(eventName : string, ...args : Array<unknown>) : any
    {
        this._getEventListByName(eventName).forEach((fn)=> {

            fn.apply(this, args);

        });

    }

    removeListener(eventName : string, fn : unknown) : any
    {
        this._getEventListByName(eventName).delete(fn);
    }
}

export default EventEmitter;