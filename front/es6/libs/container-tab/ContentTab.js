class ContentTab{
    constructor(){
        var $contenttabs = document.querySelectorAll(".content-tab");
        $contenttabs.forEach(($contentTab, i)=>{
            this.__buildStructure($contentTab);
        });
        this.__behavior();
        $contenttabs.forEach($content =>{
            $content.querySelector('nav a').click();
        });
    }

    __createArchitecture($el){
        var tpl = `
            <nav></nav>
            <div class="container"></div>
        `;
        $el.insertAdjacentHTML('afterbegin', tpl);
    }

    __appendNavigation($el){
        $el.querySelectorAll('.button').forEach(($button, k) =>{
            var tpl = `<a href="#">${$button.innerHTML}</a>`;
            $el.querySelector('nav').insertAdjacentHTML('beforeend',tpl);
            $button.parentNode.removeChild($button);
        });
    }

    __appendContent($el){
        $el.querySelectorAll('.content').forEach(($content,k)=>{
            $el.querySelector('.container').insertAdjacentHTML('beforeend', $content.outerHTML);
            $content.parentNode.removeChild($content);
        });
    }

    __buildStructure($el){
        this.__createArchitecture($el);
        this.__appendNavigation($el);
        this.__appendContent($el);
    }

    __hideAll($els){
        $els.forEach(($content) =>{
            $content.classList.add('hide');
            $content.classList.remove('current');
        });
    }

    __behavior(){
        let button = new Button('.content-tab nav a');
        button.on('click', ($el,e)=>{
            let index = 0;
            let $contents = $el.parentNode.nextElementSibling.querySelectorAll('.content');

            $el.parentNode.childNodes.forEach((btn, i)=>{
                btn.classList.remove('current');
                if(btn === $el){
                    index = i;
                }
            });
            $el.classList.add('current');

            this.__hideAll($contents);
            $contents[index].classList.remove('hide');
            $contents[index].classList.add('current');
        });
    }
}
