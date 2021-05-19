const { readdirSync, readFileSync, writeFileSync, lstatSync } = require('fs');
const ScCompression = require('sc-compression');
const csv = require('convert-csv-to-json')
const { resolve } = require('path');

(async () => {
    for await (const path of ['assets/csv', 'assets/localization', 'assets/logic']) {
        console.log(`Decompressing files in ${path}`);
        readdirSync(path).forEach((file) => {
            const filepath = resolve(path, file);
            const buffer = readFileSync(filepath);
            writeFileSync(filepath, ScCompression.decompress(buffer));

            const json = JSON.stringify(csv.fieldDelimiter(',').getJsonFromCsv(filepath));
            if (filepath.endsWith('.csv')) writeFileSync(filepath.replace('.csv', '.json'), json);
        });
    }

    console.log('Done!');
})();
