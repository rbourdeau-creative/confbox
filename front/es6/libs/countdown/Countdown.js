/*
                       ..,co88oc.oo8888cc,..
  o8o.               ..,o8889689ooo888o"88888888oooc..
.88888             .o888896888".88888888o'?888888888889ooo....
a888P          ..c6888969""..,"o888888888o.?8888888888"".ooo8888oo.
088P        ..atc88889"".,oo8o.86888888888o 88988889",o888888888888.
888t  ...coo688889"'.ooo88o88b.'86988988889 8688888'o8888896989^888o
 888888888888"..ooo888968888888  "9o688888' "888988 8888868888'o88888
  ""G8889""'ooo888888888888889 .d8o9889""'   "8688o."88888988"o888888o .
           o8888'""""""""""'   o8688"          88868. 888888.68988888"o8o.
           88888o.              "8888ooo.        '8888. 88888.8898888o"888o.
           "888888'               "888888'          '""8o"8888.8869888oo8888o .
      . :.:::::::::::.: .     . :.::::::::.: .   . : ::.:."8888 "888888888888o
                                                        :..8888,. "88888888888.
                                                        .:o888.o8o.  "866o9888o
                                                         :888.o8888.  "88."89".
                                                        . 89  888888    "88":.
                                                        :.     '8888o
                                                         .       "8888..
                                                                   888888o.
                                                                    "888889,
                                                             . : :.:::::::.: :.
*/
class Countdown{
    constructor(options){
        // this.config = {
        //     date : {
        //         y : 2020,
        //         m : 0,
        //         d : 1,
        //         h : 0,
        //         i : 0,
        //         s : 0
        //     },
        //     tpl : ``,
        //     selector : {
        //
        //     },
        //     destination : '',
        //     words : {
        //         d : {
        //             singular : 'day',
        //             plurial : 'days'
        //         },
        //         h : {
        //             singular : 'hour',
        //             plurial : 'hours'
        //         },
        //         i : {
        //             singular : 'minute',
        //             plurial : 'minutes'
        //         },
        //         s : {
        //             singular : 'second',
        //             plurial : 'seconds'
        //         },
        //     }
        // }

        this.config = this.__getConfig(options);
        //console.log('config --> ', this.config);
        const SPEED = 1000;
        this.launch = new Date(this.config.date.y, this.config.date.m, this.config.date.d, this.config.date.h, this.config.date.i, this.config.date.s);

        if(document.querySelector(this.config.destination)){
            document.querySelector(this.config.destination).innerHTML = this.config.tpl;
        }
        setInterval(()=>{
            this.setDate();
        }, SPEED);
    }

    __getConfig(options){
        let config = new Configuration(options);
        let defaultValues = [
            {
                "k" : "date",
                "f" : "object",
                "v" : {
                    "y" : new Date().getFullYear() + 1,
                    "m" : 0,
                    "d" : 1,
                    "h" : 0,
                    "i" : 0,
                    "s" : 0,
                }
            },
            {
                "k" : "tpl",
                "f" : "string",
                "v" : `
                    <span id="c-day"><span class="number"></span> <span class="word"></span></span>
                    <span id="c-hour"><span class="number"></span> <span class="word"></span></span>
                    <span id="c-minute"><span class="number"></span> <span class="word"></span></span>
                    <span id="c-second"><span class="number"></span> <span class="word"></span></span>
                `
            },
            {
                "k" : "selector",
                "f" : "object",
                "v" : {
                    d : '#c-day',
                    h : '#c-hour',
                    i : '#c-minute',
                    s : '#c-second',
                }
            },
            {
                "k" : "destination",
                "f" : "string",
                "v" : "#countdown"
            },
            {
                "k" : "words",
                "f" : "object",
                "v" : {
                    d : {
                        singular : 'day',
                        plurial : 'days'
                    },
                    h : {
                        singular : 'hour',
                        plurial : 'hours'
                    },
                    i : {
                        singular : 'minute',
                        plurial : 'minutes'
                    },
                    s : {
                        singular : 'second',
                        plurial : 'seconds'
                    },
                }
            }
        ];
        for(var i = 0; i < defaultValues.length; i++){
            config.update(defaultValues[i]['k'], defaultValues[i]['v'], defaultValues[i]['f'], options);
        }
        return config.get();
    }

    setDate(){
        let now = new Date();
        let s = ((this.launch.getTime() - now.getTime()) / 1000) - now.getTimezoneOffset() * 60;
        let d = Math.floor(s / 86400);

        if(document.querySelector(`${this.config.selector.d} .number`)){
            document.querySelector(`${this.config.selector.d} .number`).textContent = d < 10 ? '0' + d : d;
            document.querySelector(`${this.config.selector.d} .word`).textContent = d > 1 ? this.config.words.d.plurial : this.config.words.d.singular;
        }

        s -= d * 86400;
        let h = Math.floor(s / 3600);
        if(document.querySelector(`${this.config.selector.h} .number`)){
            document.querySelector(`${this.config.selector.h} .number`).textContent = h < 10 ? '0' + h : h;
            document.querySelector(`${this.config.selector.h} .word`).textContent = h > 1 ? this.config.words.h.plurial : this.config.words.h.singular;
        }

        s -= h * 3600;
        let m = Math.floor(s / 60);

        if(document.querySelector(`${this.config.selector.i} .number`)){
            document.querySelector(`${this.config.selector.i} .number`).textContent = m < 10 ? '0' + m : m;
            document.querySelector(`${this.config.selector.i} .word`).textContent = m > 1 ? this.config.words.i.plurial : this.config.words.i.singular;
        }

        s -= m * 60;
        s = Math.floor(s);

        if(document.querySelector(`${this.config.selector.s} .number`)){
            document.querySelector(`${this.config.selector.s} .number`).textContent = s < 10 ? '0' + s : s;
            document.querySelector(`${this.config.selector.s} .word`).textContent = s > 1 ? this.config.words.s.plurial : this.config.words.s.singular;
        }
    }
}
