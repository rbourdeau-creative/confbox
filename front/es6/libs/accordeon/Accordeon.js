import { Configuration } from '../configuration/Configuration';
import { Element } from '../element/Element';
import { Button } from '../element/Button';

class Accordeon{
    constructor(options = {}){
        // this.config = {
        //     selector : ".accordeon",
        //     fx : [scale, fold, shrink, opacity],
        // }

        this.config = this.__getConfig(options);
        this.__setContentHeight();
        this.__closeAll(document.querySelectorAll('.content-accordeon'));
        this.__click();
        document.querySelectorAll(this.config.selector).forEach(($ac,i)=>{
            $ac.querySelector('.button').click();
        });
    }

    __getConfig(options){
        let config = new Configuration(options);
        let defaultValues = [
            {
                "k" : "selector",
                "f" : "string",
                "v" : ".accordeon"
            },
            {
                "k" : "fx",
                "f" : "string",
                "v" : "slide" //scale, fold, shrink, opacity
            }
        ];

        for(var i = 0; i < defaultValues.length; i++){
            config.update(defaultValues[i]['k'], defaultValues[i]['v'], defaultValues[i]['f'], options);
        }

        return config.get();
    }



    __closeAll($contents){
        $contents.forEach(($content)=>{
            $content.style.height = 0;
            $content.previousElementSibling.classList.add('closed');
            this.__addFx($content);
        });
    }

    __setContentHeight(){
        document.querySelectorAll('.content-accordeon').forEach(($content)=>{
            let element = new Element();
            element.$el = $content;
            element.setProperties('height');
            $content.setAttribute('data-height', element.getProperties().height);
        });
    }

    __click(){
        let $button = new Button(this.config.selector + ' .button');
        $button.on('click', (el, e)=>{
            let $content = el.nextElementSibling;
            if(el.classList.contains('closed')){
                this.__closeAll(el.closest(this.config.selector).querySelectorAll('.content-accordeon'));
                el.classList.remove('closed');
                $content.style.height = $content.getAttribute('data-height');
                $content.firstElementChild.classList.remove(this.__getFx());
            }else{
                $content.style.height = 0 + 'px';
                el.classList.add('closed');
                $content.firstElementChild.classList.add(this.__getFx());
            }
        });
    }

    __getFx(){
        let fxanimation = '';
        switch(this.config.fx){
            case "scale":
                fxanimation = 'fx-scale';
                break;
            case "fold":
                fxanimation = 'fx-fold';
                break;
            case "shrink":
                fxanimation = 'fx-shrink';
                break;
            case "opacity":
                fxanimation = 'fx-opacity';
                break;
            default:
                fxanimation = 'fx-slide';
                break;
        }
        return fxanimation;
    }

    __addFx($el){
        let fx = this.__getFx();
        $el.firstElementChild.classList.add(fx);
    }
}

export { Accordeon }
