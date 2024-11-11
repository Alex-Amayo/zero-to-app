/*
import * as fs from 'fs'
import { fromPng, toPng } from '@rgba-image/png'
import { createImage } from '@rgba-image/create-image'
*/
const fs = require( 'fs' )
const { fromPng, toPng } = require( '@rgba-image/png' )
const { createImage } = require( '@rgba-image/create-image' )
const { lanczos } = require( './dist' )

const parrotsPng = fs.readFileSync( './src/test/fixtures/parrots.png' )
const parrots = fromPng( parrotsPng )

const { width, height } = parrots
const hW = Math.floor( width / 2 )
const hH = Math.floor( height / 2 )
const dW = width * 2
const dH = height * 2

const half = createImage( hW, hH )

let start = process.hrtime()
lanczos( parrots, half )
let end = process.hrtime( start )
console.log( `resize down: ${ end[ 0 ] * 1e3 + end[ 1 ] / 1e6 }ms` )

fs.writeFileSync( './src/test/fixtures/parrots-half.png', toPng( half ) )

const double = createImage( dW, dH )

start = process.hrtime()
lanczos( parrots, double )
end = process.hrtime( start )
console.log( `resize up: ${ end[ 0 ] * 1e3 + end[ 1 ] / 1e6 }ms` )

fs.writeFileSync( './src/test/fixtures/parrots-double.png', toPng( double ) )
