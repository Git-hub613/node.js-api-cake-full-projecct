import url from 'url';

const file = "https://codeit.com.np/search-course?q=react+"

const _dirName = url.pathToFileURL(file)

const _baseName = new url.URLSearchParams(_dirName.searchParams)

console.log(_dirName)
console.log(_baseName)