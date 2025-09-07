

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
            product(data)
        })
    removeBtnClass()
    document.getElementById(`category-btn-all`).classList.add("categoryStyle") 
}

// Category Plant Product
const categoryPlantsItem = (id) => {
    loadingSite()
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then(res => res.json())
        .then(data => {               
            product(data)
        })
    removeBtnClass()
    document.getElementById(`category-btn-${id}`).classList.add("categoryStyle")  
}

//Product Push in site
function product(data) {
            const productListContainer = document.getElementById("productListContainer");
            productListContainer.innerHTML =""
            data.plants.forEach(obj => {
                productListContainer.innerHTML += `
                    <div id="${obj.id}" class="card bg-base-100 shadow-sm max-w-96">
                        <div class="card-body p-4">
                            <figure>
                                <img class='w-full max-h-[180px] object-cover rounded-xl'
                                    src="${obj.image}" 
                                    class="rounded-lg"
                                />
                            </figure>
                            <h2 onclick="viewProductModal(${obj.id})" class="card-title cursor-pointer">${obj.name}</h2>
                            <p>${obj.description}</p>
                            <div class="flex justify-between items-center mb-1">
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
}

//Add to Card
let arrListAddToCard = []
document.getElementById("productListContainer").addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const id = e.target.parentNode.parentNode.parentNode.id        
        const title = e.target.parentNode.parentNode.children[1].innerText
        const price = e.target.parentNode.parentNode.children[3].children[1].children[0].innerText

        const existing = arrListAddToCard.find(obj => obj.id === id) 

        if (existing) {
            existing.quantity += 1;
            existing.price = price * existing.quantity;
        } else {
            const obj = {
                id: id,
                title: title,
                price: price,
                quantity: 1
            }
            arrListAddToCard.push(obj)
        }

        const allPrice = arrListAddToCard.map(obj => {return Number(obj.price)});
        const totalPrice = allPrice.reduce((acc,curr) => {return acc + curr});
        document.getElementById("totalPrice").innerText = totalPrice      
        addCardList(arrListAddToCard)
        
    }
});

const addCardList = (arr) => {
    const cardItemList = document.getElementById("cardItemList");
        cardItemList.innerHTML =""
        arr.forEach(obj => {
                    cardItemList.innerHTML += `
                        <li 
                            class="rounded-md py-4 px-2 flex justify-between  items-center mb-2 bg-[#F0FDF4]">
                            <div class="">
                                <p class="text-[14px]">${obj.title}</p>
                                <p class="text-[#8C8C8C]">
                                    ৳<span>${obj.price}</span> 
                                    x                            
                                    <span>${obj.quantity}</span>
                                </p>
                            </div>
                            <div class="">
                                <span onclick="removeCardList('${obj.id}')" class="cursor-pointer"><i class="fa-solid fa-xmark text-[#8C8C8C] text-[16px]"></i></span>
                            </div>
                        </li>
                    `
                
        })

}

function removeCardList(id) {
    const newArr = arrListAddToCard.filter(obj => {return obj.id !== id});
    arrListAddToCard = newArr;
    console.log(arrListAddToCard);
    
    addCardList(arrListAddToCard)
}


// Modal show
const viewProductModal = (id) => {
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
        .then(res => res.json())
        .then(data => {
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

