const puppeteer = require("puppeteer");

async function scrap() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto("https://books.toscrape.com/");
  await page.waitForNetworkIdle();

  const result = await page.evaluate(() => {
    const books = [];
    document
      .querySelectorAll("h3 > a")
      .forEach((book) => books.push({ title: book.title }));
    document
      .querySelectorAll(".price_color")
      .forEach((book, i) => (books[i].price = book.innerText));
    return books;
  });
  console.log(result);
  browser.close();
}

scrap();
