/* ==========================================================================
   HOUSE OF PRESS - Interactive Web Application Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --------------------------------------------------------------------------
    // 1. Sticky Header & Glassmorphic Scroll Effect
    // --------------------------------------------------------------------------
    const header = document.querySelector('.header-glass');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --------------------------------------------------------------------------
    // 2. Dark / Light Theme Engine
    // --------------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    
    // Check saved preference or default to light alabaster
    const savedTheme = localStorage.getItem('hop-theme') || 'light';
    setTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(currentTheme);
    });

    function setTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>`;
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>`;
        }
        localStorage.setItem('hop-theme', theme);
    }

    // --------------------------------------------------------------------------
    // 3. Interactive Letterpress Deboss Simulator
    // --------------------------------------------------------------------------
    const virtualCard = document.getElementById('virtualCard');
    const simTitle = document.getElementById('simTitle');
    const simSub = document.getElementById('simSub');
    const simEmblem = document.getElementById('simEmblem');
    const paperPills = document.querySelectorAll('.paper-pill');
    const foilPills = document.querySelectorAll('.foil-pill');
    const depthSlider = document.getElementById('debossDepthSlider');
    const depthLabel = document.getElementById('debossDepthLabel');

    // Paper Selection
    paperPills.forEach(pill => {
        pill.addEventListener('click', () => {
            paperPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            const paper = pill.dataset.paper;

            if (paper === 'cotton-600') {
                virtualCard.style.backgroundColor = '#FAFAFA';
                virtualCard.style.border = '1px solid #E5E5E5';
            } else if (paper === 'duplex-900') {
                virtualCard.style.backgroundColor = '#F0EEE6';
                virtualCard.style.border = '2px solid #D6D2C4';
            } else if (paper === 'obsidian-black') {
                virtualCard.style.backgroundColor = '#161619';
                virtualCard.style.border = '1px solid #2C2C32';
            }
            updateSimVisuals();
        });
    });

    // Foil / Ink Selection
    foilPills.forEach(pill => {
        pill.addEventListener('click', () => {
            foilPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            updateSimVisuals();
        });
    });

    // Depth Slider
    if (depthSlider) {
        depthSlider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            let mode = 'medium';
            if (val < 35) mode = 'shallow';
            else if (val > 70) mode = 'deep';
            
            virtualCard.setAttribute('data-deboss', mode);
            depthLabel.textContent = `${val}% (${mode.toUpperCase()})`;
        });
    }

    function updateSimVisuals() {
        const activeFoil = document.querySelector('.foil-pill.active').dataset.foil;
        const activePaper = document.querySelector('.paper-pill.active').dataset.paper;
        const isDarkPaper = activePaper === 'obsidian-black';

        if (activeFoil === 'blind') {
            simTitle.style.color = isDarkPaper ? '#2B2B30' : '#E0DDD5';
            simSub.style.color = isDarkPaper ? '#2B2B30' : '#E0DDD5';
            simEmblem.style.fill = isDarkPaper ? '#2B2B30' : '#E0DDD5';
        } else if (activeFoil === 'crimson') {
            simTitle.style.color = '#A61C1D';
            simSub.style.color = '#A61C1D';
            simEmblem.style.fill = '#A61C1D';
        } else if (activeFoil === 'gold') {
            simTitle.style.color = '#D4AF37';
            simSub.style.color = '#D4AF37';
            simEmblem.style.fill = '#D4AF37';
        }
    }

    // Initial setup call
    updateSimVisuals();

    // --------------------------------------------------------------------------
    // 4. Portfolio Filter Tabs & Lightbox Modal
    // --------------------------------------------------------------------------
    const filterTabs = document.querySelectorAll('.filter-tab');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const category = tab.dataset.filter;

            portfolioCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Lightbox Modal
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxSpecs = document.getElementById('lightboxSpecs');
    const closeLightboxBtn = document.getElementById('closeLightboxBtn');

    portfolioCards.forEach(card => {
        card.addEventListener('click', () => {
            const imgSrc = card.querySelector('img').src;
            const title = card.querySelector('.overlay-title')?.textContent || 'Bespoke Impression';
            const specs = card.querySelector('.overlay-desc')?.textContent || '600gsm Cotton Paper • Hand Pressed';

            if (lightboxModal && lightboxImg) {
                lightboxImg.src = imgSrc;
                lightboxTitle.textContent = title;
                lightboxSpecs.textContent = specs;
                lightboxModal.classList.add('open');
            }
        });
    });

    if (closeLightboxBtn) {
        closeLightboxBtn.addEventListener('click', () => {
            lightboxModal.classList.remove('open');
        });
    }

    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.classList.remove('open');
            }
        });
    }

    // --------------------------------------------------------------------------
    // 5. Process Accordion
    // --------------------------------------------------------------------------
    const accordionItems = document.querySelectorAll('.process-accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            accordionItems.forEach(i => i.classList.remove('active'));
            if (!isOpen) {
                item.classList.add('active');
            }
        });
    });

    // --------------------------------------------------------------------------
    // 6. Multi-Step Consultation Questionnaire Modal
    // --------------------------------------------------------------------------
    const consultationModal = document.getElementById('consultationModal');
    const openConsultationBtns = document.querySelectorAll('.open-consultation-btn');
    const closeConsultationBtn = document.getElementById('closeConsultationBtn');
    const modalSteps = document.querySelectorAll('.modal-form-step');
    const stepDots = document.querySelectorAll('.step-dot');
    const prevStepBtn = document.getElementById('prevStepBtn');
    const nextStepBtn = document.getElementById('nextStepBtn');
    const estimateSpan = document.getElementById('liveEstimateSpan');

    let currentStep = 0;

    openConsultationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentStep = 0;
            updateModalStep();
            consultationModal.classList.add('open');
        });
    });

    if (closeConsultationBtn) {
        closeConsultationBtn.addEventListener('click', () => {
            consultationModal.classList.remove('open');
        });
    }

    if (consultationModal) {
        consultationModal.addEventListener('click', (e) => {
            if (e.target === consultationModal) {
                consultationModal.classList.remove('open');
            }
        });
    }

    if (nextStepBtn) {
        nextStepBtn.addEventListener('click', () => {
            if (currentStep < modalSteps.length - 1) {
                currentStep++;
                updateModalStep();
            } else {
                // Submit Form
                const step5 = document.querySelector('.modal-form-step[data-step="4"]');
                step5.innerHTML = `
                    <div style="text-align: center; padding: 40px 0;">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#A61C1D" stroke-width="2" style="margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto;">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <h3 class="font-display" style="font-size: 2rem; margin-bottom: 12px;">Impression Received</h3>
                        <p style="color: var(--text-secondary); max-width: 480px; margin: 0 auto 24px;">Thank you for initiating your bespoke project with House of Press. Our studio master will review your specs and contact you within 24 hours.</p>
                        <button class="btn-primary-press" onclick="document.getElementById('consultationModal').classList.remove('open')">Close Window</button>
                    </div>
                `;
                nextStepBtn.style.display = 'none';
                prevStepBtn.style.display = 'none';
            }
        });
    }

    if (prevStepBtn) {
        prevStepBtn.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                updateModalStep();
            }
        });
    }

    function updateModalStep() {
        modalSteps.forEach((step, idx) => {
            step.classList.toggle('active', idx === currentStep);
        });

        stepDots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx <= currentStep);
        });

        if (prevStepBtn) prevStepBtn.style.visibility = currentStep === 0 ? 'hidden' : 'visible';
        if (nextStepBtn) {
            nextStepBtn.textContent = currentStep === modalSteps.length - 1 ? 'Submit Spec Request' : 'Next Step';
        }

        calculateEstimate();
    }

    // Option selections inside questionnaire
    document.querySelectorAll('.quiz-option-card').forEach(card => {
        card.addEventListener('click', () => {
            const parentGroup = card.closest('.quiz-options-group');
            if (parentGroup) {
                parentGroup.querySelectorAll('.quiz-option-card').forEach(c => c.classList.remove('active'));
            }
            card.classList.add('active');
            calculateEstimate();
        });
    });

    function calculateEstimate() {
        if (!estimateSpan) return;
        let base = 250;

        const paperOpt = document.querySelector('.quiz-option-card.active[data-cost-paper]');
        const techOpt = document.querySelector('.quiz-option-card.active[data-cost-tech]');
        const qtyOpt = document.querySelector('.quiz-option-card.active[data-cost-qty]');

        if (paperOpt) base += parseInt(paperOpt.dataset.costPaper);
        if (techOpt) base += parseInt(techOpt.dataset.costTech);
        if (qtyOpt) base *= parseFloat(qtyOpt.dataset.costQty);

        estimateSpan.textContent = `$${Math.round(base)} - $${Math.round(base * 1.25)} USD`;
    }

    // --------------------------------------------------------------------------
    // 7. Scroll Reveal Animations (IntersectionObserver)
    // --------------------------------------------------------------------------
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        revealObserver.observe(el);
    });

});
