/* Slider */

class Slider{
    constructor(config){
        if(typeof config !== 'object' || config === undefined){
            this.config = {
                selector : '.slider',
                nav : {
                    arrow : true,
                    points : true
                },
                autoplay : true,
                effect: 'slideLeft',
                duration : 6000
            }
        }else{
            this.config = config;
        }

        this.properties = [];
        this.selector = this.config.selector;
        this.nodes = document.querySelectorAll(this.selector);

        this.properties.index = 0;
        this.properties.oldIndex;
        this.properties.active = false;
        this.properties.interval = 0;

        this.nodes.forEach((slider,i)=>{
            this.properties.push(this.initPropertiesSlide(i));
            this.makeNav(i);
            this.reset(i);
            this.resize(i);
            this.pause(i);
            this.textContent(i);
        });
    }

    textContent(i){
        let textContent = this.nodes[i].querySelectorAll('.text-content li');
        textContent.forEach((text, i)=>{
            text.classList.remove("on");
        });
        textContent[this.properties[i].index].classList.add("on");
    }

    animate(i){
        let currentProps = this.properties[i];
        let list = this.nodes[i].querySelectorAll('.content li');
        if(this.config.effect = "slideLeft"){
            list.forEach(function(elem,index){
                if(index != currentProps.oldIndex || index != currentProps.index){
                    elem.classList.remove("reduce-width");
                    elem.style.width = '100%';
                    elem.style.zIndex = '-10';
                }
            });
            if(list[currentProps.oldIndex] !== undefined){
                list[currentProps.oldIndex].style.zIndex = 15;
                list[currentProps.oldIndex].classList.add("reduce-width");
                list[currentProps.oldIndex].style.width = '0%';
            }
            list[currentProps.index].style.zIndex = 14;
        }
    }

    start(i){
        if(this.config.autoplay === true){
            let currentSlider = this.nodes[i];
            let btn = currentSlider.querySelectorAll('nav.arrow button.next');
            this.properties[i].interval = setInterval(function(){
                btn[0].click();
            },this.config.duration);
        }
    }

    stop(i){
        clearInterval(this.properties[i].interval);
    }

    pause(i){
        let slider = this;
        let sliderIndex = i;
        let currentSlider = this.nodes[sliderIndex];
        let currentProps = this.properties[sliderIndex];
        if(this.config.autoplay === true){
            currentSlider.addEventListener('mouseenter',function(){
                slider.stop(sliderIndex);
            })
            currentSlider.addEventListener('mouseleave',function(){
                slider.start(sliderIndex);
            })
        }
    }

    makeNav(i){
        var currentSlider = this.nodes[i];
        if(this.config.nav.arrow === true){
            let arrow = '<nav class="arrow"><button class="prev">previous</button><button class="next">next</button></nav>';
            currentSlider.insertAdjacentHTML('beforeend', arrow);
        }
        if(this.config.nav.points === true){
            let content = '';
            currentSlider.querySelectorAll('.content li').forEach((s,i)=>{
                let on = i === 0? ' class="on"' : '';
                content += `<button${on}></button>`;
            });
            let point = `<nav class="points">${content}</nav>`;
            currentSlider.insertAdjacentHTML('beforeend', point);
        }
    }

    initPropertiesSlide(i){
        let list = this.nodes[i].querySelectorAll('.content li');
        let node = this.nodes[i].querySelector('.content li > div.main-slider ');
        let w = parseInt(window.getComputedStyle(node).getPropertyValue('width'), 10);
        let h = parseInt(window.getComputedStyle(node).getPropertyValue('height'), 10);
        return {
            index : 0,
            oldIndex: list.length,
            interval: 0,
            contentWidth : w,
            contentHeight : h
        }
    }

    setPropertiesLi(i){
        this.nodes[i].querySelectorAll('.content li').forEach((li,i)=>{
            li.style.zIndex = (0 - i);
        });
    }

