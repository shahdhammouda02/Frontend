// CRUDS Operations Pure JavaScript(Create Reade Update Delete Search) => Data
// local storage => اول خطوة واهمها لانه لازم تبقى البيانات محفوظة
// البرنامج بقدر يحسب السعر بالضرايب والاعلانات والخصم
// البرنامج يخزن بيانات المنتجات في السيستم

// get total (function)
// create product (function)
// save localStorage
// clear inputs
// read => after clicking on create show data
// count => when clicking on create it creates products as in count
// delete => one product or all
// update
// search
// clean data =>انه ما يدخل بيانات فارغة

let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');

let mood='Create';
let tmp; // global variable
// console.log(title,price,taxes,ads,discount,total,count,category,submit);
// get total
function getTotal(){
    if(price.value!=''){
        let result=(+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML=result;
        total.style.background='#040';
    }else{
        total.innerHTML='';
        total.style.background='#f14';
    }
}

// create product (function)
// افضل مكان نحفظ فيه الداتا هو array
let dataPro;
if(localStorage.product!=null){
    dataPro=JSON.parse(localStorage.product); // ترجع البيانات لاصلها يعني مش نص بترجع ارري
} else{
    dataPro=[];
}
submit.onclick=function(){
    // نجمع البيانات في اوبجكت
    let newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    // console.log(newPro);
    // لازم احفظ الاوبجكت بارري عشان اقدر اوصله

    // ننشئ المنتجات بحسب عددهم count
    // count انشاء اي عدد من المنتجات من مرة واحدة

    // في حالة mood= create 

    // clean data
    if(title.value!='' && price.value!='' && category.value!='' && newPro.count <100){
    if(mood === 'Create'){
        if(newPro.count > 1){
            for(let i=0; i <newPro.count; i++){
                dataPro.push(newPro);
            }
        } else{
            dataPro.push(newPro);
        }     
    }else{
        dataPro[tmp]=newPro;
        mood='Create';
        submit.innerHTML='Create';
        count.style.display='block';
    } 
    clearData();// لا تمسح الداتا الا لو الشرط تحقق
}

    // dataPro.push(newPro); // يتم انشاء منتج جديد
    // save local Storage
    localStorage.setItem('product',JSON.stringify(dataPro));
    // console.log(dataPro);

    // clearData();
    showData();
}


// clear inputs
function clearData(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}


// read data
function showData(){
    getTotal();
    let table='';
    for(let i=0; i<dataPro.length; i++){
        table +=  /*dataPro[i].title;*/
        `<tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
        </tr>`;
        // console.log(table);
    }
    document.getElementById('tbody').innerHTML=table;

    let btnDelete=document.getElementById('deleteAll');
    if(dataPro.length>0){
        btnDelete.innerHTML=`<button onclick="deleteAll()">Delete All(${dataPro.length})</button>`
    } else{
        btnDelete.innerHTML='';
    }
}
showData();// تشتغل على طول


// delete one product
function deleteDate(i){ // index اللي همسح منه المنتج
    // console.log(i);
    dataPro.splice(i,1);
    localStorage.product=JSON.stringify(dataPro);
    showData(); // تتحدث الداتا عطول بمجرد حذف المنتج
}

// delete ALL
function deleteAll(){
    localStorage.clear(); // لحالها بحذف بس اللي باللكوكل
    dataPro.splice(0); // يمسح من 0 للنهاية
    showData(); // يحدث البيانات
}

// update تعديل المنتجات
function updateData(i){
    // console.log(i);
    // اول شي بنوصل للانبوتس
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    getTotal();
    count.style.display='none';
    category.value=dataPro[i].category;
    submit.innerHTML='Update';
    mood='update';
    tmp=i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}

// search البحث في المنتجات
let searchMood='title';
function getSearchMood(id){
    // console.log(id);
let search=document.getElementById('search');
    if(id === 'searchTitle'){
        searchMood='title';
        // search.placeholder='Search By Title';
    }else{
        searchMood='category';
        // search.placeholder='Search By Category';
    }
    search.placeholder='Search By '+searchMood;
    // console.log(searchMood);
    search.focus();
    search.value='';
    showData();
}

function searchDate(value){
    let table='';
// console.log(value);
for(let i=0; i<dataPro.length; i++){
if(searchMood == 'title'){
    // for(let i=0; i<dataPro.length; i++){
        if(dataPro[i].title.includes(value.toLowerCase())){
            // console.log(i);
            table +=`
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
            </tr>`;
        }
    // }
    }else{
    // for(let i=0; i<dataPro.length; i++){
        if(dataPro[i].category.includes(value.toLowerCase())){
            // console.log(i);
            table +=`
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteDate(${i})" id="delete">delete</button></td>
            </tr>`;
        }
    // }
}
        }
    
document.getElementById('tbody').innerHTML=table;

}

// clean data يعني اعرف المستخدم ايش هيدخل داتا(يعني اتحكم بالداتا)

