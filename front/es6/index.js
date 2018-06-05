import polyfills from './libs/polifills.js';

window.addEventListener('DOMContentLoaded',()=>{
    polyfills();
    (()=>{
        document.getElementById('burger').addEventListener('click', (e)=>{
            let $navMobile = document.getElementById('nav-mobile');
            if($navMobile.classList.contains('visible')){
                $navMobile.classList.remove('visible');
                e.target.setAttribute('src','/css/img/burger.svg');
            }else{
                $navMobile.classList.add('visible');
                e.target.setAttribute('src','/css/img/close.svg');
            }

            e.preventDefault();
        });
    })();
    (()=>{
        let $inputs = document.querySelectorAll('.wrap-input input');

        $inputs.forEach(($input)=>{
            $input.addEventListener('focus', (e)=>{
                $input.parentNode.classList.add('focus');
            });
            $input.addEventListener('blur', (e)=>{
                $input.parentNode.classList.remove('focus');
            });
        });
    })();
});
