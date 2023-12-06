const elements = {
  loader: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('.load-more'),
};

export function showLoader() {
  elements.loader.classList.remove('hidden');
}

export function hideLoader() {
  elements.loader.classList.add('hidden');
}

export function showLoadMoreBtn() {
  elements.loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreBtn() {
  elements.loadMoreBtn.classList.add('hidden');
}
