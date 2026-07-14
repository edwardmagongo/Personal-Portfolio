// The 'hls.js/light' export ships no type declarations; its API is a subset
// of the full build, so reuse the main package's types.
declare module 'hls.js/light' {
  export * from 'hls.js';
  export { default } from 'hls.js';
}
