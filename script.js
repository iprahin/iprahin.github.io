
const titles = {
  ru: {
    hengbase: 'HengBase — коммерческая SaaS-платформа',
    coreform: 'Coreform / Tempesta Media — B2B-платформа для контент-маркетинга',
    librepad: 'LibrePad — встраиваемый WYSIWYG-редактор',
    augmented: 'Augmented Experts — AI-платформа для контента'
  },
  en: {
    hengbase: 'HengBase — commercial SaaS platform',
    coreform: 'Coreform / Tempesta Media — B2B content platform',
    librepad: 'LibrePad — embeddable WYSIWYG editor',
    augmented: 'Augmented Experts — AI content platform'
  }
};

const galleries = {
  hengbase: ['01','02','03','04','05','06'].map(n => `assets/projects/hengbase/${n}.jpg`),
  coreform: Array.from({length: 11}, (_, i) => `assets/projects/coreform/${String(i + 1).padStart(2, '0')}.jpg`),
  librepad: ['01','02','03'].map(n => `assets/projects/librepad/${n}.jpg`),
  augmented: ['01','02','03','04','05','06'].map(n => `assets/projects/augmented-experts/${n}.jpg`)
};

const lang = document.documentElement.lang === 'ru' ? 'ru' : 'en';
const dialog = document.getElementById('gallery');
const image = document.getElementById('galleryImage');
const caption = document.getElementById('galleryCaption');
const closeButton = document.getElementById('closeGallery');
const prevButton = document.getElementById('prevShot');
const nextButton = document.getElementById('nextShot');
let currentGallery = null;
let currentIndex = 0;

function showShot() {
  if (!currentGallery) return;
  const files = galleries[currentGallery];
  image.src = files[currentIndex];
  caption.textContent = `${titles[lang][currentGallery]} · ${currentIndex + 1} / ${files.length}`;
}

document.querySelectorAll('[data-gallery]').forEach(button => {
  button.addEventListener('click', () => {
    currentGallery = button.dataset.gallery;
    currentIndex = 0;
    showShot();
    dialog.showModal();
  });
});

closeButton.addEventListener('click', () => dialog.close());
prevButton.addEventListener('click', () => {
  const total = galleries[currentGallery].length;
  currentIndex = (currentIndex - 1 + total) % total;
  showShot();
});
nextButton.addEventListener('click', () => {
  const total = galleries[currentGallery].length;
  currentIndex = (currentIndex + 1) % total;
  showShot();
});
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
document.addEventListener('keydown', event => {
  if (!dialog.open || !currentGallery) return;
  if (event.key === 'ArrowLeft') prevButton.click();
  if (event.key === 'ArrowRight') nextButton.click();
  if (event.key === 'Escape') dialog.close();
});
