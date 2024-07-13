const axios=require("axios");
const cheerio = require('cheerio');
const xlsx = require('xlsx');
const fs=require("fs");

const pageUrl="https://www.amazon.com/s?k=phone&page=2&crid=18EUYBSP7O1SQ&qid=1702535235&sprefix=phon%2Caps%2C280&ref=sr_pg_2"

// const productData= async ()=>{
    
//     try{
//         const response= await axios.get(pageUrl)
//         const data=response.data
//         console.log(data);
//     }catch(error){
//         console.log("err retriving data");
//     }
    
// }

const pagedata=fs.readFileSync("pageData.txt")
// console.log(pagedata.toString());

const $ = cheerio.load(pagedata.toString());
// console.log($);


const title=$(".a-size-medium.a-color-base.a-text-normal");   //product title class name and use .
const productData=[]    

title.each((index,element)=>{
    // console.log(element);
 const titles=$(element).text()  
 productData.push(titles)
})

const price=$(".a-price-whole");   //product price
const PriceData=[];
price.each((index,element)=>{
    const prices=$(element).text();
    // console.log(prices);
    PriceData.push(prices)
})

const rating=$(".a-icon-alt");
const RatingData=[];
rating.each((index,element)=>{
    const ratings=$(element).text();
    // console.log(ratings);
    RatingData.push(ratings)
})

const productJson=productData.map((title,index)=>{
    return{
        title,
        price:PriceData[index],
        rating:RatingData[index],
    }
})

// console.log(productJson);

// you can storage the data

// fs.writeFileSync("productdetails.json",JSON.stringify(productJson))


//EXcel

// Create a new workbook
const workbook=xlsx.utils.book_new()

//creat a new sheet
const sheet=xlsx.utils.json_to_sheet(productJson);

//to save data into Excel
xlsx.utils.book_append_sheet(workbook,sheet,"Products");
xlsx.writeFile(workbook,"Products.xlsx"); //data will saved in the name of Products.xlsx in excel

console.log("XLSX file is created successfully");


// productData()

