function getProjectText(project, field, lang) {
  const val = project[field];
  if (val && typeof val === 'object' && val[lang]) return val[lang];
  if (val && typeof val === 'object' && val.fr) return val.fr;
  return val || '';
}

async function loadPortfolioProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    if (!projectsGrid) return;
    
    const lang = typeof getCurrentLang === 'function' ? getCurrentLang() : 'fr';
    const _t = typeof window.t === 'function' ? window.t : (k) => '';
    
    try {
        const projects = window.portfolioProjects || [];
        
        if (projects.length === 0) {
            projectsGrid.innerHTML = `
                <div class="no-projects">
                    <p>${_t('projects.aucunProjet') || 'Aucun projet disponible pour le moment.'}</p>
                </div>
            `;
            return;
        }
        
        projectsGrid.innerHTML = '';
        
        projects.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.style.opacity = '0';
            projectCard.style.transform = 'translateY(30px)';
            projectCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            projectCard.style.transitionDelay = `${index * 0.1}s`;
            
            const technologies = Array.isArray(project.technologies) 
                ? project.technologies 
                : [];
            
            const techBadges = technologies.map(tech => 
                `<span class="tech-badge">${tech}</span>`
            ).join('');
            
            const title = getProjectText(project, 'title', lang);
            const shortDesc = getProjectText(project, 'shortDesc', lang);
            const category = getProjectText(project, 'category', lang);
            
            projectCard.innerHTML = `
                ${project.featured ? `<div class="project-featured-badge">⭐ ${_t('projects.projetVedette') || 'Projet vedette'}</div>` : ''}
                ${project.imageUrl || project.videoUrl ? `
                    <div class="project-image ${project.videoUrl ? 'project-image-clickable' : ''}" ${project.videoUrl ? `data-video="${project.videoUrl}"` : ''}>
                        ${project.imageUrl ? `<img src="${project.imageUrl}" alt="${title}" loading="lazy">` : ''}
                        ${project.videoUrl ? `
                            <div class="project-video-overlay">
                                <button class="play-button" aria-label="${_t('projects.lireVideo') || 'Lire la vidéo'}">
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                        <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.6)"/>
                                        <path d="M32 24L20 32V16L32 24Z" fill="white"/>
                                    </svg>
                                </button>
                            </div>
                        ` : ''}
                    </div>
                ` : ''}
                <div class="project-content">
                    ${category ? `<span class="project-category">${category}</span>` : ''}
                    <h3 class="project-title">${title}</h3>
                    <p class="project-description">${shortDesc}</p>
                    ${technologies.length > 0 ? `
                        <div class="project-tech">
                            ${techBadges}
                        </div>
                    ` : ''}
                    <div class="project-links">
                        ${project.projectUrl ? `
                            <a href="${project.projectUrl}" target="_blank" rel="noopener noreferrer" class="project-link">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 18.333a8.333 8.333 0 1 0 0-16.666 8.333 8.333 0 0 0 0 16.666Z" stroke="currentColor" stroke-width="2"/>
                                    <path d="M6.667 10h6.666M10 6.667V13.333" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                                ${_t('projects.voirProjet') || 'Voir le projet'}
                            </a>
                        ` : ''}
                        ${project.githubUrl ? `
                            <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link project-link-secondary">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 0C4.477 0 0 4.477 0 10c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.481 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"/>
                                </svg>
                                ${_t('projects.codeSource') || 'Code source'}
                            </a>
                        ` : ''}
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(projectCard);
            
            setTimeout(() => {
                projectCard.style.opacity = '1';
                projectCard.style.transform = 'translateY(0)';
            }, 100);
        });
        
    } catch (error) {
        console.error('Error loading projects:', error);
        projectsGrid.innerHTML = `
            <div class="error-message">
                <p>❌ ${_t('projects.erreurChargement') || 'Erreur lors du chargement des projets.'}</p>
                <p>${_t('projects.reessayer') || 'Veuillez réessayer plus tard.'}</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadPortfolioProjects();
    
    const videoModal = document.getElementById('videoModal');
    const videoModalOverlay = document.getElementById('videoModalOverlay');
    const videoModalClose = document.getElementById('videoModalClose');
    const modalVideo = document.getElementById('modalVideo');
    
    function openVideoModal(videoUrl) {
        if (!videoModal || !modalVideo) return;
        modalVideo.src = videoUrl;
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        modalVideo.play().catch(() => {});
    }
    
    function closeVideoModal() {
        if (!videoModal || !modalVideo) return;
        modalVideo.pause();
        modalVideo.src = '';
        videoModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (videoModalOverlay) {
        videoModalOverlay.addEventListener('click', closeVideoModal);
    }
    
    if (videoModalClose) {
        videoModalClose.addEventListener('click', closeVideoModal);
    }
    
    document.addEventListener('click', (e) => {
        const playButton = e.target.closest('.play-button');
        if (playButton) {
            const overlay = playButton.closest('.project-video-overlay');
            const videoUrl = overlay?.closest('.project-image')?.dataset.video;
            if (videoUrl) {
                openVideoModal(videoUrl);
            }
            return;
        }
        
        const clickableImage = e.target.closest('.project-image-clickable');
        if (clickableImage) {
            const videoUrl = clickableImage.dataset.video;
            if (videoUrl) {
                openVideoModal(videoUrl);
            }
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal?.classList.contains('active')) {
            closeVideoModal();
        }
    });

    // Reload projects when language changes
    document.addEventListener('languageChanged', () => {
        loadPortfolioProjects();
    });
});
