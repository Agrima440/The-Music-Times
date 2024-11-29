import { gsap } from 'gsap';

const createContainer = () => {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.position = 'fixed';
    container.style.top = '1rem';
    container.style.right = '1rem';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
  }
  return container;
};

const toastTypes = {
  success: {
    icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M352 176L217.6 336 160 272"/>
    </svg>`,
    backgroundColor: '#f0fdf4',
    gradient: 'linear-gradient(145deg, #dcfce7, #86efac)',
    borderColor: '#86efac',
    textColor: '#166534',
    iconBackground: '#22c55e'
  },
  error: {
    icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320L192 192M192 320l128-128"/>
    </svg>`,
    backgroundColor: '#fef2f2',
    gradient: 'linear-gradient(145deg, #fee2e2, #fca5a5)',
    borderColor: '#fca5a5',
    textColor: '#991b1b',
    iconBackground: '#ef4444'
  },
  warning: {
    icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M250.26 166.05L256 288l5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 6z"/>
      <path d="M256 367.91a20 20 0 1120-20 20 20 0 01-20 20z"/>
    </svg>`,
    backgroundColor: '#fffbeb',
    gradient: 'linear-gradient(145deg, #fef3c7, #fcd34d)',
    borderColor: '#fcd34d',
    textColor: '#92400e',
    iconBackground: '#f59e0b'
  },
  info: {
    icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M220 220h32v116"/>
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M208 340h88"/>
      <path d="M248 130a26 26 0 1026 26 26 26 0 00-26-26z"/>
    </svg>`,
    backgroundColor: '#eff6ff',
    gradient: 'linear-gradient(145deg, #dbeafe, #93c5fd)',
    borderColor: '#93c5fd',
    textColor: '#1e40af',
    iconBackground: '#3b82f6'
  }
};

export const showToast = (message, type = 'info', duration = 3000) => {
  const container = createContainer();
  const styles = toastTypes[type];
  
  // Create toast wrapper
  const toast = document.createElement('div');
  Object.assign(toast.style, {
    backgroundColor: styles.backgroundColor,
    background: styles.gradient,
    padding: '1rem',
    borderRadius: '1rem',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    minWidth: '300px',
    maxWidth: '500px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    opacity: 0,
    transform: 'translateX(100%) scale(0.9)',
    position: 'relative',
    overflow: 'hidden'
  });

  // Create icon container
  const iconContainer = document.createElement('div');
  Object.assign(iconContainer.style, {
    backgroundColor: styles.iconBackground,
    color: 'white',
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: '0',
    fontSize: '1.5rem'
  });
  iconContainer.innerHTML = styles.icon;

  // Create message container
  const messageContainer = document.createElement('div');
  Object.assign(messageContainer.style, {
    flex: '1',
    color: styles.textColor,
    fontWeight: '500'
  });
  messageContainer.textContent = message;

  // Create close button
  const closeButton = document.createElement('button');
  Object.assign(closeButton.style, {
    border: 'none',
    background: 'none',
    color: styles.textColor,
    padding: '0.5rem',
    borderRadius: '50%',
    width: '2rem',
    height: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  });
  closeButton.innerHTML = `<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>`;

  // Create progress bar
  const progressBar = document.createElement('div');
  Object.assign(progressBar.style, {
    position: 'absolute',
    bottom: '0',
    left: '0',
    height: '3px',
    backgroundColor: styles.iconBackground,
    width: '100%',
    transformOrigin: 'left',
    transform: 'scaleX(1)'
  });

  // Assemble toast
  toast.appendChild(iconContainer);
  toast.appendChild(messageContainer);
  toast.appendChild(closeButton);
  toast.appendChild(progressBar);
  container.appendChild(toast);

  // Animations
  const tl = gsap.timeline();
  
  // Entrance animation
  tl.to(toast, {
    x: 0,
    opacity: 1,
    scale: 1,
    duration: 0.3,
    ease: 'back.out(1.7)'
  });

  // Progress bar animation
  tl.to(progressBar, {
    scaleX: 0,
    duration: duration / 1000,
    ease: 'none'
  }, 0);

  // Hover effects
  toast.addEventListener('mouseenter', () => {
    gsap.to(toast, {
      scale: 1.02,
      duration: 0.2
    });
    gsap.to(progressBar, { scaleX: 0 });
  });

  toast.addEventListener('mouseleave', () => {
    gsap.to(toast, {
      scale: 1,
      duration: 0.2
    });
    gsap.to(progressBar, {
      scaleX: 0,
      duration: 1,
      onComplete: closeToast
    });
  });

  // Close handler
  const closeToast = () => {
    gsap.to(toast, {
      x: 100,
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      ease: 'back.in(1.7)',
      onComplete: () => {
        container.removeChild(toast);
        if (container.children.length === 0) {
          document.body.removeChild(container);
        }
      }
    });
  };

  // Close button effects and handler
  closeButton.addEventListener('mouseenter', () => {
    gsap.to(closeButton, {
      backgroundColor: 'rgba(0,0,0,0.1)',
      duration: 0.2
    });
  });

  closeButton.addEventListener('mouseleave', () => {
    gsap.to(closeButton, {
      backgroundColor: 'transparent',
      duration: 0.2
    });
  });

  closeButton.onclick = closeToast;

  // Auto close
  setTimeout(closeToast, duration);
};