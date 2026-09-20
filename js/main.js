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
    initProjectModal();
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

    // 留言接收邮箱（静态站点通过访客本机邮件客户端 mailto 投递，无需后端、不依赖任何第三方账号）
    const RECEIVE_EMAIL = '2803038543@qq.com';
    const statusEl = document.getElementById('formStatus');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;

    // 暂存最近一次留言，供状态条“复制”按钮使用
    let lastSubject = '';
    let lastBody = '';

    const legacyCopy = (text) => {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;';
        document.body.appendChild(ta);
        ta.select();
        let ok = false;
        try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
        ta.remove();
        return ok;
    };
    const copyText = (text) => {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text).then(() => true).catch(() => legacyCopy(text));
        }
        return Promise.resolve(legacyCopy(text));
    };

    // 状态条内“复制”按钮（事件委托，状态内容重建也不影响）
    if (statusEl) {
        statusEl.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-copy]');
            if (!btn) return;
            const text = btn.dataset.copy === 'email'
                ? RECEIVE_EMAIL
                : ('收件人：' + RECEIVE_EMAIL + '\n' +
                   '主题：' + lastSubject + '\n' +
                   '正文：\n' + lastBody);
            copyText(text).then((ok) => {
                const old = btn.textContent;
                btn.textContent = ok ? '已复制 ✓' : '请手动选择复制';
                btn.disabled = true;
                setTimeout(() => { btn.textContent = old; btn.disabled = false; }, 1600);
            });
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 原生必填 / 邮箱格式校验
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const data = Object.fromEntries(new FormData(form).entries());
        const name = (data.name || '').trim();
        const from = (data.email || '').trim();
        const subject = (data.subject || '').trim();
        const message = (data.message || '').trim();

        lastSubject = '【个人网站留言】' + (subject || '合作 / 交流咨询') + ' — ' + name;
        lastBody =
            '姓名：' + name + '\r\n' +
            '回复邮箱：' + from + '\r\n' +
            '主题：' + (subject || '（未填写）') + '\r\n' +
            '------------------------------\r\n' +
            message + '\r\n';
        const mailto =
            'mailto:' + RECEIVE_EMAIL +
            '?subject=' + encodeURIComponent(lastSubject) +
            '&body=' + encodeURIComponent(lastBody);

        submitBtn.innerHTML = '<span>正在打开邮件客户端…</span>';
        submitBtn.disabled = true;

        // 用临时隐藏链接触发协议，避免 location 导航在部分浏览器里打开空白新标签
        const a = document.createElement('a');
        a.href = mailto;
        a.rel = 'noopener';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        a.remove();

        if (statusEl) {
            statusEl.className = 'form-status is-info';
            statusEl.innerHTML =
                '📮 已尝试打开你的邮件客户端，收件人、主题和正文都已填好，点击「发送」即可。' +
                '<span class="form-status-actions">如果没有弹出窗口，可 ' +
                '<button type="button" class="form-copy-btn" data-copy="email">复制邮箱地址</button>' +
                ' 或 ' +
                '<button type="button" class="form-copy-btn" data-copy="body">复制留言全文</button>' +
                '，到你常用的邮箱（网页版也行）里发给我。</span>';
        }

        // 保留表单内容，避免邮件客户端未弹出时留言丢失
        setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        }, 1800);
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

/**
 * 项目详情弹窗
 * 点击任意 [data-modal="key"] 按钮，把 <template id="tpl-key"> 的内容注入通用弹窗并打开。
 * 后续新增项目详情只需：加一个 <template id="tpl-xxx"> + 在卡片放 data-modal="xxx" 按钮，无需改本函数。
 */
function initProjectModal() {
    const overlay = document.getElementById('projectModal');
    const bodyBox = document.getElementById('modalBody');
    const closeBtn = document.getElementById('modalClose');
    if (!overlay || !bodyBox) return;

    let lastFocus = null;

    function openModal(key) {
        const tpl = document.getElementById('tpl-' + key);
        if (!tpl) return;
        bodyBox.innerHTML = '';
        bodyBox.appendChild(tpl.content.cloneNode(true));
        overlay.classList.add('open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        overlay.scrollTop = 0;
        lastFocus = document.activeElement;
        const closeIcon = overlay.querySelector('.modal-close');
        if (closeIcon) closeIcon.focus();

        // 弹窗内锚点链接（如「咨询同类方案」）：关闭弹窗并平滑滚动到目标区块
        bodyBox.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (ev) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                ev.preventDefault();
                closeModal();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
                }
            });
        });
    }

    function closeModal() {
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        bodyBox.innerHTML = '';
        if (lastFocus && typeof lastFocus.focus === 'function') {
            lastFocus.focus();
        }
    }

    // 事件委托：所有「查看项目详情」按钮
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-modal]');
        if (trigger) {
            e.preventDefault();
            openModal(trigger.getAttribute('data-modal'));
            return;
        }
        // 点击遮罩空白区域关闭
        if (e.target === overlay) {
            closeModal();
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // ESC 关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('open')) {
            closeModal();
        }
    });
}
