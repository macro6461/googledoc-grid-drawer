import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
const drawGridFromGoogleDoc = async(url) => {
    let yMap = {}
    let maxX = 0;
    try {
      const response = await fetch(url);
      const html = await response.text();
  
      const $ = cheerio.load(html);
  
      const table = $('table')[0];

      $(table)
          .find('tr')
          .each((_, row) => {
            const cells = $(row)
              .find('th, td')
              .map((_, cell) => $(cell).text().trim())
              .get();
            let myRow = cells.join('|').split("|");
            const x = parseInt(myRow[0]);
            maxX = x > maxX ? x : maxX
            yMap[parseInt(myRow[2])] = yMap[parseInt(myRow[2])] ? {...yMap[parseInt(myRow[2])], [myRow[0]]: myRow[1] } :{[myRow[0]]: myRow[1] }
          });
    } catch (error) {
      console.error('Error fetching or parsing:', error);
    }
    renderResults(yMap, maxX)
}

const renderResults = (rows, maxX) => {
  const allX = Object.values(rows).flatMap(row => Object.keys(row).map(x => parseInt(x)));

  Object.keys(rows)
    .sort((a, b) => parseInt(a) - parseInt(b))
    .forEach(row => {
      const rowMap = rows[row];
      const line = Array(maxX + 1).fill(' ');
      for (const [xStr, char] of Object.entries(rowMap)) {
        const x = parseInt(xStr);
        line[x] = char;
      }
      console.log(line.join(''));
    });
};


drawGridFromGoogleDoc("https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub")