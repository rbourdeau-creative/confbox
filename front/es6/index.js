window.addEventListener('DOMContentLoaded',(e)=>{
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
});
