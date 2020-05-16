const cheerio = require("cheerio");
const request = require("request-promise");
const fs = require("fs-extra");
const writeStream = fs.createWriteStream("quotes.csv");

const init = async () => {
  try {
    const $ = await request({
      uri: "http://quotes.toscrape.com/",
      transform: (body) => cheerio.load(body),
    });

    writeStream.write("Quote|Author|Tags\n");
    const tags = [];
    $(".quote").each((i, el) => {
      const text = $(el)
        .find("span.text")
        .text()
        .replace(/(^\“|\”$)/g, "");
      const author = $(el).find("span small.author").text();
      const tag = $(el).find(".tags a").html();
      tags.push(tag);
      writeStream.write(`${text}|${author}|${tags}\n`);
    });

    console.log("Listo.");
    console.log("Guardado en quotes.csv");

    /*   
      // Obtener titulo
      const websiteTitle = $("title");
      console.log(websiteTitle.html());
    
      // Obtener texto de cabezera
      const websiteHeading = $("h1");
      console.log(websiteHeading.text().trim());
    
      // Obtener dentro de todas las citas
      // aquellas que contengan un enlace
      const quote = $(".quote").find("a");
      console.log(quote.html());
    
      const third_quote = $(".quote").next().next();
      //console.log(third_quote.html());
    
      // Obtener divs especificos
      const containerClass = $(".row .col-md-8").parent().next();
      // console.log(containerClass.html()); 
      */
  } catch (error) {
    console.log(error);
  }
};

init();
