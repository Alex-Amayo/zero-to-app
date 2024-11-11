# dotlottie-js

dotLottie-js serves as the primary library for creating and abstracting dotLotties.

Full documentation available [here](https://docs.lottiefiles.com/dotlottie-js-external/).

### Quick use guide

#### 1. Install using your favourite package mananger

Install dotlottie-js

```
pnpm add @dotlottie/dotlottie-js
```
```
npm i @dotlottie/dotlottie-js
```
```
yarn install @dotlottie/dotlottie-js
```

Importing:

#### Browser
```
import { DotLottie } from '@dotlottie/dotlottie-js'
```

#### Node
```
import { DotLottie } from '@dotlottie/dotlottie-js/node'
```


#### 2. Creating a dotLottie using the library

> For more use cases check out the documentation on [gitbook](https://docs.lottiefiles.com/dotlottie-js-external/)

```ts
import { DotLottie } from '@dotlottie/dotlottie-js';
//If running on Node
// import { DotLottie } from '@dotlottie/dotlottie-js/node';
import like_animation from './like.json';

async function createDotLottie(){
  const dotLottie = new DotLottie();

  // build dotLottie
  await dotLottie 
        .setAuthor('LottieFiles')
        .setVersion('1.0')
        .addAnimation({
          id: 'like_animation',
          data: like_animation,
          loop: true,
          autoplay: true
        })
        .addAnimation({
          id: 'cat_animation',
          url: 'https://my_cat_animation.json',
          loop: true,
          autoplay: false
        })
        .build()
  
  // download dotLottie
  await dotlottie.download('my_animation.lottie');
}

createDotLottie();
```

### Managing the manifest.json

A manifest.json file will be present inside of your .lottie.

The manifest file allows the player to know what animations are contained inside it, how to play them and more. All of these settings are customizable by interacting with the DotLottie object and the LottieAnimations contained inside it.

There are two levels of customization possible, the first being on the dotLottie level which concerns things like the ```author```, ```version``` of the animation and more. The second is on the animation level, setting options like ```autoplay```, ```loop``` and more.

All of the dotLottie object customization options are visible [here](https://app.gitbook.com/o/-MY5xai2gE1dn4A5MxPC/s/255RqgJTuWDILh0FJ2NK/documentation/dotlottie).

All of the animation object customization options are visible [here](https://app.gitbook.com/o/-MY5xai2gE1dn4A5MxPC/s/255RqgJTuWDILh0FJ2NK/documentation/lottieanimation).


### Usage in frameworks

For examples on how to use in React, Next.js, Vue and Nuxt 3 please refer to the [full documentation page]().


### Development

---

#### Guidelines

- Use [defensive programming](https://en.wikipedia.org/wiki/Defensive_programming) techniques: Ensure type and range of
  input values, cast values to native representation whenever possible, etc.
- Refrain from using external dependencies: Discuss before adding a dependency. Check with
  [Bundlephobia](https://bundlephobia.com/) for package size and dependencies when choosing one.
- Use code formatting in the IDE using the given eslint+prettier configs.
- Write tests to cover all functions and code branches with valid and invalid values.

#### Setting up

```sh
git clone https://github.com/dotlottie/dotottie-js

cd dotlottie-js

pnpm i
```

#### Building

```sh
pnpm run build
```

#### Running test suite

```sh
pnpm run test
```


