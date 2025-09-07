


const categoriesApiShow = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(data => {
            
            data.categories.forEach(obj => {
                const categoriesList = document.getElementById("categories-list");
                categoriesList.innerHTML += `
                    <li onclick="categoryPlantsItem(${obj.id})" class="">
                        <a id="category-btn-${obj.id}" class="block font-medium cursor-pointer w-full py-2 px-2 rounded-md categoryBtnClass">${obj.category_name}</a>
                    </li>
                `
            })
            
            
        })
}

function categoryBtnClass() {
    const categoryBtn = document.querySelectorAll(".categoryBtnClass")
    categoryBtn.forEach(cl => {
        cl.classList.remove("categoryStyle")
        document.getElementById(`category-btn-all`).classList.remove("categoryStyle")
    })
    
}

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
                            <h2 class="card-title cursor-pointer">${obj.name}</h2>
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
                                <button class="btn btn-primary bg-[#15803D] w-full border-none rounded-full text-[16px]">Add to Card</button>
                            </div>
                        </div>
                    </div>
                
                `
            })
            
        })
    categoryBtnClass()
    document.getElementById(`category-btn-all`).classList.add("categoryStyle") 
}

// category Product
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
                            <h2 onclick="viewProduct(${obj.id})" class="card-title cursor-pointer">${obj.name}</h2>
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
                                <button class="btn btn-primary bg-[#15803D] w-full border-none rounded-full text-[16px]">Add to Card</button>
                            </div>
                        </div>
                    </div>
                
                `
            })      
            
        })
    categoryBtnClass()
    document.getElementById(`category-btn-${id}`).classList.add("categoryStyle")  
}

const viewProduct = () => {
    
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