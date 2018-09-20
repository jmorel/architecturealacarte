const Jimp = require('jimp');
const axios = require('axios');
const parse = require('csv-parse/lib/sync');
const path = require('path');
const slugify = require('slugify');


const PAGE_ID = 'ete-archi';
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQUY07y5KNtEzM1znGltYYNf1JzKPRuBJqXTomcOZ9uJLxFahi5_BK0zl7_-lu9DNExZir_K4ScEfU1/pub?gid=1444080655&single=true&output=csv';
const IMAGE_PROP = 'Image';
const ID_PROP = 'Date';

const APP_DIR = path.join(__dirname, '..');
const IMG_DIR = path.join(APP_DIR, 'public', 'img');
const PAGE_IMG_DIR = path.join(IMG_DIR, PAGE_ID);

const getRecords = async () => {
    const response = await axios.get(CSV_URL);
    const data = response.data;
    const records = parse(data, { columns: true });
    return records.map(record => ({ id: slugify(record[ID_PROP]), url: record[IMAGE_PROP] }));
};

const buildRecordThumbnails = async (record) => {
    const locationCardImg = await Jimp.read(record.url);
    const mapMarkerImg = locationCardImg.clone();
    const ext = locationCardImg.getExtension();
    const mapMarkerSize = locationCardImg.bitmap.width > locationCardImg.bitmap.height ? [Jimp.AUTO, 50] : [50, Jimp.AUTO];

    locationCardImg.resize(768, Jimp.AUTO).write(path.join(PAGE_IMG_DIR, `${record.id}-locationcard.${ext}`));
    mapMarkerImg.resize(...mapMarkerSize).write(path.join(PAGE_IMG_DIR, `${record.id}-mapmarker.${ext}`));
};

getRecords()
    .then(records => records.forEach(record => buildRecordThumbnails(record)));
