import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import {
  hideLoader,
  hideLoadMoreBtn,
  showLoadMoreBtn,
  showLoader,
} from './service';

const elements = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  guard: document.querySelector('.js-guard'),
};

let limitPage;
let page = 1;
let galleryMode;
const objectsPerPage = 40;

elements.form.addEventListener('submit', handleForm);

// ---------infinity scroll -----------

const options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};
const observer = new IntersectionObserver(handlerLoadMore, options);

// -------------------------------

function initGallery() {
  galleryMode = new SimpleLightbox('.gallery__link', {
    /* options */
  });
}

async function handleForm(evt) {
  evt.preventDefault();
  showLoader();
  observer.unobserve(elements.guard);
  page = 1;
  elements.gallery.innerHTML = '';

  const { searchQuery } = evt.currentTarget.elements;
  const optimizeSearchQuery = searchQuery.value.trim().toLowerCase();
  if (!optimizeSearchQuery) {
    hideLoader();
    return iziToast.show({
      title: 'Warrning',
      message: 'Write the requset value!',
      color: 'yellow',
      position: 'bottomRight',
    });
  }

  try {
    const data = await fetchImages(optimizeSearchQuery, page);

    if (data.hits.length <= 0) {
      iziToast.show({
        title: 'Warrning',
        message:
          'Sorry, there are no images matching your search query. Please try again.',
        color: 'yellow',
        position: 'bottomRight',
      });
      return;
    }

    iziToast.show({
      title: 'Success',
      message: `Hooray! We found ${data.totalHits} images.`,
      color: 'green',
      position: 'bottomRight',
    });

    elements.gallery.innerHTML = createMarkUp(data.hits);
    initGallery();
    limitPage = Math.ceil(data.totalHits / objectsPerPage);

    if (data.hits.length < data.totalHits) {
      observer.observe(elements.guard);
    }
  } catch (error) {
    iziToast.show({
      title: 'Error',
      message: `${error.message}`,
      color: 'red',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

function createMarkUp(arr) {
  return arr
    .map(
      ({
        webformatURL,
        tags,
        largeImageURL,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
        <a class='gallery__link' href=${largeImageURL}>
    <img src=${webformatURL} alt=${tags}  loading="lazy" />
    </a>
    <div class="info">
        <p class="info-item">
            <b>Likes</b>
            ${likes}
        </p>
            <p class="info-item">
        <b>Views</b>
        ${views}
        </p>
        <p class="info-item">
            <b>Comments</b>
            ${comments}
        </p>
        <p class="info-item">
            <b>Downloads</b>
            ${downloads}
        </p>
    </div>
    
</div>`;
      }
    )
    .join('');
}

// ---------infinity scroll -----------

async function handlerLoadMore(entries) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      page += 1;
      const optimizeSearchQuery = elements.form.searchQuery.value
        .trim()
        .toLowerCase();

      if (page > limitPage) {
        observer.unobserve(elements.guard);
        return iziToast.show({
          title: 'Warrning',
          message: 'No more images to load.',
          color: 'yellow',
          position: 'bottomRight',
        });
      }

      try {
        const data = await fetchImages(optimizeSearchQuery, page);

        elements.gallery.insertAdjacentHTML(
          'beforeend',
          createMarkUp(data.hits)
        );
        galleryMode.refresh();
      } catch (error) {
        iziToast.show({
          title: 'Error',
          message: `${error.message}`,
          color: 'red',
          position: 'bottomRight',
        });
      }
    }
  });
}

// --------LOAD MORE ----------

// elements.loadMoreBtn.addEventListener('click', handleLoadMore);

// async function handleLoadMore() {
//   page += 1;
//   const optimizeSearchQuery = elements.form.searchQuery.value
//     .trim()
//     .toLowerCase();

//   try {
//     const data = await fetchImages(optimizeSearchQuery, page);
//     if (data.hits.length <= 0) {
//       iziToast.show({
//         title: 'Warrning',
//         message: 'No more images to load.',
//         color: 'yellow',
//         position: 'topRight',
//       });
//       hideLoadMoreBtn();
//     }
//       elements.gallery.insertAdjacentHTML('beforeend', createMarkUp(data.hits));
//       showLoadMoreBtn();
//
//   } catch (error) {
//     iziToast.show({
//       title: 'Error',
//       message: `${error.message}`,
//       color: 'red',
//       position: 'topRight',
//     });
//   }
// }
