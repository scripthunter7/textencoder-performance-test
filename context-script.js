// This script is run in a browser context

const encoder = new TextEncoder();
const decoder = new TextDecoder();

// Generate a long, random string
const randomString = Math.random().toString(36).repeat(1000000);

// Encode the string
let start = Date.now();
const encoded = encoder.encode(randomString);
console.log(`TextEncoder: ${Date.now() - start}ms`);

// Decode the string
start = Date.now();
const decoded = decoder.decode(encoded);
console.log(`TextDecoder: ${Date.now() - start}ms`);

// Generate a lot of short strings, between 1 and 30 characters
const shortStrings = Array.from({ length: 1000000 }, () => Math.random().toString(36).repeat(Math.floor(Math.random() * 30)));

// Encode the short strings
start = Date.now();
const encodedShortStrings = shortStrings.map(s => encoder.encode(s));
console.log(`TextEncoder - Short Strings: ${Date.now() - start}ms`);

// Decode the short strings
start = Date.now();
const decodedShortStrings = encodedShortStrings.map(s => decoder.decode(s));
console.log(`TextDecoder - Short Strings: ${Date.now() - start}ms`);