    reset(i){
        this.stop(i)
        let currentSlider = this.nodes[i];
        let list = this.nodes[i].querySelectorAll('.content li');
        let currentProps = this.properties[i];
        currentSlider.removeAttribute('style');
        let oldH = this.properties[i].contentHeight ;
        let w = parseInt(window.getComputedStyle(document.querySelectorAll(this.config.selector)[i]).getPropertyValue('width'), 10);
        let h = (oldH * w) / this.properties[i].contentWidth;
        this.properties[i] = {
            index : 0,
            oldIndex: list.length,
            interval: 0,
            contentWidth : w,
            contentHeight : h
        };
        currentSlider.style.width = this.properties[i].contentWidth + 'px';
        currentSlider.style.height = this.properties[i].contentHeight + 'px';
        currentSlider.querySelectorAll('.content li > div.main-slider').forEach((div)=>{
            if(!div.classList.contains('child-absolute')){
                div.classList.add('child-absolute');
            }
            div.style.width = this.properties[i].contentWidth + 'px';
            div.style.height = this.properties[i].contentHeight + 'px';
        });
        this.setPropertiesLi(i);
        if(this.config.effect === 'slideLeft'){
            list.forEach(function(elem,index){
                if(index === 0){
                    list[index].style.zIndex = 15;
                } else if (index === 1) {
                    list[index].style.zIndex = 14;
                } else {
                    elem.classList.remove("reduce-width");
                    elem.style.width = '100%';
                    elem.style.zIndex = '-10';
                }
            });
        }
        this.click(i);
        this.stop(i);
        this.start(i);
        this.textContent(i);
    }

    resize(i){
        let resizeDelay = this.debounce(()=> {
            this.reset(i);
        }, 250);
        window.addEventListener('resize', resizeDelay);
    }

    debounce(func, wait, immediate) {

        let timeout;
        return function() {
            let context = this, args = arguments;
            let later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            let callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        }; 
    }

    click(i){
        let sliderIndex = i;
        let currentSlider = this.nodes[sliderIndex];
        let currentProps = this.properties[sliderIndex];
        let config = this.config;
        let active = false;
        let buttons = this.nodes[sliderIndex].querySelectorAll('nav.points button');
        let navPointsLength = buttons.length - 1;
        let swipeContainer = new Hammer(this.nodes[sliderIndex]);
        let btnLeft = currentSlider.querySelectorAll('nav.arrow button.next');
        let btnRight = currentSlider.querySelectorAll('nav.arrow button.prev');
        swipeContainer.on('swipeleft', (e) => {
            btnLeft[0].click();
        });
        swipeContainer.on('swiperight', (e) => {
            btnRight[0].click();
        });
        if(config.nav.arrow === true){
            currentSlider.querySelectorAll('nav.arrow button').forEach((button, index)=>{
                button.addEventListener('click', (e)=>{
                    if(active === false){
                        active = true;
                         setTimeout(function(){
                            active = false;
                        },1500);
                        if(button.classList.contains('next')){
                            currentProps.oldIndex = currentProps.index;
                            if(currentProps.index === navPointsLength ){
                                currentProps.index = 0;
                            } else {
                                currentProps.index++;
                            }
                            this.animate(sliderIndex);
                            this.textContent(sliderIndex)
                            buttons.forEach((btn, i)=>{
                                btn.classList.remove("on");
                             });
                            buttons[currentProps.index].classList.add("on");
                        }
                        if(button.classList.contains('prev')){
                            currentProps.oldIndex = currentProps.index;
                            if(currentProps.index === 0){
                                currentProps.index = navPointsLength;
                            }else {
                                currentProps.index--;
                            }
                            this.animate(sliderIndex);
                            this.textContent(sliderIndex)
                            buttons.forEach((btn, i)=>{
                                btn.classList.remove("on");
                            });
                            buttons[currentProps.index].classList.add("on");
                        }
                    }
                    e.preventDefault();
                });
            });
        }
        if(this.config.nav.points === true){
            let buttons = this.nodes[sliderIndex].querySelectorAll('nav.points button');
            buttons.forEach((button, i)=>{
                button.addEventListener('click', (e)=>{
                    console.log('click');
                    if (active === false && i != currentProps.index){
                        active = true;
                        window.setTimeout(function(){
                            active = false;
                        }, 800);
                        buttons.forEach((btn, i)=>{
                            btn.classList.remove("on");
                        });
                        button.classList.add("on");
                        currentProps.oldIndex = currentProps.index;
                        currentProps.index = i;
                        this.animate(sliderIndex);
                        this.textContent(sliderIndex)
                    }
                    e.preventDefault();
                });
            });
        }
    }
}

export { Slider };
