/**
 * 3D 简历网站 - 主交互脚本
 */

document.addEventListener('DOMContentLoaded', function() {
    // 隐藏加载动画
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 1000);

    // 初始化所有功能
    initTypingEffect();
    initNavbar();
    initScrollProgress();
    initScrollReveal();
    initSkillBars();
    initCounterAnimation();
    initBackToTop();
    initMobileMenu();
    initContactForm();
    initSmoothScroll();
});

/**
 * 打字机效果
 */
function initTypingEffect() {
    const typedText = document.querySelector('.typed-text');
    if (!typedText) return;

    const phrases = [
        'AI 项目经理',
        'AI 交付经理',
        '智能体解决方案专家',
        '企业数字化转型顾问',
        'AI 交付工程师'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typedText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000; // 停顿
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/**
 * 导航栏滚动效果
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    window.addEventListener('scroll', () => {
        // 导航栏背景
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // 高亮当前导航项
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * 滚动进度条
 */
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

/**
 * 滚动显示动画
 */
function initScrollReveal() {
    // 为需要动画的元素添加 reveal 类
    const elementsToReveal = document.querySelectorAll(
        '.section-header, .about-content, .skill-category, .timeline-item, .project-card, .contact-info, .contact-form, .tech-tags'
    );

    elementsToReveal.forEach(el => {
        el.classList.add('reveal');
    });

    // 使用 Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

/**
 * 技能条动画
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

/**
 * 数字计数动画
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const suffixAttr = counter.getAttribute('data-suffix');
                const suffix = suffixAttr === null ? '+' : suffixAttr;
                animateCounter(counter, target, suffix);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target, suffix) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

/**
 * 返回顶部按钮
 */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * 移动端菜单
 */
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

/**
 * 联系表单
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // 这里可以添加实际的表单提交逻辑
        // 目前只是演示
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>发送中...</span>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<span>✓ 发送成功！</span>';
            form.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }, 1500);
    });
}

/**
 * 平滑滚动
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 鼠标视差效果（增强3D感）
 */
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    // 为Hero文字添加轻微视差
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.style.transform = `translate(${mouseX * 10}px, ${mouseY * 10}px)`;
    }
});

/**
 * 控制台彩蛋
 */
console.log('%c🎨 3D Resume Website', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%c高原 Noah · AI项目经理 / AI交付经理', 'font-size: 14px; color: #8b5cf6;');
console.log('%c欢迎查看源码！', 'font-size: 12px; color: #06b6d4;');
