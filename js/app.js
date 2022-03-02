// spinner function
const spinnerDisplay = onOff => {
    document.getElementById('spinner').style.display = onOff;

}
// error message function
const errorMessage = display => {
    document.getElementById('error-message').style.display = display;
}

// Search handler function
const search = () => {
    const searchPhone = document.getElementById('search-box');
    const searchText = searchPhone.value;
    spinnerDisplay('block');
    //  if there is empty value then show a error message
    if(searchText == ''){
        errorMessage('block'); //error message
    }
    searchPhone.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayResult(data.data));

}

// Create card and display them with search result
const displayResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    const firstTwenty = phones.slice(0, 20); // Stop showing result after twenty data
    // If there is invalid data entry then show a error message
    if(phones.length == 0){
        errorMessage('block');
    }
    else{
        firstTwenty.forEach(phone => {
            console.log(phone);
            const div = document.createElement('div');
            div.style.alignItems = 'center';
            div.classList.add('col');
            div.innerHTML = `<div class="card border border-0 h-100">
            <img src="${phone.image}" class="card-img-top img-fluid"
            alt="...">
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p class="card-text">${phone.brand}</p>
            </div>
            <button onclick="loadDetail('${phone.slug}')" class="border border-0 py-2 w-50 bg-info text-white
             rounded">More Info</button>
          </div>`;
          searchResult.appendChild(div);
        });
        errorMessage('none');
    }
    spinnerDisplay('none'); // data processing off
}
// Every single phone details found out function
const loadDetail = slug => {
    console.log(slug);  
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetail(data.data));                                                                                                                
}

// Card create and single phone details function: 

const displayDetail = phone =>{
    console.log(phone);
    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.textContent = '';
    const div = document.createElement('div');
    div.style.maxWidth = '540px';
    div.classList.add('card');
    div.innerHTML = `<div class="row gx-5">
    <div class="col-lg-4 col-sm-12 align-self-center">
    <img src="${phone.image}" class="img-fluid" alt="">
    </div>
    <div class="col-lg-8 col-sm-12">
    <div class="card-body">
    <h5 class="card-title">${phone.name}</h5>
    <ul class="" style="font-size: 13px">
        <li>Brand: ${phone.brand}</li>
        <li>Release Date: ${phone.releaseDate ? phone.releaseDate: 'No release date'}'</li>
        <li>Main Features: 
        <div class="text-muted" style="font-size: 12px"><br>
        <span class="fw-bold">Chip Set:</span> ${phone.mainFeatures.chipSet} 
        <br><span class="fw-bold">Display Size:</span> 
        ${phone.mainFeatures.displaySize} <br>
        <span class="fw-bold">Memory:</span> ${phone.mainFeatures.memory}<br>
        <span class="fw-bold">Storage:</span> ${phone.mainFeatures.storage}<br>
        <span class="fw-bold">Sensors:</span> ${phone.mainFeatures.sensors}
        </div>
        </li>
        <li>Others: 
        <div class="text-muted" style="font-size: 12px"><br>
        <span class="fw-bold">WLAN:</span> ${phone?.others?.WLAN ? phone.others.WLAN: 'no data'} 
        <br><span class="fw-bold">USB:</span> 
        ${phone?.others?.USB ? phone.others.USB: 'no data'} <br>
        <span class="fw-bold">Bluetooth:</span> ${phone?.others?.Bluetooth ? phone.others.Bluetooth: 'no data'}<br>
        <span class="fw-bold">GPS:</span> ${phone?.others?.GPS ? phone.others.GPS: 'no data'}<br>
        <span class="fw-bold">Radio:</span> ${phone?.others?.Radio ? phone.others.Radio: 'no data'}
        </div>
        </li>
    </ul>
  </div>
    </div>
</div>
    `
phoneDetail.appendChild(div);
}