"use strict";

// function for list view
async function getAllRecords() {
  let getResultElement = document.getElementById("support-groups");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patvd1Tl89hGp5hRo.7eca5f29a724ac45a267d483d726ba898fc3dc25854d6b49acb34cbd5532bf4c`,
    },
  };

  // fetch the data 
  await fetch(
    `https://api.airtable.com/v0/appvBKSICnCLllK3K/SupportGroups`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); 

      getResultElement.innerHTML = ""; 
    

      // show flip-card on list view 
      let showImage = true;
      let newHtml = `
      <div class="col-12 my-auto">
          <div class="flip-card support-group-flip-card  mx-auto">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                ${
        showImage
          ? '<img src="https://cdn.glitch.global/026ff2ce-89e7-4808-8ae5-43077c75fe7f/support-circle.avif?v=1733106205584" class="mx-auto d-block support-group-image" alt="Support Group Image">'
          : ""
      }
              </div>
              <div class="flip-card-back">
                 ${
        showImage
          ? '<img src="https://cdn.glitch.global/026ff2ce-89e7-4808-8ae5-43077c75fe7f/support-groups-quote.jpg?v=1733104706121" class="mx-auto d-block support-group-quote" alt="Support Group Quote">'
          : ""
      }
              </div>
            </div>
          </div>
        </div>     
     `;

      // show name and logo of support group on list view 
      for (let i = 0; i < data.records.length; i++) {
        let logo = data.records[i].fields["Logo"];
        let name = data.records[i].fields["Name"];

        let imageWidth = "100%"; 
        let imageHeight = "150px"; 

        // resized images 
        if (name === "Special Group") {
          imageWidth = "150px";
          imageHeight = "100px";
        } else if (name === "Another Group") {
          imageWidth = "150px";
          imageHeight = "250px";
        }
        
        // create the cards for each support group with a name and image 
        newHtml += `
    
         <div class="col-xl-4 d-flex justify-content-center card-image-text">
  
          <div class="card list decorated-container3">
          <h3 class="card-title cherry-bomb-one-regular">${name}</h3>
          <a href="support-groups.html?id=${data.records[i].id}">${
          logo
            ? `<img src="${logo[0].url}" class="card-img card-img-top my-auto" alt="${name}" style="width: ${imageWidth}; height: ${imageHeight};">`
            : ``
        }
          </a>
         
          </div>
          </div>
        </div>             
        `;
      }
      getResultElement.innerHTML = newHtml;
    })}

// function for detailed view
async function getOneRecord(id) {
  let getResultElement = document.getElementById("support-groups");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patvd1Tl89hGp5hRo.7eca5f29a724ac45a267d483d726ba898fc3dc25854d6b49acb34cbd5532bf4c`,
    },
  };

  // fetch all data from AirTable
  await fetch(
    `https://api.airtable.com/v0/appvBKSICnCLllK3K/SupportGroups/${id}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is a single object

      let logo = data.fields["Logo"];
      let name = data.fields["Name"];
      let description = data.fields["Description"];
      let location = data.fields["Location"];
      let website = data.fields["Website"];
      let phone = data.fields["Phone"];
      let hours = data.fields["Hours"];
      let email = data.fields["Email"];
      let services = data.fields["Services"];
      let showImage = false;
    
      // html for detailed view 
      let newHtml = ` 
      <div class="col-12 detailed-view-image">
             ${
               showImage
                 ? '<img src="https://cdn.glitch.global/026ff2ce-89e7-4808-8ae5-43077c75fe7f/support-groups.jpg?v=1730098427298" class="mx-auto d-block support-group-image">'
                 : ""
             }

          <img src="${
            logo[0].url
          }" alt="Picture of ${name}" class="logo">
      
        </div>
        <div class="col-12 d-flex">
          <div class="detailed-card decorated-container3">
            <h3 class="card-title cherry-bomb-one-regular" style="text-align: center; margin: 0 auto">${name}</h3>
            <div class="info-row">
            <p class="baloo-paaji-2-bold noto-sans-sc-medium" ><b>Description:</b> ${description} </p>
            </div>
            
            <div class="info-row">
            <p class="baloo-paaji-2-bold noto-sans-sc-medium" ><b>Services:</b> ${services} </p>
            </div>
            
           <div class="info-row baloo-paaji-2-bold noto-sans-sc-medium">
          <p><b>Location:</b> <a href="https://www.google.com/maps?q=${
            location}" target="_blank">${location}</a></p>
        </div>
            
            <div class="info-row">
            <div class="website-info baloo-paaji-2-bold noto-sans-sc-medium"><b>Website:</b> <a href="${website}" target="_blank">${website}</a></div>
            </div>
            
             <div class="info-row">
          <p class="baloo-paaji-2-bold noto-sans-sc-medium"><b>Phone:</b> <a href="tel:${phone}">${phone}</a></p>
        </div>
            
            <div class="info-row">           
            <p class="baloo-paaji-2-bold noto-sans-sc-medium"><b>Hours:</b>     
            ${hours
              .split(",")
              .map((day, index) => {
                if (index === 0) {
                  return `<span>${day}</span>`;
                } else {
                  return `<span class="business-hours">${day}</span>`;
                }
              })
              .join("")}
          </p>
            </div>
            
            <div class="info-row">
    <p class="baloo-paaji-2-bold noto-sans-sc-medium"><b>Email:</b> <a href="mailto:${email}" class="email-link">${email}</a></p>
  </div>          
            <div class="row">
            <a class="btn btn-primary baloo-paaji-2-bold noto-sans-sc-medium" 
                 href="support-groups.html">Support Groups List</a>
            </div>
          </div>          
        </div>       
      `;

      getResultElement.innerHTML = newHtml;
    });
}

let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  getOneRecord(idParams[1]); 
} else {
  getAllRecords(); 
}
