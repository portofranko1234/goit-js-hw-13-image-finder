import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { info } from '@pnotify/core';
import * as Confirm from '@pnotify/confirm';
import '@pnotify/confirm/dist/PNotifyConfirm.css';
import './sass/main.scss';
import ApiService from './js/apiService';
import galleryItem from './templates/images.hbs';
import LoadMoreBtn from './js/load-more-btn';

const searchForm = document.querySelector('.search-form');

const gallery = document.querySelector('.gallery');

const apiService = new ApiService();

const loadMoreBtn = new LoadMoreBtn({ selector: '[data-action="load-more"]', hidden: true });

searchForm.addEventListener('submit', onSearch);

loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();

  apiService.query = event.currentTarget.elements.query.value;
  loadMoreBtn.show();
  loadMoreBtn.disable();
  apiService.resetPage();

  apiService.goFetch().then(hits => {
    if (apiService.query.trim() !== '' && hits.length === 0) {
      onSearchError();
    }

    clearGallery();
    galleryMarkup(hits);
    loadMoreBtn.enable();
  });
}

function onLoadMore() {
  loadMoreBtn.disable();
  apiService.goFetch().then(hits => {
    galleryMarkup(hits);
    loadMoreBtn.enable();
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  });
}

function galleryMarkup(hits) {
  gallery.insertAdjacentHTML('beforeend', galleryItem(hits));
}
function clearGallery() {
  gallery.innerHTML = '';
}
function onSearchError() {
  info({
    title: '❌ Error',
    text: 'image was not found 🕵. Please, try again.',
    modules: new Map([
      [
        Confirm,
        {
          confirm: true,
          buttons: [
            {
              text: 'Ok',
              primary: true,
              click: notice => {
                notice.close();
              },
            },
          ],
        },
      ],
    ]),
  });
}
