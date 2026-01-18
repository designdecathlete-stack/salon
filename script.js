// ========================================
// ヘッダースクロール処理
// ========================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // スクロール時にヘッダーにクラスを追加
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ========================================
// モバイルメニュートグル
// ========================================
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// ナビゲーションリンククリック時にメニューを閉じる
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ========================================
// スムーススクロール
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// インタラクション強化
// ========================================

// CTAボタンのリップルエフェクト
const ctaButtons = document.querySelectorAll('.cta-button');

ctaButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// リップルエフェクト用のスタイルを動的に追加
const style = document.createElement('style');
style.textContent = `
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// パフォーマンス最適化
// ========================================

// 画像の遅延読み込み（将来的に画像を追加する場合）
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// REAL EXPERIENCE パララックス効果
// ========================================

// パララックス効果の実装
function initParallax() {
    const parallaxItems = document.querySelectorAll('.parallax-item');

    if (parallaxItems.length === 0) return;

    // スクロールイベントのスロットリング
    let ticking = false;

    function updateParallax() {
        const windowHeight = window.innerHeight;

        parallaxItems.forEach(item => {
            const speed = parseFloat(item.getAttribute('data-parallax')) || 0;
            const rect = item.getBoundingClientRect();

            // ビューポート内にある場合のみ計算
            if (rect.top < windowHeight && rect.bottom > 0) {
                // 画面中央からの距離に基づいてオフセットを計算
                const yPos = (rect.top - windowHeight / 2) * speed;
                item.style.transform = `translateY(${yPos}px)`;
            }
        });

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    // スクロールイベントリスナー
    window.addEventListener('scroll', requestTick);

    // 初回実行
    updateParallax();
}

// エントランスアニメーション（フェードイン）
function initEntranceAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // experience セクションの要素に適用
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach(item => {
        observer.observe(item);
    });
}

// ページロード時に初期化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initParallax();
        initEntranceAnimation();
        initFAQ();
        initModal();
    });
} else {
    initParallax();
    initEntranceAnimation();
    initFAQ();
    initModal();
}

// ========================================
// FAQ アコーディオン
// ========================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // 現在のアイテムがアクティブかどうか確認
            const isActive = item.classList.contains('active');

            // 他のアイテムを全て閉じる（オプション：複数同時に開きたい場合はこの行をコメントアウト）
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // 現在のアイテムをトグル
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// ========================================
// モーダルウィンドウ制御
// ========================================
function initModal() {
    const modal = document.getElementById('comingSoonModal');
    const ctaTriggers = document.querySelectorAll('.cta-trigger');
    const modalClose = modal.querySelector('.modal-close');
    const modalOverlay = modal.querySelector('.modal-overlay');

    // CTAボタンクリックでモーダルを開く
    ctaTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // スクロール防止
        });
    });

    // 閉じるボタンでモーダルを閉じる
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // スクロール復帰
    });

    // オーバーレイクリックでモーダルを閉じる
    modalOverlay.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // スクロール復帰
    });

    // ESCキーでモーダルを閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // スクロール復帰
        }
    });
}
