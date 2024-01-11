import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";




const form = document.querySelector('.formForSearch');
const input = form.querySelector('.inputForSearch');
const button = form.querySelector('.btnForSearch');
const boxForContent = document.querySelector('.gallery');
let lightbox = new SimpleLightbox('.gallery a.lightbox');
const loader = document.querySelector('.loader');
const btnLoad = document.querySelector('.load');


const API_KEY = "41507262-89b1b811a4183d0df8899cf35";

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const searchTerm = input.value.trim();
    showLoader();
    if (searchTerm !== "") {
        searchImages(searchTerm);
    } else {
         iziToast.error({
         title: 'Error',
         message: 'Please enter a search term.',  
    });
    hideLoader();
    }
    
})

btnLoad.addEventListener('click', loadMoreImages);
let currentPage = 1;
let galleryItemHeight;

async function searchImages(query) {
    currentPage = 1;

   
    const API_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=40`;
    

    try {
        const response = await axios.get(API_URL);
        
        const dataFromServer = response.data;
        if (dataFromServer.hits.length > 0) {
            iziToast.success({
                title: 'OK',
               message: 'We were able to fetch some data.!',
               });
               boxForContent.innerHTML = "";
               displayImages(dataFromServer.hits);
               lightbox.refresh();
               if(dataFromServer.hits.length<40)btnLoad.style.display = 'none'; 
               const galleryItem = document.querySelector('.gallery-item'); 
               const itemHeight = galleryItem.getBoundingClientRect().height;
                galleryItemHeight = itemHeight;
                window.scrollBy({ top: galleryItemHeight * 0.55, behavior: "smooth", });
            
        }else{
            iziToast.info({
                title: 'Info',
                message: 'Sorry, there are no images matching your search query. Please try again.',
              });
        }

    } catch (error) {
         iziToast.error({
         title: 'Error',
         message: 'Sorry, An error occurred while fetching images, Please try again later.',
    });
    } finally{
        hideLoader();
    }
    
}

function displayImages(images){
    

    const newContent = images.map(e=>{
        return  `<div class="gallery-item">
        <a href="${e.largeImageURL}" class="lightbox" data-lightbox="gallery">
        <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}">
        </a>
        <div class="info">
            <div class="stat">
                <h3>Likes</h3>
                <p>${e.likes}</p>
            </div>
            <div class="stat">
                <h3>Views</h3>
                <p>${e.views }</p>
            </div>
            <div class="stat">
                <h3>Comments</h3>
                <p>${e.comments }</p><p></p>
            </div>
            <div class="stat">
                <h3>Downloads</h3>
                <p>${e.downloads }</p>
            </div>
        </div>
        </div>`;
    }).join('');
    boxForContent.insertAdjacentHTML('beforeend', newContent);
    btnLoad.style.display = 'block';

}

async function loadMoreImages(){
    currentPage++;
    
    const searchTerm = input.value.trim();
    showLoader();

    try {
        const API_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=40`;
        
        const response = await axios.get(API_URL);
        const dataFromServer = response.data;
         if(dataFromServer.hits.length>0){
            iziToast.success({
                title: 'OK',
               message: 'We were able to fetch some data.!',
               });
               displayImages(dataFromServer.hits);
               lightbox.refresh();
               if(dataFromServer.hits.length<40)btnLoad.style.display = 'none'; 
               window.scrollBy({ top: galleryItemHeight * 2.5, behavior: "smooth", });
         }else{
            iziToast.info({
                title: 'Info',
                message: "We're sorry, but you've reached the end of search results.",
              });
              btnLoad.style.display = 'none'; 
         }

    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Error loading more images. Please try again later.',
          });
    }finally {
        hideLoader();
      }

}

function showLoader() {
    loader.style.display = 'block'
}

function hideLoader() {
    loader.style.display = 'none';
}