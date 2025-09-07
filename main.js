

// category List
const categoriesApiShow = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(data => {
            
            data.categories.forEach(obj => {
                const categoriesList = document.getElementById("categories-list");
                categoriesList.innerHTML += `
                    <li onclick="categoryPlantsItem(${obj.id})" class="hover:bg-green-600 hover:text-white transition duration-200 ease-in-out rounded-lg">
                        <a id="category-btn-${obj.id}" class="block font-medium cursor-pointer w-full py-2 px-2 rounded-md removeBtnClass">${obj.category_name}</a>
                    </li>
                `
            })
            
            
        })
}

// category Style remove
function removeBtnClass() {
    const categoryBtn = document.querySelectorAll(".removeBtnClass")
    categoryBtn.forEach(cl => {
        cl.classList.remove("categoryStyle")
        document.getElementById(`category-btn-all`).classList.remove("categoryStyle")
    })
    
}

// All Plants Product
const allPlantsItem = () => {
    loadingSite()
    fetch("https://openapi.programming-hero.com/api/plants")
        .then(res => res.json())
        .then(data => {
            const productListContainer = document.getElementById("productListContainer");
            productListContainer.innerHTML =""
            data.plants.forEach(obj => {
                productListContainer.innerHTML += `
                    <div class="card bg-base-100 shadow-sm max-w-96">
                        <div class="card-body p-4">
                            <figure>
                                <img class=''
                                    src="${obj.image}" 
                                    class="rounded-lg"
                                />
                            </figure>
                            <h2 onclick="viewProductModal(${obj.id})" class="card-title cursor-pointer">${obj.name}</h2>
                            <p>${obj.description}</p>
                            <div class="flex justify-between items-center">
                                <p class="">
                                    <span class="bg-[#DCFCE7] text-[#15803D] rounded-full px-3 py-1  font-medium text-[14px]">
                                        ${obj.category}
                                    </span>
                                </p>
                                <span class="inline font-semibold text-[14px]">
                                    ৳<span id="">${obj.price}</span>
                                </span>
                            </div>
                            <div class="card-actions justify-end">
                                <button id="addToCartBtnID" class="btn btn-primary bg-[#15803D] w-full border-none rounded-full text-[16px]">Add to Card</button>
                            </div>
                        </div>
                    </div>
                
                `
            })
            
        })
    removeBtnClass()
    document.getElementById(`category-btn-all`).classList.add("categoryStyle") 
}

// Product
const categoryPlantsItem = (id) => {
    loadingSite()
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then(res => res.json())
        .then(data => {
            const productListContainer = document.getElementById("productListContainer");
            productListContainer.innerHTML =""
            data.plants.forEach(obj => {
                productListContainer.innerHTML += `
                    <div class="card bg-base-100 shadow-sm max-w-96">
                        <div class="card-body p-4">
                            <figure>
                                <img class=''
                                    src="${obj.image}" 
                                    class="rounded-lg"
                                />
                            </figure>
                            <h2 onclick="viewProductModal(${obj.id})" class="card-title cursor-pointer">${obj.name}</h2>
                            <p>${obj.description}</p>
                            <div class="flex justify-between items-center">
                                <p class="">
                                    <span class="bg-[#DCFCE7] text-[#15803D] rounded-full px-3 py-1  font-medium text-[14px]">
                                        ${obj.category}
                                    </span>
                                </p>
                                <span class="inline font-semibold text-[14px]">
                                    ৳<span id="">${obj.price}</span>
                                </span>
                            </div>
                            <div class="card-actions justify-end">
                                <button id="addToCartBtnID" class="btn btn-primary bg-[#15803D] w-full border-none rounded-full text-[16px]">Add to Card</button>
                            </div>
                        </div>
                    </div>
                
                `
            })      
            
        })
    removeBtnClass()
    document.getElementById(`category-btn-${id}`).classList.add("categoryStyle")  
}

//Add to Card
// document.getElementById("addToCartBtnID").addEventListener("click", (e) => {

//     // if (e.target === "BUTTON") {
//     //     console.log("ok");
        
//     // }
// })

// Modal show
const viewProductModal = (id) => {
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
                document.getElementById("model-container").innerHTML = `
                        <h3 class="text-3xl font-bold">
                            ${data.plants.name}
                        </h3>
                        <div class="">
                            <img src="${data.plants.image}" alt="">
                        </div>
                        <p class="text-lg">
                            <span class="font-semibold">Category: </span>${data.plants.category}
                        </p>
                        <p class="text-lg">
                            <span class="font-semibold">Price: </span>${data.plants.price}
                        </p>
                        
                        <p class="text-lg">
                            <span class="font-semibold">Description: </span>${data.plants.description}
                        </p>
                `
            document.getElementById("product_modal").showModal()
        })
}




// Loading
function loadingSite() {
    const productListContainer = document.getElementById("productListContainer");
    productListContainer.innerHTML = `
        <div class="col-span-full mx-auto">
            <span class="loading loading-dots loading-xl "></span>
        </div>  
    `
}

allPlantsItem()
categoriesApiShow()

