import './index.css'
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';


gsap.config({ trialWarn: false });
gsap.registerPlugin(Flip, GSDevTools);

const preloaderBackground = document.querySelector('.preloader__background');
const preloaderText = document.querySelector('.preloader__text span');
const heroTitles = [...document.querySelectorAll('.hero__title span span')];
const heroImageStart = document.querySelector('.hero-image-start');
const heroCaption = document.querySelector('.hero__caption span');
const heroButton = document.querySelector('.hero__button');
const heroImageWrapper = document.querySelector('.hero__image');
const heroImage = document.querySelector('.hero__image img');
const headerItems = [...document.querySelectorAll('.header *')];

const master = gsap.timeline();

const setInitialState = () => {

    gsap.set(headerItems, {
        y: 24,
        autoAlpha: 0,
        
    });

    gsap.set(heroButton, {
        y: 65,
        autoAlpha: 0,

    });


    gsap.set([preloaderText, heroTitles, heroCaption], {
        yPercent: 100
    });
}

const preloaderAnimation = () => {
    const tl = gsap.timeline({

    defaults: {
        ease: 'power2.out'
    }

    });

    tl.to ( preloaderText, {
        yPercent: 0,
        delay: 0.3,
    })

    .to (preloaderText, {
        yPercent: -110,
        delay: 1.5

    })


    .to (preloaderBackground, {
        yPercent: -100,
        duration: 1.5,
        ease: 'power4.inOut'
    },'<')



    return tl;
}

const heroImageAnimation = () => {
    const tl = gsap.timeline({

        defaults: {
            ease:'power3.inOut',
            duration: 2,
        },
    });

    const state = Flip.getState(heroImageWrapper);
    heroImageStart.appendChild(heroImageWrapper);

    tl.from(heroImage, {
        scale: 1.05,
    })

    .to(heroImageWrapper, {
        borderRadius: '16px'

    }, '<')

    .add( () => {

        Flip.to(state, {

            duration: 2,
            ease: 'power3.inOut',
        });

    }, '<');

    return tl;
}


    
const UIAnimation = () => {
    const tl = gsap.timeline({
    delay: 0.5,

    defaults: {

        ease: 'power3.out',
        duration: 1.7,
        yPercent: 0,
        y: 0
    }


});

tl.to(heroCaption, {

    duration: 1.2,
    ease: 'power3.inOut'

})

.to(heroTitles, {

    stagger: 0.2

}, '-=0.9')

.to(heroButton, {

    autoAlpha: 1
}, '0.5')

.to(headerItems, {

    autoAlpha: 1
},'0.5')

    

return tl;


}


master 
  .add(setInitialState())
  .add(preloaderAnimation())
  .add(heroImageAnimation(), '-=1,5')
  .add(UIAnimation(), '<')


 //GSDevTools.create();

